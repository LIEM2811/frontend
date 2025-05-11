import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8080/api/categories/active");
    setCategories(res.data);
  };

  const softDelete = async (id) => {
    await axios.put(`http://localhost:8080/api/categories/${id}/deactivate`);
    fetchCategories();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Danh mục đang hoạt động</h2>
      <Link to="/admin/categories/new" className="btn btn-primary mb-4">+ Thêm mới</Link>
      <Link to="/admin/categories/trash" className="btn btn-secondary mb-4 ml-2">🗑 Thùng rác</Link>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.categoryName}</td>
              <td>{cat.categoryDescription}</td>
              <td>
                <Link to={`/admin/categories/edit/${cat.id}`} className="btn btn-sm btn-warning mr-2">Sửa</Link>
                <button onClick={() => softDelete(cat.id)} className="btn btn-sm btn-danger">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
