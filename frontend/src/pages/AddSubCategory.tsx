import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

const AddSubcategory = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("category_id", categoryId);
    if (image) fd.append("image", image);

    await api.post("/subcategories", fd);
    navigate("/subcategories");
  };

  return (
    <div>
      <h5>Add Sub Category</h5>

      <Form>
        <div style={{ display: "flex", gap: 20 }}>
          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Sub Category</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Category</Form.Label>
            <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          <small className="text-muted">Upload maximum allowed file size is 2MB</small>
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

export default AddSubcategory;
