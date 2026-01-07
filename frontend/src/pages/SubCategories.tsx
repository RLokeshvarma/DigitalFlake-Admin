import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Pencil, Trash, Layers } from "react-bootstrap-icons";

interface Subcategory {
    id: number;
    name: string;
    category_name: string;
    image_url: string;
    status: "ACTIVE" | "INACTIVE";
}

const Subcategories = () => {
    const [items, setItems] = useState<Subcategory[]>([]);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const res = await api.get("/subcategories");
        setItems(res.data);
    };

    const handleDelete = async () => {
        await api.delete(`/subcategories/${selectedId}`);
        setShowDelete(false);
        fetchItems();
    };

    return (
        <div>
            <div style={styles.header}>
                <div style={styles.title}>
                    <Layers size={18} />
                    <span>Sub Category</span>
                </div>

                <div style={styles.searchWrapper}>

                    <Form.Control placeholder="Search" style={styles.searchInput} />
                </div>

                <div style={{ marginLeft: "auto" }}>
                    <Button style={styles.addBtn} onClick={() => navigate("/subcategories/add")}>
                        Add New
                    </Button>
                </div>
            </div>

            {/* TABLE */}
            <Table style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                <thead>
                    <tr>
                        {["Id", "Sub Category name", "Category name", "Image", "Status", "Action"].map((h) => (
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
                    {items.map((s) => (
                        <tr key={s.id} style={{ backgroundColor: "#f5f5f5" }}>
                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>{s.id}</td>
                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>{s.name}</td>
                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>{s.category_name}</td>
                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>
                                {s.image_url && (
                                    <img
                                        src={`http://localhost:5000/uploads/categories/${s.image_url}`}
                                        alt={s.name}
                                        style={styles.image}
                                    />
                                )}
                            </td>
                            <td
                                style={{
                                    border: "none",
                                    backgroundColor: "#f5f5f5",
                                    color: s.status === "ACTIVE" ? "green" : "red",
                                    textTransform: "capitalize",
                                }}
                            >
                                {s.status.toLowerCase()}
                            </td>
                            <td style={{ border: "none", backgroundColor: "#f5f5f5" }}>
                                <Pencil
                                    style={styles.icon}
                                    onClick={() => navigate(`/subcategories/edit/${s.id}`)}
                                />
                                <Trash
                                    style={styles.icon}
                                    onClick={() => {
                                        setSelectedId(s.id);
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

export default Subcategories;

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
