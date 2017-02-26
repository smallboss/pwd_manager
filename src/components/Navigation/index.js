import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const Navigation = ({ goBack, goForward }) => {
    const backButton = (
        <Button onClick={goBack}>
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
        </Button>
    );

    const forwardButton = (
        <Button onClick={goForward} className="pull-right">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
        </Button>
    );


    return(
        <Row>
            <Col xs={12}>
                { goBack    ? backButton    : null }
                { goForward ? forwardButton : null }
            </Col>
        </Row>
    )
};


export default Navigation;