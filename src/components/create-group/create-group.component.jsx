import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CreateGroupContainer from './create-group.styles'

const CreateGroup = (props) => {
    const { groupName, imageUrl, handleChange, handleSubmit, isFormValid } = props;

    return (
        <CreateGroupContainer>
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