import React from 'react';

import GroupItemContainer from './group-item.styles'

const GroupItem = ({ name, imageUrl }) => (
    <GroupItemContainer>
        <div><img alt="" src={imageUrl}/>{name}</div>
    </GroupItemContainer>
);

export default GroupItem;