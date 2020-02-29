import React from 'react';
import { NewsItemContainer } from './news-item.styles';

const NewsItem = ({ news }) => {
    const { title, body, created } = news;
    console.log( created );
    return (
        <NewsItemContainer>
            <div className="title">{title} @ </div>
            <div className="body">{body}</div>
        </NewsItemContainer>
    );
}

export default NewsItem;