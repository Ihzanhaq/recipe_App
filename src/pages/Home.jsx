import React, { useEffect, useState } from "react";
import "../App.css";
import { Button, Card } from "react-bootstrap";
import { getRecipe } from "../services/allApi";
import Swal from "sweetalert2";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    recipe_name: "",
    recipe_description: "",
    steps: [],
    image: "",
  });
  useEffect(() => {
    displayRecipes();
  }, []);
  const displayRecipes = async () => {
    try {
      let apiResponse = await getRecipe();
      if (apiResponse.status == 200) {
        setData(apiResponse.data.slice(0, 3));
      } else {
        Swal.fire({
          title: "Error",
          text: "Error occured while fetching data.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error occured while fetching data.",
        icon: "error",
      });
      console.log(error);
    }
  };
  return (
    <div className="container mt-4">
      <div className="hero p-5">
        <div className="row">
          <div className="col-12 col-md-6 d-flex justify-content-center gap-3 flex-column">
            <h1
              style={{ fontSize: "4.5rem", fontWeight: "600" }}
              className="text-start"
            >
              Cook With <br /> <span className="font-color1">Love & Joy</span>
            </h1>
            <p>
              Explore our collection of mouth-watering recipes, from quick
              weeknight dinners to special occasion treats. Every recipe is
              crafted with passion and tested with care.
            </p>
            <div>
              <Link className="btn-hover" to={"/recipes"}>
                <button className="btn btn-hover p-3 fs-5 border bg-color1 me-3">
                  Browse Recipes
                </button>
              </Link>
              <Link className="btn-hover" to={"/about"}>
                <button
                  style={{
                    backgroundColor: "white",
                    border: "1px solid black",
                  }}
                  className="btn btn-hover text-dark p-3 fs-5"
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img
            className="img-hover rounded-3"
              height={"500px"}
              src="https://images.pexels.com/photos/1566867/pexels-photo-1566867.jpeg"
              alt="cook"
            />
          </div>
        </div>
      </div>
      <div className="featured mt-3">
        <h1 style={{ fontSize: "3rem" }} className="font-color1 text-center">
          Featured Recipes{" "}
        </h1>
        <p className="text-center fs-5">
          Handpicked favorites that our community loves
        </p>
        <div className="row justify-content-center g-4">
          {data.map((eachData) => (
            <div className="col-12 col-md-4 d-flex">
              <Card className="p-2 card-hover">
                <div>
                  <img
                    className="img-hover"
                    src={eachData.image}
                    alt=""
                    height="300px"
                    width="100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{eachData.recipe_name}</Card.Title>
                  <Card.Text>{eachData.recipe_description}</Card.Text>
                  <Button
                    onClick={() => {
                      setModalShow(true);
                      setModalData(eachData);
                    }}
                    className="w-100 bg-color1 border btn-hover"
                  >
                    View Recipe
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
          <Popup
            data={modalData}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
        <div className="d-flex justify-content-center p-5">
          <Link to={"/recipes"}>
            <button className="btn btn-hover bg-color1 px-5 py-3 border fs-5 rounded-5">
              View All Recipes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
