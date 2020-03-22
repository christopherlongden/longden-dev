import React from 'react';
import MemberItem from '../member-item/member-item.component';
import MemberListContainer from './member-list.styles';

const NewsItems = ( { members } ) => {
    return (
        <MemberListContainer>
        {members.map(item => (
          <MemberItem key={item.id} member={item} />
        ))}
        </MemberListContainer>
    )
}

export default NewsItems;