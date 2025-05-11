import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CategoryForm() {
  const [category, setCategory] = useState({ categoryName: "", categoryDescription: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/categories/${id}`).then(res => {
        setCategory(res.data);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:8080/api/categories/${id}`, category);
    } else {
      await axios.post("http://localhost:8080/api/categories", category);
    }
    navigate("/admin/categories");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{id ? "Cập nhật" : "Tạo mới"} danh mục</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label className="block mb-2 font-medium text-gray-700">Tên danh mục *</label>
          <input
            type="text"
            placeholder="Nhập tên danh mục"
            value={category.categoryName}
            onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Mô tả</label>
          <textarea
            placeholder="Nhập mô tả (nếu có)"
            value={category.categoryDescription}
            onChange={(e) => setCategory({ ...category, categoryDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="btn btn-primary"
          >
            {id ? "Cập nhật" : "Thêm mới"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="btn btn-secondary"
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
