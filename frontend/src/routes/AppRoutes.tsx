import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Subcategories from "../pages/SubCategories";
import Products from "../pages/Products";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/AdminLayout";
import AddCategory from "../pages/AddCategory";
import EditCategory from "../pages/EditCategory";
import AddSubCategory from "../pages/AddSubCategory";
import EditSubCategory from "../pages/EditSubCategory";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="categories" element={<Categories />} />
                <Route path="categories/add" element={<AddCategory />} />
                <Route path="categories/edit/:id" element={<EditCategory />} />
                <Route path="subcategories" element={<Subcategories />} />
                <Route path="subcategories/add" element={<AddSubCategory />} />
                <Route path="subcategories/edit/:id" element={<EditSubCategory />} />
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/edit/:id" element={<EditProduct />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
