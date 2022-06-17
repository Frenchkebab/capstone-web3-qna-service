import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddPostComponent(props) {
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const postTitle = e.target.elements[0].value;
    const postBody = e.target.elements[1].value;
    if (!postTitle) {
      alert('Need a title');
      return;
    }
    if (!postBody) {
      alert('Need a body');
      return;
    }

    const formData = new FormData();
    formData.append('userAddress', props.userWalletAddress);
    formData.append('postTitle', postTitle);
    formData.append('postBody', postBody);
    console.log(formData);

    //! ToDo: postData 전송 -> CID를 contract에 저장 -> 화면에 뿌려주기
  };

  return (
    <Modal {...props} centered>
      {/* <Modal.Header closeButton>
        <Modal.Title id="modal-title">Write a Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addPostForm" onSubmit={handlePostSubmit}>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Post Title here" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Post Body"
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button form="addPostForm" type="submit">
          Submit
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddPostComponent;
