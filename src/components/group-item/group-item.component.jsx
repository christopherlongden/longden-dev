import React from 'react';

import { GroupItemContainer } from './group-item.styles'

const GroupItem = ({ name, imageUrl }) => (
    <GroupItemContainer>
        <div>
            <img alt="" src={imageUrl}></img>
            <span>{name}</span>
        </div>
    </GroupItemContainer>
);

export default GroupItem;