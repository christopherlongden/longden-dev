import React from 'react';
import GroupItem from '../group-item/group-item.component';
import GroupListContainer from './group-list.styles';

const GroupsList = ({ groups }) => {
    return (
        <GroupListContainer>
        {groups.map(({ id, ...otherGroupProps}) => (
            <GroupItem key={id} {...otherGroupProps} />
        ))}
        </GroupListContainer>
    )
};


export default GroupsList;