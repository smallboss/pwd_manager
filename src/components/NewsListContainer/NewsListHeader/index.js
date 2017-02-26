import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';


const NewsListHeader = ({ numbNews, showAllNews, activeButton, showOnlyUnreadNews, showOnlyReadNews }) => {

    return (
        <ButtonToolbar>
            <Button className={ activeButton=='ALL' ? 'active' : ''} onClick={showAllNews}>
                ALL ({numbNews.unread + numbNews.read})
            </Button>
            <Button className={ activeButton=='UNREAD' ? 'active' : ''} onClick={showOnlyUnreadNews}>
                UNREAD ({numbNews.unread})
            </Button>
            <Button className={ activeButton=='READ' ? 'active' : ''} onClick={showOnlyReadNews}>
                READ ({numbNews.read})
            </Button>
        </ButtonToolbar>
    )
};

export default NewsListHeader;