import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ImagePopup = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="bg-color1">
        <Modal.Header className="justify-content-center" closeButton>
          <Modal.Title
            className="w-100 text-center ms-4"
            id="contained-modal-title-vcenter"
          >
            {props.data.recipe_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-4 p-5">
          <div className="p-5">
            <img
              className="rounded-4"
              width={"100%"}
              src={props.data.image}
              alt=""
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-success border-0 btn-hover"
            onClick={props.onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ImagePopup;
