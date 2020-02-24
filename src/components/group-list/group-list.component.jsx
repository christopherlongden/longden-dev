import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAllGroupsList } from '../../redux/group/group.selector';

import GroupItem from '../group-item/group-item.component';
import GroupListContainer from './group-list.styles';

const GroupsList = ({ groups }) => (
    <GroupListContainer>
        {groups.map(({ id, ...otherGroupProps}) => (
            <GroupItem key={id} {...otherGroupProps} />
        ))}
    </GroupListContainer>
);

const mapStateToProps = createStructuredSelector({
    groups: selectAllGroupsList
})

export default connect(mapStateToProps)(GroupsList);