// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './layouts/Main';

import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ProductList from "./admin/pages/ProductList";
import ProductForm from "./admin/pages/ProductForm";
import ProductTrash from "./admin/pages/ProductTrash";

import CategoryList from "./admin/pages/CategoryList";
import CategoryTrash from "./admin/pages/CategoryTrash";
import CategoryForm from "./admin/pages/CategoryForm";


import './App.css';
import "./assets/sass/app.scss"
function App() {
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        <Route path="products/trash" element={<ProductTrash />} />

        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/new" element={<CategoryForm />} />
        <Route path="categories/edit/:id" element={<CategoryForm />} />
        <Route path="categories/trash" element={<CategoryTrash />} />


      </Route>

      {/* User routes */}
      <Route
        path="/*"
        element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;
