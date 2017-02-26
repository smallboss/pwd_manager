import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, ButtonToolbar, ListGroupItem, Row, Col } from 'react-bootstrap';

import './style.css';

const ChannelItem = ({ id, title, image, newsList, rss, setCurrent, onEdit, onRemove }) => {

    const getUnreadCount = () => {
        let unreadCount = 0;
        newsList.forEach( news => (news.state != 'read') && unreadCount++ );

        return unreadCount;
    };


    return(
        <ListGroupItem>
            <Link to={`/channels/${id}`}>
                <Row>
                    <Col xs={12}>
                        <img src={image.url} alt=""/>
                        <div>
                            <div onClick={setCurrent}>{title}</div>
                            <div>{rss}</div>
                        </div>
                    </Col>
                </Row>
            </Link>

            <Row>
                <Col xs={1}>
                    <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
                    {getUnreadCount()}
                </Col>

                <Col xs={11} >
                    <ButtonToolbar className="pull-right">
                        <Button onClick={onEdit.bind(this, id)} bsStyle='warning'>EDIT LINK</Button>
                        <Button onClick={onRemove.bind(this, id)} bsStyle='danger'>REMOVE</Button>
                    </ButtonToolbar>
                </Col>
            </Row>


        </ListGroupItem>
    )
};

export default ChannelItem;