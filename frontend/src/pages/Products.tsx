import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Box, Pencil, Trash } from "react-bootstrap-icons";

interface Product {
  id: number;
  name: string;
  image_url: string;
  subcategory_name: string;
  category_name: string;
  status: "ACTIVE" | "INACTIVE";
}

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setItems(res.data);
  };

  const handleDelete = async () => {
    await api.delete(`/products/${selectedId}`);
    setShowDelete(false);
    fetchProducts();
  };

  return (
    <div>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.title}>
          <Box size={18} />
          <span>Product</span>
        </div>

        <div style={styles.searchWrapper}>
          <Form.Control placeholder="Search" style={styles.searchInput} />
        </div>

        <div style={{ marginLeft: "auto" }}>
          <Button style={styles.addBtn} onClick={() => navigate("/products/add")}>
            Add New
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <Table style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <thead>
          <tr>
            {[
              "Id",
              "Product name",
              "Image",
              "Sub Category",
              "Category",
              "Status",
              "Action",
            ].map((h) => (
              <th
                key={h}
                style={{
                  backgroundColor: "#fff3bf",
                  fontWeight: "normal",
                  border: "none",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((p) => (
            <tr key={p.id} style={{ backgroundColor: "#f5f5f5" }}>
              <td style={styles.td}>{p.id}</td>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>
                {p.image_url && (
                  <img
                    src={`http://localhost:5000/uploads/categories/${p.image_url}`}
                    alt={p.name}
                    style={styles.image}
                  />
                )}
              </td>
              <td style={styles.td}>{p.subcategory_name}</td>
              <td style={styles.td}>{p.category_name}</td>
              <td
                style={{
                  ...styles.td,
                  color: p.status === "ACTIVE" ? "green" : "red",
                  textTransform: "capitalize",
                }}
              >
                {p.status.toLowerCase()}
              </td>
              <td style={styles.td}>
                <Pencil
                  style={styles.icon}
                  onClick={() => navigate(`/products/edit/${p.id}`)}
                />
                <Trash
                  style={styles.icon}
                  onClick={() => {
                    setSelectedId(p.id);
                    setShowDelete(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* DELETE POPUP */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Body style={{ textAlign: "center" }}>
          <h6>⚠ Delete</h6>
          <p>Are you sure you want to delete?</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <Button variant="secondary" onClick={() => setShowDelete(false)}>
              Cancel
            </Button>
            <Button style={styles.addBtn} onClick={handleDelete}>
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;

const styles: any = {
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "18px",
    fontWeight: 500,
    minWidth: "150px",
  },
  searchWrapper: {
    position: "relative",
    flex: 1,
    maxWidth: "450px",
  },
  searchInput: {
    paddingLeft: "10px",
  },
  addBtn: {
    backgroundColor: "#6f2dbd",
    border: "none",
    padding: "6px 14px",
  },
  td: {
    border: "none",
  },
  icon: {
    cursor: "pointer",
    marginRight: "10px",
  },
  image: {
    height: "32px",
    objectFit: "contain",
  },
};
