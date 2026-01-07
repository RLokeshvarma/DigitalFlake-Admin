import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

const EditSubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/subcategories/${id}`).then((res) => {
      setName(res.data.name);
      setCategoryId(res.data.category_id);
      setStatus(res.data.status);
    });
    api.get("/categories").then((res) => setCategories(res.data));
  }, [id]);

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("category_id", categoryId);
    fd.append("status", status);
    if (image) fd.append("image", image);

    await api.put(`/subcategories/${id}`, fd);
    navigate("/subcategories");
  };

  return (
    <div>
      <h5>Edit Sub Category</h5>

      <Form>
        <div style={{ display: "flex", gap: 20 }}>
          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Sub Category</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Category</Form.Label>
            <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </Form.Group>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button variant="secondary" onClick={() => navigate("/subcategories")}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: "#6f2dbd", border: "none" }} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditSubcategory;
