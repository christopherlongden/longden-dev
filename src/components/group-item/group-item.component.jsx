import React from 'react';

import { GroupItemContainer, GroupLink } from './group-item.styles'

const GroupItem = ({ location, name, imageUrl }) => {
    return (
        <GroupItemContainer>
            <div>
                <img alt="" src={imageUrl}></img>
                <span>
                    <GroupLink to={location}>{name}</GroupLink>
                </span>
            </div>
        </GroupItemContainer>
    );
}



export default GroupItem;