import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    api.get(`/categories/${id}`).then((res) => {
      setName(res.data.name);
      setStatus(res.data.status);
    });
  }, [id]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    if (image) formData.append("image", image);

    await api.put(`/categories/${id}`, formData);
    navigate("/categories");
  };

  return (
    <div>
      <h5>Edit Category</h5>

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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </Form.Select>
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

export default EditCategory;
