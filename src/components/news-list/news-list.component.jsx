import React from 'react';
import NewsItem from '../news-item/news-item.component';
import NewsListContainer from './news-list.styles';

const NewsItems = ( { news } ) => {
    return (
        <NewsListContainer>
        {news.map(item => (
          <NewsItem key={item.id} news={item} />
        ))}
        </NewsListContainer>
    )
}

export default NewsItems;