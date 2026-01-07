import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Pencil, Trash, Grid } from "react-bootstrap-icons";

interface Category {
    id: number;
    name: string;
    image_url: string;
    status: "ACTIVE" | "INACTIVE";
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await api.get("/categories");
        setCategories(res.data);
    };

    const handleDelete = async () => {
        await api.delete(`/categories/${selectedId}`);
        setShowDelete(false);
        fetchCategories();
    };

    return (
        <div>
            {/* HEADER */}
            <div style={styles.header}>
                <div style={styles.title}>
                    <Grid size={18} />
                    <span>Category</span>
                </div>

                <Form.Control
                    placeholder="Search"
                    style={styles.search}
                />

                <div style={{ marginLeft: "auto" }}>
                    <Button
                        style={styles.addBtn}
                        onClick={() => navigate("/categories/add")}
                    >
                        Add New
                    </Button>
                </div>
            </div>

            {/* TABLE */}
            <Table style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                <thead>
                    <tr>
                        {["Id", "Category name", "Image", "Status", "Action"].map((h) => (
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
                    {categories.map((c) => (
                        <tr
                            key={c.id}
                            style={{
                                backgroundColor: "#f5f5f5",
                            }}
                        >


                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>{c.id}</td>

                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>{c.name}</td>

                            <td style={{ border: "none",backgroundColor: "#f5f5f5" }}>
                                {c.image_url && (
                                    <img
                                        src={`http://localhost:5000/uploads/categories/${c.image_url}`}
                                        alt={c.name}
                                        style={styles.image}
                                    />
                                )}
                            </td>

                            <td
                                style={{
                                    color: c.status === "ACTIVE" ? "green" : "red",
                                    textTransform: "capitalize",
                                    border: "none",
                                    backgroundColor: "#f5f5f5",
                                }}
                            >
                                {c.status.toLowerCase()}
                            </td>

                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>
                                <Pencil
                                    style={styles.icon}
                                    onClick={() =>
                                        navigate(`/categories/edit/${c.id}`)
                                    }
                                />
                                <Trash
                                    style={styles.icon}
                                    onClick={() => {
                                        setSelectedId(c.id);
                                        setShowDelete(true);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* DELETE CONFIRMATION */}
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

export default Categories;

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
        minWidth: "120px",
    },
    search: {
        flex: 1,
        maxWidth: "450px",
    },
    addBtn: {
        backgroundColor: "#6f2dbd",
        border: "none",
        padding: "6px 14px",
    },
    tableHead: {
        backgroundColor: "#fff3bf",
        fontWeight: "normal",
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
