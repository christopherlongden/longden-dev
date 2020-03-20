import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CreateGroupContainer from './create-group.styles'
import { storage } from '../../firebase/firebase.utils'

const CreateGroup = (props) => {
    const { groupName, imageUrl, handleChange, handleSubmit, isFormValid } = props;
    const [iconReferences, setIconReferences] = useState([]);
    
    useEffect(() => {
        onLoad();
    });

    async function onLoad() {
        const path = 'icons';
        const storageRef = storage.ref();
        const listRef = storageRef.child(path);
        let files = await listRef.listAll();

        let icons = [];
        files.items.forEach(obj => {
            icons.push(obj);

        });

        setIconReferences(icons);
    }

    return (
        <CreateGroupContainer>
            <div>
                {iconReferences.map(item => (
                    <li key={item.fullPath}>{item.fullPath}</li>
                ))}
            </div>
            
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group>
                    <Form.Label>Group name</Form.Label>
                    <Form.Control type="text" name="newGroupName" value={groupName} onChange={handleChange} placeholder="Enter group name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control type="text" name="newGroupImageUrl" value={imageUrl} onChange={handleChange} placeholder="Enter image Url" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Submit
                </Button>
            </Form>
        </CreateGroupContainer>
    )
}

export default CreateGroup;