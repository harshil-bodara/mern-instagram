import React, { useState } from "react";
import { HOC } from "./HOC";
import { useDispatch } from "react-redux";
import { createPost } from "../Store/Action/PostAction";
import { useNavigate } from "react-router-dom";

const UserPost = () => {
  const dispatch = useDispatch();
  const [postobj, setpostobj] = useState({
    image: '',
    description: ''
  });
  const navigate = useNavigate();

  const getValue = async (e) => {
    if (e.target.type === "file") {
      postobj[e.target.name] = e.target.files[0];
    } else {
      postobj[e.target.name] = e.target.value;
    }
    setpostobj({ ...postobj });
  };

  const addPost = (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("image", postobj.image);
    postData.append("description", postobj.description);
    dispatch(createPost(postData))
    navigate("/home");
  }

  return (
    <>
      <div className="container mx-auto text-center border border-1 w-50 p-4 mt-5">
        <h4 className="text-center mb-3">Add post</h4>
        <form>
          <input
            type="file"
            className="finput w-100 mb-3"
            onChange={getValue}
            name="image"
          />
          <br />
          <textarea
            className="finput w-100 mb-3"
            placeholder="Enter description"
            onChange={getValue}
            name="description"
          ></textarea>
          <br />
          <button className="btn btn-primary p-1" onClick={addPost}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default HOC(UserPost);
