import React from 'react';
import GroupPageContainer from './grouppage.styles'
import { connect } from 'react-redux';
import { selectGroup } from '../../redux/group/group.selector';

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

const mapStateToProps = (state, ownProps) => ({
    group: selectGroup(ownProps.match.params.id)(state)
});

export default connect(mapStateToProps)(GroupPage);