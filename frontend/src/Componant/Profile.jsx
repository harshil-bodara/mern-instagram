import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { HOC } from "./HOC";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deletePost } from "../Store/Action/PostAction";
import { deleteFollow, updateFollow } from "../Store/Action/FollowAction";

const Profile = () => {
  let profileData = JSON.parse(localStorage.getItem("LoginUser"));
  const [post, setpost] = useState([]);
  const [followRequest, setfollowRequest] = useState([]);
  const [followerCount, setfollowerCount] = useState(0);
  const [followingCount, setfollowingCount] = useState(0);
  const [bar, setBar] = useState({ isHidden: true });
  const dispatch = useDispatch();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/post`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setpost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptFollowRequest = (requestId) => {
    dispatch(updateFollow(requestId)).then((result) => {
      if(profileData.id === result.payload.follow.receiverId){
        setfollowerCount(result.payload.followersCount);
      }
      if(profileData.id === result.payload.follow.senderId){
        setfollowingCount(result.payload.followingCount);
      }
    });
  };

  const deleteFollowRequest = (requestId) => {
    dispatch(deleteFollow(requestId));
  };

  const showFollowing = async (id) => {
    setBar({ isHidden: !bar.isHidden });
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/follow/${id}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setfollowRequest(response.data.data.user.follower);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePosts = (postId) => {
    if (window.confirm("Are you sure!! you want to delete post?")) {
      dispatch(deletePost(postId));
    }
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const style = { visibility: bar.isHidden ? "hidden" : "visible" };

  return (
    <>
      <Card style={{ width: "24rem" }} className="mt-5 mx-auto">
        <Card.Body>
          <Card.Title>My profile</Card.Title>
          <Card.Text>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${profileData.profile}`}
                style={{ width: "60px", borderRadius: "50%" }}
              />

              <div>
                <span>{post.length}</span>
                <span className="ms-1">posts</span>
              </div>

              <div>
                <span>{followingCount}</span>
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
                <span>{followerCount}</span>
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
            {/* <button type="button" className="w-100 btn btn-danger">
              Delete Profile
            </button> */}
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="text-center">
        <button className="mt-5 btn btn-secondary" type="button" onClick={showFollowing}>
          Show Request
        </button>
        <div id="followRequest-div" style={style} className="mx-auto mt-3">
          {followRequest.map((item, i) => {
            return (
              <div
                key={i}
                className="d-flex justify-content-between align-items-center"
              >
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/${item.profile}`}
                  style={{ width: "45px", borderRadius: "50%" }}
                />
                <p className="ms-3 mt-3">{item.username}</p>
                <div>
                  <button
                    className="btn btn-primary me-1"
                    onClick={(e) => {acceptFollowRequest(item.follow.id); e.target.style.display = "none"}}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFollowRequest(item.follow.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="d-flex">
        {post?.map((iteam, i) => {
          return (
            <Card className="ms-4 mt-5" key={i} style={{ width: "15rem" }}>
              <Card.Body>
                <Card.Text>{iteam.description}</Card.Text>
              </Card.Body>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_BASE_URL}/${iteam.image}`}
              />
              <button
                type="button"
                className="w-100 btn btn-danger"
                onClick={() => deletePosts(iteam.id)}
              >
                Delete post
              </button>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default HOC(Profile);
