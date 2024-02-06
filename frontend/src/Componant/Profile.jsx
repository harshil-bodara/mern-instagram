import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { HOC } from "./HOC";

const Profile = () => {
  let profileData = JSON.parse(localStorage.getItem('LoginUser'));

  

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <>
      <Card style={{ width: "20rem" }} className="mt-5 mx-auto">
        <Card.Body>
          <Card.Title>My profile</Card.Title>
          <Card.Text>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
              <img src={`http://localhost:5000/${profileData.profile}`} style={{ width: "60px", borderRadius: "50%" }} />
              <div>
                <span>0</span>
                <button
                  type="button"
                  onClick={handleShow1}
                  className="me-1 border border-0"
                  style={{ background: "transparent" }}
                >
                  Following
                </button>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Following</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                </Modal>
              </div>

              <div>
                <span>0</span>
                <button
                  type="button"
                  onClick={handleShow2}
                  className="me-1 border border-0"
                  style={{ background: "transparent" }}
                >
                  Followers
                </button>

                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Followers</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                </Modal>
              </div>
            </div>
            <hr />
            <p>User name : {profileData?.username}</p>
            <p>Email : {profileData?.email}</p>
            <button type="button" className="w-100 btn btn-danger">
              Delete Profile
            </button>
          </Card.Text>
        </Card.Body>
      </Card>

      
    </>
  );
};

export default HOC(Profile);
