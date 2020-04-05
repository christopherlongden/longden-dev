import React from 'react';
import { MemberItemContainer, MemberLink } from './member-item.styles';

const MemberItem = ({ member }) => {
    const { displayName, photoURL, id } = member;
    const location = "/user/" + id;
    const defaultURL = "https://img.icons8.com/ultraviolet/40/000000/popeye.png";
    return (
        <MemberItemContainer>
            <MemberLink to={location}>
                <span className="displayName">{displayName}</span>
                {
                    photoURL ? 
                    <span><img className="photoURL" alt="user" src={photoURL}/></span>
                    :
                    <span><img className="photoURL" alt="user" src={defaultURL}/></span>
                }
            </MemberLink>
        </MemberItemContainer>
    );
}

export default MemberItem;

