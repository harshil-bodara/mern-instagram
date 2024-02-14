import React, { useEffect, useState } from "react";
import { HOC } from "./HOC";
import axios from "axios";
import { Card } from "react-bootstrap";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [allPost, setallPost] = useState([]);
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsUser, setCommentsUser] = useState([]);
  const [like, setLike] = useState([]);
  const [bar, setBar] = useState({ isHidden: true });
  const dispatch = useDispatch();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/post/all`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setallPost(response.data.post);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addLike = async (postId) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/like/add/${postId}`,
        {},
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showLike = async (postId) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/like/${postId}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setLike(response.data.like);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLike = async (likeId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/like/delete/${likeId}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addComment = async (postId) => {
    const commentData = {
      comment,
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/comment/add/${postId}`,
        commentData,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("Token")}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    setComment("");
  };

  const showComment = async (postId) => {
    setBar({ isHidden: !bar.isHidden });

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/comment/${postId}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setComments(response.data.comment);
        setCommentsUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = async (commentId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/comment/delete/${commentId}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const style = { visibility: bar.isHidden ? "hidden" : "visible" };
  return (
    <>
      <div className="mt-5 ms-5">
        {allPost?.map((iteam, i) => {
          return (
            <Card className="ms-5 mt-4" key={i} style={{ width: "30rem" }}>
              <div className="p-2">
                {user.map((item) => {
                  if (item.id === iteam.userId) {
                    return (
                      <div className="d-flex">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/${item.profile}`}
                          style={{ width: "40px", borderRadius: "50%" }}
                        />
                        <p className="ms-3">{item.username}</p>
                      </div>
                    );
                  }
                })}
              </div>
              <hr className="m-0" />
              <Card.Body>
                <Card.Text>{iteam.description}</Card.Text>
              </Card.Body>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_BASE_URL}/${iteam.image}`}
              />
              <div className="d-flex justify-content-between align-items-center w-100 p-2">
                <div className="w-25">
                  <CiHeart size={35} onClick={() => addLike(iteam.id)} />
                  {like.map((like) => {
                    return (
                      <div>
                        <FaHeart
                          size={27}
                          onClick={() => deleteLike(like.id)}
                        />
                      </div>
                    );
                  })}
                  <span className="ms-2" onClick={() => showLike(iteam.id)}>
                    0
                  </span>
                </div>
                <div className="w-75">
                  <form>
                    <input
                      type="text"
                      className="w-75"
                      placeholder="Please add comment"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                      name="comment"
                    />
                    <button
                      className="btn btn-primary p-1"
                      type="button"
                      onClick={() => addComment(iteam.id)}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <div className="text-end me-4">
                <button
                  className="btn border-0 text-primary"
                  type="button"
                  onClick={() => showComment(iteam.id)}
                >
                  {bar.isHidden ? `Show comment` : `Hide comment`}
                </button>
              </div>
              <div style={style} className="mb-2">
                {comments.map((item, i) => {
                  if (item.postId === iteam.id) {
                    return (
                      <div className="d-flex justify-content-between align-items-center w-75 comment-div">
                        <div className="w-25">
                          {commentsUser.map((user) => {
                            if (item.userId === user.id) {
                              return (
                                <div className="d-flex m-0 me-2">
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}/${user.profile}`}
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <p className="m-0 ms-3">{user.username}</p>
                                </div>
                              );
                            }
                          })}
                        </div>
                        <p key={i} className="m-0 ms-5 w-50">
                          {item.comment}
                        </p>
                        <MdDelete
                          size={20}
                          onClick={() => deleteComment(item.id)}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default HOC(HomePage);
