import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

import { addDocument } from '../../firebase/firebase.utils.js';

import CreateGroupContainer from './create-group.styles'

class CreateGroup extends React.Component {
    constructor() {
        super();
    
        this.state = {
            groupName: '',
            imageUrl: ''
        };
      }

    handleSubmit = async event => {
        event.preventDefault();

        const id = uuidv4();

        const { groupName, imageUrl } = this.state;
        const newGroup = { id, name: groupName, imageUrl};
        
        await addDocument('group', newGroup);
        this.setState({ groupName: '', imageUrl: '' })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateForm() {
        return this.state.groupName.length > 4 && this.state.imageUrl.length > 5;
    }

    render() {
        return (
            <CreateGroupContainer>
                <Form onSubmit={this.handleSubmit} autocomplete="off">
                    <Form.Group>
                        <Form.Label>Group name</Form.Label>
                        <Form.Control type="text" name="groupName" value={this.state.groupName} onChange={this.handleChange} placeholder="Enter group name" />
                    </Form.Group>
        
                    <Form.Group>
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.handleChange} placeholder="Enter image Url" />
                    </Form.Group>
        
                    <Button variant="primary" type="submit" disabled={!this.validateForm()}>
                        Submit
                    </Button>
                </Form>
            </CreateGroupContainer>
        )
    }
}

export default CreateGroup;