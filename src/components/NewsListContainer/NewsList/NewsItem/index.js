import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroupItem, Row, Col } from 'react-bootstrap';

import './style.css'

const NewsItem = ({ title, pubDate, state, image, newsId, channelId }) => {

    return(
        <ListGroupItem className={ state ? 'list-group-item-danger' : null}>
            <Link to={`/news/?channelId=${channelId}&newsId=${newsId}`}>
                <Row>
                    <Col xs={11}>
                        <h4>{title}</h4>
                        <div className="news-date">{String(pubDate).slice(0, 22)}</div>

                    </Col>

                    <Col xs={1}>
                        { state ? <span className="glyphicon glyphicon-eye-open" aria-hidden="true" />
                            : null
                        }
                    </Col>
                </Row>

            </Link>
        </ListGroupItem>
    )
};

export default NewsItem;