import React from 'react';
import { ListGroup } from 'react-bootstrap';

import NewsItem from './NewsItem';

const NewsList = ({ newsList, channelId }) => {

    return (
        <ListGroup>
             {newsList.map((news, index) => (
                 <NewsItem key={index}
                           newsId={index}
                           channelId={channelId}
                           state={news.state}
                           title={news.title[0]}
                           pubDate={news.pubDate} />
             ))}
        </ListGroup>
    )
};

export default NewsList;
