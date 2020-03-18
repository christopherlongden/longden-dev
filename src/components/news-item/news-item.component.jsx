import React from 'react';
import { NewsItemContainer } from './news-item.styles';

const NewsItem = ({ news }) => {
    const { title, body, created, user } = news;
    const dateTimeStamp = new Date(created.toDate()).toDateString();
    return (
        <NewsItemContainer>
            <div className="title">{title}</div>
            <div className="created">{dateTimeStamp} By {user}</div>
            <div className="body">{body}</div>
        </NewsItemContainer>
    );
}

export default NewsItem;