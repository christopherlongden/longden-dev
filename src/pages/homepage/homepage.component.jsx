import React, { useState, useEffect } from "react";
import GroupList from '../../components/group-list/group-list.component'
import CreateGroup from '../../components/create-group/create-group.component'

import {
    firestore,
    addDocument,
    convertGroupSnapshotToMap
  } from '../../firebase/firebase.utils.js';

import HomePageContainer from './homepage.styles'

function HomePage(props) {
    const [groups, setGroups] = useState([]);
    const [showAddGroup, setShowAddGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupImageUrl, setNewGroupImageUrl] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const newGroup = { name: newGroupName, imageUrl: newGroupImageUrl};
        
        await addDocument('group', newGroup);
        setNewGroupName('');
        setNewGroupImageUrl('');
        setShowAddGroup(false);
    }

    function isFormValid() {
        return newGroupName.length > 4 && newGroupImageUrl.length > 5;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'newGroupName') {
            setNewGroupName(value);
        }
        if (name === 'newGroupImageUrl') {
            setNewGroupImageUrl(value);
        }
    };

    function toggleCreateGroupVisbility() {
        setShowAddGroup(!showAddGroup);
    }

    useEffect(() => {
        const groupRef = firestore.collection('group').orderBy('name', 'asc');

        const unsubscribeFromGroupSnapshot = groupRef.onSnapshot(snapshot => {
            setGroups(convertGroupSnapshotToMap(snapshot));
        });
    
        return function cleanup() {
            unsubscribeFromGroupSnapshot();
        }
    });

    return (
        <HomePageContainer>
            <h3>Group Directory</h3>
            <GroupList groups={groups}/>

            { props.currentUser ?
                <div className="toggle-box">
                    <input type="button" onClick={toggleCreateGroupVisbility} value="Add New Group"/>
                </div>
                :
                null }

            { showAddGroup ?
                <div>
                    <h3>Create Group</h3>
                    <CreateGroup 
                        groupName={newGroupName} 
                        imageUrl={newGroupImageUrl} 
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        isFormValid={isFormValid}
                    />
                </div>
                :
                null }
        </HomePageContainer>
    )
};

export default HomePage;