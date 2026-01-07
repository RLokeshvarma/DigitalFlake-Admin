import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    await api.post("/categories", formData);
    navigate("/categories");
  };

  return (
    <div>
      <h5>Add Category</h5>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />
          <small className="text-muted">
            Upload maximum allowed file size is 2MB
          </small>
        </Form.Group>

        <div className="d-flex justify-content-end gap-3">
          <Button variant="secondary" onClick={() => navigate("/categories")}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#6f2dbd", border: "none" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddCategory;
