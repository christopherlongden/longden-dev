import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addDocument } from '../../firebase/firebase.utils.js';
import GroupList from '../../components/group-list/group-list.component'
import CreateGroup from '../../components/create-group/create-group.component'

import {
    firestore,
    convertGroupSnapshotToMap
  } from '../../firebase/firebase.utils.js';

import HomePageContainer from './homepage.styles'

class HomePage extends React.Component {
    unsubscribeFromGroupSnapshot = null;
    
    constructor() {
        super();

        this.state = {
            groups: [],
            newGroupName: '',
            newGroupImageUrl: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const id = uuidv4();
        const { newGroupName, newGroupImageUrl } = this.state;
        const newGroup = { id, name: newGroupName, newGroupImageUrl};
        
        await addDocument('group', newGroup);
        this.setState({ newGroupName: '', newGroupImageUrl: '' })
    }

    isFormValid = () => {
        const { newGroupName, newGroupImageUrl } = this.state;
        return newGroupName.length > 4 && newGroupImageUrl.length > 5;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    
    componentDidMount() {
        const groupRef = firestore.collection('group').orderBy('name', 'asc');

        this.unsubscribeFromGroupSnapshot = groupRef.onSnapshot(snapshot => {
            this.setState ( { groups: convertGroupSnapshotToMap(snapshot) });
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromGroupSnapshot();
    }

    render() {
        const { groups } = this.state;
        return (
            <HomePageContainer>
                <h3>Group Directory</h3>
                <GroupList groups={groups}/>
                <h3>Create Group</h3>
                <CreateGroup handleSubmit={this.handleSubmit} handleChange={this.handleChange} isFormValid={this.isFormValid}/>
            </HomePageContainer>
        )
    }
};

export default HomePage;