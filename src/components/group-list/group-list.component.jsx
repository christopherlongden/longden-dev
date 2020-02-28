import React from 'react';
import GroupItem from '../group-item/group-item.component';
import GroupListContainer from './group-list.styles';

const GroupsList = ({ groups }) => {
    return (
        <GroupListContainer>
        {groups.map(item => (
          <GroupItem key={item.id} group={item} />
        ))}
        </GroupListContainer>
    )
};


export default GroupsList;