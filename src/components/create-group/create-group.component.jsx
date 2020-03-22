import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CreateGroupContainer from './create-group.styles'

const CreateGroup = (props) => {
    const { groupName, imageUrl, handleChange, handleSubmit, isFormValid, icons, previewImageUrl } = props;

    return (
        <CreateGroupContainer>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group>
                    <Form.Label>Group name</Form.Label>
                    <Form.Control type="text" name="newGroupName" value={groupName} onChange={handleChange} placeholder="Enter group name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image Url</Form.Label>

                    <select name="newGroupImageUrl" value={imageUrl} onChange={handleChange}>
                        <option key="">Select Icon</option>
                        {icons.map(item => (
                            <option key={item.fullPath}>{item.fullPath}</option>
                        ))}
                    </select>
                    <div>
                    {
                        previewImageUrl ?
                            <img alt="preview url" src={previewImageUrl}/>
                        :
                            null
                    }
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Submit
                </Button>
            </Form>
        </CreateGroupContainer>
    )
}

export default CreateGroup;