import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoryTrash() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchDeletedCategories();
  }, []);

  const fetchDeletedCategories = async () => {
    const res = await axios.get("http://localhost:8080/api/categories/inactive");
    setCategories(res.data);
  };

  const restore = async (id) => {
    await axios.put(`http://localhost:8080/api/categories/${id}/activate`);
    fetchDeletedCategories();
  };

  const deleteForever = async (id) => {
    await axios.delete(`http://localhost:8080/api/categories/${id}`);
    fetchDeletedCategories();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Danh mục đã xoá</h2>
      <Link to="/admin/categories" className="btn btn-secondary mb-4">← Quay lại</Link>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.categoryName}</td>
              <td>
                <button onClick={() => restore(cat.id)} className="btn btn-sm btn-success mr-2">Phục hồi</button>
                <button onClick={() => deleteForever(cat.id)} className="btn btn-sm btn-danger">Xoá vĩnh viễn</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTrash;
