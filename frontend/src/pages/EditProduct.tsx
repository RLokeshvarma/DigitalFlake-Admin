import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { Box } from "react-bootstrap-icons";

const greyInput = {
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
};

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subcategoryId, setSubcategoryId] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [existingImage, setExistingImage] = useState("");


    useEffect(() => {
        api.get(`/products/${id}`).then((res) => {
            setName(res.data.name);
            setCategoryId(res.data.category_id);
            setSubcategoryId(res.data.subcategory_id);
            setStatus(res.data.status);
            setExistingImage(res.data.image_url);
        });

        api.get("/categories").then((res) => setCategories(res.data));
    }, [id]);


    useEffect(() => {
        if (categoryId) {
            api.get(`/subcategories?category_id=${categoryId}`)
                .then((res) => setSubcategories(res.data));
        }
    }, [categoryId]);

    const handleSubmit = async () => {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("category_id", categoryId);
        fd.append("subcategory_id", subcategoryId);
        fd.append("status", status);

        if (image) {
            fd.append("image", image);
        }

        await api.put(`/products/${id}`, fd);
        navigate("/products");
    };


    return (
        <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <Box />
                <h5 style={{ margin: 0 }}>Edit Product</h5>
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
                        <Form.Label>Subcategory</Form.Label>
                        <Form.Select
                            value={subcategoryId}
                            onChange={(e) => setSubcategoryId(e.target.value)}
                            style={greyInput}
                        >
                            {subcategories.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </Form.Select>

                    </Form.Group>

                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            style={greyInput}
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>

                <Form.Group className="mt-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={greyInput}
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Upload Image</Form.Label>

                    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                        {/* Existing Image */}
                        {existingImage && (
                            <img
                                src={`http://localhost:5000/uploads/${existingImage}`}
                                alt="product"
                                style={{
                                    width: 70,
                                    height: 70,
                                    objectFit: "contain",
                                    border: "1px solid #ddd",
                                    borderRadius: 6,
                                    padding: 5,
                                    backgroundColor: "#fff",
                                }}
                            />
                        )}

                        {/* Upload Input */}
                        <div>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />
                            <small className="text-muted">
                                Upload maximum allowed file size is 2MB
                            </small>
                        </div>
                    </div>
                </Form.Group>


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

export default EditProduct;
