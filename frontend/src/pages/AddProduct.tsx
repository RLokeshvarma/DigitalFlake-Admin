import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Box } from "react-bootstrap-icons";

const greyInput = {
  backgroundColor: "#f5f5f5",
  border: "1px solid #ddd",
};

const AddProduct = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (categoryId) {
      api.get(`/subcategories?category_id=${categoryId}`)
        .then((res) => setSubcategories(res.data));
    }
  }, [categoryId]);

  const handleSubmit = async () => {
    await api.post("/products", {
      name,
      category_id: categoryId,
      subcategory_id: subcategoryId,
    });
    navigate("/products");
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <Box />
        <h5 style={{ margin: 0 }}>Add Product</h5>
      </div>

      <Form>
        <div style={{ display: "flex", gap: 20 }}>
          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={greyInput}
            />
          </Form.Group>

          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={greyInput}
            >
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group style={{ flex: 1 }}>
            <Form.Label>Subcategory</Form.Label>
            <Form.Select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              style={greyInput}
            >
              <option value="">Select</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button variant="secondary" onClick={() => navigate("/products")}>
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

export default AddProduct;
