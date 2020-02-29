import React from 'react';
import { GroupItemContainer, GroupLink } from './group-item.styles';

const GroupItem = ({ group }) => {
    const { id, name, imageUrl } = group;
    const location = "/group/" + id;
    return (
        <GroupItemContainer>
            <div>
                <img alt="" src={imageUrl}></img>
                <span>
                    <GroupLink to={location} >{name}</GroupLink>
                </span>
            </div>
        </GroupItemContainer>
    );
}

export default GroupItem;