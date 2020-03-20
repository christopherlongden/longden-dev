import React, { useState, useEffect } from "react";
import GroupList from '../../components/group-list/group-list.component'
import CreateGroup from '../../components/create-group/create-group.component'
import { createUserObjectFromState } from '../../libs/common';

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

        const newGroup = { 
            name: newGroupName, 
            imageUrl: newGroupImageUrl, 
            creator: createUserObjectFromState(props.currentUser)
        };
        
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

    // TODO: This still reloads every time groups.length changes which
    // is unnecessary as it is a subscription and it does not need to reload
    useEffect(() => {
        let unsubscribeFromGroupSnapshot = null;
        
        const groupRef = firestore.collection('group').orderBy('name', 'asc');

        try {
            unsubscribeFromGroupSnapshot = groupRef.onSnapshot(snapshot => {
                setGroups(convertGroupSnapshotToMap(snapshot));
            });

            console.log("got home page feed");
        } catch(e) {
            console.log(e);
        }
    
        return function cleanup() {
            unsubscribeFromGroupSnapshot();
        }

    }, [groups.length]);

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

            { showAddGroup && props.currentUser ?
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