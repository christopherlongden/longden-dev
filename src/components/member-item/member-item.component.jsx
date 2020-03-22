import React from 'react';
import { MemberItemContainer } from './member-item.styles';

const MemberItem = ({ member }) => {
    const { id, created } = member;
    const dateTimeStamp = new Date(created.toDate()).toDateString();
    return (
        <MemberItemContainer>
            <div className="id">{id}</div>
            <div className="created">Joined: {dateTimeStamp}</div>
        </MemberItemContainer>
    );
}

export default MemberItem;