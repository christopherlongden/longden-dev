import React from 'react';
import GroupPageContainer from './grouppage.styles'

const GroupPage = ({ group }) => {
    
    const { name } = group;

    return (
        <GroupPageContainer>
            <h3>Group Page: {name}</h3>
            
            <h4>Chat</h4>

            <h4>News</h4>



            
        </GroupPageContainer>
    )
}

export default GroupPage;