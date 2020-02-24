import React from 'react';

import GroupItemContainer from './group-item.styles'

const GroupItem = ({ name, imageUrl }) => (
    <GroupItemContainer>
        <div>{name}</div>
    </GroupItemContainer>
);

export default GroupItem;