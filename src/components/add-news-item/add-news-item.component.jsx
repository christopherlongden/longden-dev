import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddNewsItemContainer from './add-news-item.styles';

const AddNewsItem = (props) => {
    const { title, body, handleChange, handleSubmit, isFormValid } = props;

    return (
        <AddNewsItemContainer>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="newsItemTitle" value={title} onChange={handleChange} placeholder="Enter title" />
                    
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" name="newsItemBody" value={body} onChange={handleChange} placeholder="Enter body text" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Submit
                </Button>
            </Form>
        </AddNewsItemContainer>
    )
}

export default AddNewsItem;