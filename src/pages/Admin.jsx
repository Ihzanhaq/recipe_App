import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  deleteRecipe,
  getRecipe,
  patchRecipe,
  postRecipe,
} from "../services/allApi";
import Swal from "sweetalert2";
import { BiPencil, BiTrash } from "react-icons/bi";
import ImagePopup from "../components/ImagePopup";

const Admin = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
      recipe_name: "",
      recipe_description: "",
      steps: [],
      image: "",
    });
  const [addData, setAddData] = useState({
    recipe_name: "",
    recipe_description: "",
    steps: [],
    image: "",
  });
  const [editMode, setEditMode] = useState(false);

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

  const addRecipe = async () => {
    try {
      let apiResponse = await postRecipe(addData);
      if (apiResponse.status == 201) {
        Swal.fire({
          title: "Success",
          text: "Successfully Added Recipe",
          icon: "success",
        });
        displayRecipies();
        setAddData({
          recipe_name: "",
          recipe_description: "",
          steps: "",
          image: "",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Error occured while adding data.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error occured while adding data.",
        icon: "error",
      });
    }
  };

  const editRecipe = async (id) => {
    try {
      console.log(addData);
      let apiResponse = await patchRecipe(id, addData);
      if (apiResponse.status == 200) {
        Swal.fire({
          title: "Success",
          text: "Successfully Edited Recipe",
          icon: "success",
        });
        displayRecipies();
        setEditMode(false);
        setAddData({
          recipe_name: "",
          recipe_description: "",
          steps: [],
          image: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error occured while editing data.",
        icon: "error",
      });
    }
  };

  const removeRecipe = async (id) => {
    try {
      let apiResponse = await deleteRecipe(id);
      if (apiResponse.status == 200) {
        Swal.fire({
          title: "Success",
          text: "Successfully Deleted Recipe",
          icon: "success",
        });
        displayRecipies();
      } else {
        Swal.fire({
          title: "Error",
          text: "Error occured while deleting data.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error occured while deleting data.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container p-5">
      <h1 className="text-center p-2">Admin Panel</h1>
      <div className="form shadow rounded-4 row d-flex g-3  p-5">
        <div className="row">
          <div className="col-6">
            <input
              placeholder="Enter Recipe Name"
              className="form-control"
              type="text"
              value={addData.recipe_name}
              onChange={(e) =>
                setAddData({ ...addData, recipe_name: e.target.value })
              }
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Food Image Link"
              value={addData.image}
              onChange={(e) =>
                setAddData({ ...addData, image: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description"
            value={addData.recipe_description}
            onChange={(e) =>
              setAddData({ ...addData, recipe_description: e.target.value })
            }
          />
        </div>
        <div>
          <textarea
            className="form-control"
            placeholder="Enter Recipe Line by Line"
            rows={5}
            value={addData.steps ? addData.steps.join("\n") : ""}
            onChange={(e) => {
              setAddData({ ...addData, steps: e.target.value.split("\n") });
              console.log(addData.steps.join("\n"));
            }}
          ></textarea>
        </div>
        <div className="text-center">
          {editMode ? (
            <button
              onClick={() => editRecipe(addData.id)}
              className="btn btn-warning w-100"
            >
              Edit
            </button>
          ) : (
            <button onClick={addRecipe} className="btn btn-success w-100">
              Add
            </button>
          )}
        </div>
      </div>
      <h1 className="text-center my-4">Recipes</h1>
      <div>
        {" "}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Recipe Name</th>
              <th>Recipe Description</th>
              <th style={{ width: "40%" }}>Recipe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eachData, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{eachData.recipe_name}</td>
                <td>{eachData.recipe_description}</td>
                <td>
                  <ul>
                    {eachData.steps.map((eachStep) => (
                      <li>{eachStep}</li>
                    ))}
                  </ul>
                </td>
                <td className="d-flex flex-column justify-content-evenly gap-3">
                  <button
                    onClick={() => {
                      setEditMode(true);
                      setAddData(eachData);
                    }}
                    className="btn btn-warning"
                  >
                    <BiPencil />
                  </button>
                  <button
                    onClick={() => removeRecipe(eachData.id)}
                    className="btn btn-danger"
                  >
                    <BiTrash />
                  </button>

                  <button
                    onClick={() => {
                      setModalShow(true);
                      setModalData(eachData);
                    }}
                    className="btn btn-primary"
                  >
                    Show Image
                  </button>
                </td>
              </tr>
            ))}
            <ImagePopup
              data={modalData}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
