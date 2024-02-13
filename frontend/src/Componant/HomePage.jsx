import React, { useEffect, useState } from "react";
import { HOC } from "./HOC";
import axios from "axios";
import { Card } from "react-bootstrap";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const [allPost, setallPost] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setcomments] = useState([]);

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
        `${process.env.REACT_APP_BASE_URL}/like/add/${postId}`,
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

  return (
    <>
      <div className="mt-5 ms-5">
        {allPost?.map((iteam, i) => {
          return (
            <Card className="ms-5 mt-4" key={i} style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Text>{iteam.description}</Card.Text>
              </Card.Body>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_BASE_URL}/${iteam.image}`}
              />
              <div className="d-flex justify-content-between align-items-center w-100 p-2">
                <div className="w-25">
                  <CiHeart size={35} />
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
                <>
                  <p>{comments.comment}</p>
                  {comments?.map((item) => item)}
                </>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default HOC(HomePage);
