import React, { useState, useEffect } from "react";
import GroupList from '../../components/group-list/group-list.component'
import CreateGroup from '../../components/create-group/create-group.component'
import { createUserObjectFromState } from '../../libs/common';

import {
    firestore,
    addDocument,
    convertGroupSnapshotToMap,
    storage
  } from '../../firebase/firebase.utils.js';

import HomePageContainer from './homepage.styles'

function HomePage(props) {
    const [groups, setGroups] = useState([]);
    const [showAddGroup, setShowAddGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupImageUrl, setNewGroupImageUrl] = useState('');
    const [iconReferences, setIconReferences] = useState([]);
    const [previewImageUrl, setPreviewImageUrl] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const newGroup = { 
            name: newGroupName, 
            imageUrl: previewImageUrl, 
            creator: createUserObjectFromState(props.currentUser)
        };
        
        await addDocument('group', newGroup);
        setNewGroupName('');
        setNewGroupImageUrl('');
        setPreviewImageUrl('');
        setShowAddGroup(false);
    }

    function isFormValid() {
        return newGroupName.length > 4 && newGroupImageUrl.length > 0;
    }

    async function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'newGroupName') {
            setNewGroupName(value);
        }
        if (name === 'newGroupImageUrl') {
            setNewGroupImageUrl(value);

            const storageRef = storage.ref();
            const listRef = storageRef.child(value);
            const downloadUrl = await listRef.getDownloadURL();
            console.log("download: ", downloadUrl);
            setPreviewImageUrl(downloadUrl);
        }
    };

    function toggleCreateGroupVisbility() {
        setShowAddGroup(!showAddGroup);
    }

    // TODO: Using showAddGroup to prevent this running multiple times but it
    // does not seem like the right approach
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

        onLoad();
    
        return function cleanup() {
            unsubscribeFromGroupSnapshot();
        }

    }, [showAddGroup]);

    async function onLoad() {
        const path = 'icons';

        try {
            const storageRef = storage.ref();
            const listRef = storageRef.child(path);
            let files = await listRef.listAll();
    
            let icons = [];
            files.items.forEach(obj => {
                icons.push(obj);
            });
    
            console.log("loaded item references");
    
            setIconReferences(icons);
        } catch(error) {
            console.log(error.message);
        }

    }

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
                        previewImageUrl={previewImageUrl}
                        icons={iconReferences}
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