import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { getRecipe } from "../services/allApi";
import Popup from "../components/Popup";

const Recipes = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
      recipe_name: "",
      recipe_description: "",
      steps: [],
      image: "",
    });

  useEffect(() => {
    displayRecipies();
  }, []);

  const displayRecipies = async () => {
    try {
      let apiResponse = await getRecipe();
      if (apiResponse.status == 200) {
        setData(apiResponse.data);
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
    <div className="container pb-5">
      <h1 style={{ fontSize: "4rem" }} className="font-color1 text-center">
        All Recipes
      </h1>

      <p className="w-75 mx-auto fs-5 text-center">
        Browse through our complete collection of delicious recipes. From quick
        meals to gourmet creations, find your next culinary adventure here.
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
              <Card.Body
                style={{ height: "11rem" }}
                className="d-flex flex-column justify-content-between"
              >
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
    </div>
  );
};

export default Recipes;
