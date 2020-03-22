import React from 'react';
import GroupMemberActionsContainer from './group-member-actions.styles'

function GroupMemberActions(props) {
    const { joinGroup, leaveGroup, members, currentUser } = props;
    let member;

    if (currentUser && members.length > 0) {
        member = members.find(x =>  x.id === currentUser.id)
    }

    return (
        <GroupMemberActionsContainer>
            {
                member ? 
                    <input type="button" className="join-button" onClick={leaveGroup} name="leaveGroup" value="Leave Group"/>
                :
                    <input type="button" className="join-button" onClick={joinGroup} name="joinGroup" value="Join Group"/>
            }
            
            
        </GroupMemberActionsContainer>
    )
}

export default GroupMemberActions;