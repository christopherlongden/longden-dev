import React from 'react';
import GroupList from '../../components/group-list/group-list.component'
import CreateGroup from '../../components/create-group/create-group.component'

import {
    firestore,
    addDocument,
    convertGroupSnapshotToMap
  } from '../../firebase/firebase.utils.js';

import HomePageContainer from './homepage.styles'

class HomePage extends React.Component {
    unsubscribeFromGroupSnapshot = null;
    
    constructor() {
        super();

        this.state = {
            groups: [],
            showAddGroup: false,
            newGroupName: '',
            newGroupImageUrl: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { newGroupName, newGroupImageUrl } = this.state;
        const newGroup = { name: newGroupName, imageUrl: newGroupImageUrl};
        
        await addDocument('group', newGroup);
        this.setState({ newGroupName: '', newGroupImageUrl: '', showAddGroup: false })
    }

    isFormValid = () => {
        const { newGroupName, newGroupImageUrl } = this.state;
        return newGroupName.length > 4 && newGroupImageUrl.length > 5;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    toggleCreateGroupVisbility = () => {
        this.setState( { showAddGroup: !this.state.showAddGroup } )
    }
    
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
        const { groups, newGroupImageUrl, newGroupName, showAddGroup } = this.state;
        return (
            <HomePageContainer>
                <h3>Group Directory</h3>
                <GroupList groups={groups}/>

                <div className="toggle-box">
                    <input type="button" onClick={this.toggleCreateGroupVisbility} value="Add New Group"/>
                </div>
                { showAddGroup ?
                    <div>
                        <h3>Create Group</h3>
                        <CreateGroup 
                            groupName={newGroupName} 
                            imageUrl={newGroupImageUrl} 
                            handleSubmit={this.handleSubmit} 
                            handleChange={this.handleChange} 
                            isFormValid={this.isFormValid}
                        />
                    </div>
                    :
                    null }
            </HomePageContainer>
        )
    }
};

export default HomePage;