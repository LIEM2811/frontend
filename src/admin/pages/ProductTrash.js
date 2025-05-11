// src/admin/pages/ProductTrash.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductTrash = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách trong thùng rác
  const fetchTrash = () => {
    axios.get("http://localhost:8080/api/products/trash")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Lỗi fetch thùng rác:", err));
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  // Phục hồi sản phẩm
  const handleRestore = (id) => {
    axios.put(`http://localhost:8080/api/products/restore/${id}`)
      .then(() => {
        alert("Đã phục hồi sản phẩm");
        fetchTrash();
      })
      .catch(err => {
        console.error("Lỗi khi phục hồi:", err);
        alert("Không thể phục hồi sản phẩm.");
      });
  };

  // Xoá vĩnh viễn sản phẩm
  const handlePermanentDelete = (id) => {
    if (!window.confirm("Bạn có chắc xoá vĩnh viễn sản phẩm này?")) return;
    axios.delete(`http://localhost:8080/api/products/permanent/${id}`)
      .then(() => {
        alert("Đã xoá vĩnh viễn sản phẩm");
        fetchTrash();
      })
      .catch(err => {
        console.error("Lỗi khi xoá vĩnh viễn:", err);
        alert("Không thể xoá vĩnh viễn sản phẩm.");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🗑 Thùng rác sản phẩm</h2>
      <div className="flex mb-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          ← Quay lại danh sách
        </button>
      </div>
      <table className="w-full border rounded overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-2 px-4">Tên</th>
            <th className="py-2 px-4">Ảnh</th>
            <th className="py-2 px-4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                Không có sản phẩm nào trong thùng rác
              </td>
            </tr>
          ) : products.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td className="py-2 px-4">{p.productName}</td>
              <td className="py-2 px-4">
                {p.imageUrl
                  ? <img src={p.imageUrl} alt={p.productName}
                       style={{ width: '60px', height: 'auto' }} className="w-16 h-16 object-cover mx-auto rounded" />
                  : <span className="text-gray-400">—</span>
                }
              </td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleRestore(p.id)}
                  className="bg-green-300 hover:bg-green-400 text-white px-3 py-1 rounded transition"
                >
                  🔁 Phục hồi
                </button>
                <button
                  onClick={() => handlePermanentDelete(p.id)}
                  className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded transition"
                >
                  ❌ Xoá vĩnh viễn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTrash;
