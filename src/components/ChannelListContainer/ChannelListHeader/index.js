import React from 'react';
import { Button, Row, InputGroup } from 'react-bootstrap'

const LineNewChannel = ({ addNewChannel, refreshChannels }) => {

    let rssInput = '';

    const addChannel = (event) => {
        event.preventDefault();

        rssInput.value && addNewChannel(rssInput.value);
        rssInput.value = '';
    };

    return(
        <Row>
            <div className="col-lg-7">
                <form onSubmit={addChannel}>
                    <InputGroup>
                        <input type="text"
                               ref={ input => rssInput = input }
                               className="form-control"
                               placeholder="rss link"/>
                        <span className="input-group-btn">
                            <Button type="button" onClick={addChannel}>Add channel</Button>
                        </span>
                    </InputGroup>
                </form>
            </div>
            <div className="col-lg-2">
                <Button onClick={refreshChannels}>
                    <span className="glyphicon glyphicon-refresh" aria-hidden="true" /> Refresh
                </Button>
            </div>
        </Row>
    )
};

export default LineNewChannel;
