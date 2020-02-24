import React from 'react';
import { connect } from 'react-redux';

import GroupList from '../../components/group-list/group-list.component'
import CreateGroup from '../../components/create-group/create-group.component'

import { updateGroups } from '../../redux/group/group.actions';

import {
    firestore,
    convertGroupSnapshotToMap
  } from '../../firebase/firebase.utils.js';

import HomePageContainer from './homepage.styles'

class HomePage extends React.Component {
    unsubscribeFromGroupSnapshot = null;
    
    componentDidMount() {
        const { updateGroups } = this.props;
        const groupRef = firestore.collection('group');

        this.unsubscribeFromGroupSnapshot = groupRef.onSnapshot(snapshot => {
            const groupsMap = convertGroupSnapshotToMap(snapshot);
            updateGroups(groupsMap);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromGroupSnapshot();
    }

    render() {
        return (
            <HomePageContainer>
            <span>Group Directory:</span>
            <GroupList/>
            <span>Create Group:</span>
            <CreateGroup/>
            </HomePageContainer>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    updateGroups: groups =>
        dispatch(updateGroups(groups))
})

export default connect(null, mapDispatchToProps)(HomePage);