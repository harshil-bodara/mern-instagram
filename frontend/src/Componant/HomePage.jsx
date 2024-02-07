import React, { useEffect, useState } from "react";
import { HOC } from "./HOC";
import axios from "axios";
import { Card } from "react-bootstrap";

const HomePage = () => {
  const [allPost, setallPost] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  let auth = {
    headers: {
      authorization: `bearer ${localStorage.getItem("Token")}`,
    },
  };

  const getPost = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/post/all`, auth)
      .then((response) => {
        setallPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="mt-5 ms-5">
        {allPost?.map((iteam, i) => {
          return (
            <Card className="ms-5 mt-4" key={i} style={{ width: "25rem" }}>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_BASE_URL}/${iteam.image}`}
              />
              <Card.Body>
                <Card.Text>{iteam.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default HOC(HomePage);
