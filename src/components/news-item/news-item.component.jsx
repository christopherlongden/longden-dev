import React from 'react';
import { NewsItemContainer } from './news-item.styles';

const NewsItem = ({ news }) => {
    const { title, body, created } = news;
    const dateTimeStamp = Date(created.seconds).toString();
    return (
        <NewsItemContainer>
            <div className="title">{title}</div>
            <div className="created">{dateTimeStamp}</div>
            <div className="body">{body}</div>
        </NewsItemContainer>
    );
}

export default NewsItem;