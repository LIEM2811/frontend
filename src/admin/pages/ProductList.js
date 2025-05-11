import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

    const handleDelete = (id) => {
     if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) return;
 
     axios.delete(`http://localhost:8080/api/products/${id}`)
       .then(() => {
         alert("Đã chuyển sản phẩm vào thùng rác");
         fetchProducts();
       })
       .catch(err => {
         console.error("Lỗi khi xoá sản phẩm:", err.response?.data || err.message);
         alert("Không thể xoá sản phẩm. Vui lòng thử lại.");
       });
   };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
      <Link to="/admin/products/new" className="btn btn-primary mb-4">  Thêm sản phẩm</Link>
      <Link to="/admin/products/trash" className="btn btn-secondary mb-4 ml-2">🗑 Xem thùng rác</Link>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th>Tên</th>
            <th>Giá</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td>{p.productName}</td>
              <td>{p.salePrice}₫</td>
              <td><img src={p.imageUrl} alt="" style={{ width: '60px', height: 'auto' }} className="w-20 h-20 object-cover mx-auto" /></td>
              <td>
                <Link to={`/admin/products/edit/${p.id}`} className="text-blue-500 mr-2">✏️ Sửa</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-500">🗑 Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
