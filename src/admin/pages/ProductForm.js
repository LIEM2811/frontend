import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Khởi tạo state tương ứng với Product entity
  const [product, setProduct] = useState({
    productName: "",
    shortDescription: "",
    productDescription: "",
    productType: "SIMPLE",
    salePrice: "",
    buyingPrice: "",
    comparePrice: "",
    quantity: "",
    disableOutOfStock: false,
    published: true,
    note: "",
    imageUrl: ""
  });

  // Khi sửa: load data vào form
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/products/${id}`)
        .then(res => {
          const p = res.data;
          setProduct({
            productName: p.productName || "",
            shortDescription: p.shortDescription || "",
            productDescription: p.productDescription || "",
            productType: p.productType || "SIMPLE",
            salePrice: p.salePrice || "",
            buyingPrice: p.buyingPrice || "",
            comparePrice: p.comparePrice || "",
            quantity: p.quantity || "",
            disableOutOfStock: p.disableOutOfStock || false,
            published: p.published || false,
            note: p.note || "",
            imageUrl: p.imageUrl || ""
          });
        })
        .catch(() => alert("Không lấy được thông tin sản phẩm!"));
    }
  }, [id]);

  // Cập nhật state khi thay đổi input
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Gửi dữ liệu lên server
  const handleSubmit = e => {
    e.preventDefault();

    // Build payload đúng structure
    const payload = {
      productName: product.productName,
      shortDescription: product.shortDescription,
      productDescription: product.productDescription,
      productType: product.productType,
      salePrice: parseFloat(product.salePrice),
      buyingPrice: product.buyingPrice ? parseFloat(product.buyingPrice) : null,
      comparePrice: product.comparePrice ? parseFloat(product.comparePrice) : null,
      quantity: parseInt(product.quantity, 10),
      disableOutOfStock: product.disableOutOfStock,
      published: product.published,
      note: product.note,
      imageUrl: product.imageUrl
      // slug và timestamps sẽ do backend tự sinh
    };

    const request = id
      ? axios.put(`http://localhost:8080/api/products/${id}`, payload)
      : axios.post(`http://localhost:8080/api/products`, payload);

    request
      .then(() => {
        alert(id ? "Cập nhật thành công!" : "Thêm mới thành công!");
        navigate("/admin/products");
      })
      .catch(err => {
        console.error("Lỗi khi lưu:", err.response?.data || err.message);
        alert("Không thể lưu sản phẩm, vui lòng kiểm tra lại.");
      });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-blue-50 rounded-lg shadow-md">
      
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        {id ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
      </h2>
      <button
        onClick={() => navigate("/admin/products")}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Quay lại danh sách sản phẩm
      </button>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* productName */}
        <div>
          <label className="block text-blue-800 mb-1">Tên sản phẩm *</label>
          <input
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* shortDescription */}
        <div>
          <label className="block text-blue-800 mb-1">Mô tả ngắn *</label>
          <textarea
            name="shortDescription"
            value={product.shortDescription}
            onChange={handleChange}
            rows="2"
            required
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* productDescription */}
        <div>
          <label className="block text-blue-800 mb-1">Mô tả chi tiết *</label>
          <textarea
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* productType */}
        <div>
          <label className="block text-blue-800 mb-1">Loại sản phẩm *</label>
          <select
            name="productType"
            value={product.productType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="SIMPLE">SIMPLE</option>
            <option value="VARIABLE">VARIABLE</option>
          </select>
        </div>

        {/* salePrice */}
        <div>
          <label className="block text-blue-800 mb-1">Giá bán (VNĐ) *</label>
          <input
            name="salePrice"
            type="number"
            value={product.salePrice}
            onChange={handleChange}
            required
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* quantity */}
        <div>
          <label className="block text-blue-800 mb-1">Số lượng *</label>
          <input
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* optional fields */}
        <div>
          <label className="block text-blue-800 mb-1">Giá nhập</label>
          <input
            name="buyingPrice"
            type="number"
            value={product.buyingPrice}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-800 mb-1">Giá so sánh</label>
          <input
            name="comparePrice"
            type="number"
            value={product.comparePrice}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-800 mb-1">Ghi chú</label>
          <input
            name="note"
            value={product.note}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-800 mb-1">Link ảnh</label>
          <input
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="disable"
            name="disableOutOfStock"
            type="checkbox"
            checked={product.disableOutOfStock}
            onChange={handleChange}
            className="accent-blue-500"
          />
          <label htmlFor="disable" className="text-blue-800">Ẩn sản phẩm</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="published"
            name="published"
            type="checkbox"
            checked={product.published}
            onChange={handleChange}
            className="accent-blue-500"
          />
          <label htmlFor="published" className="text-blue-800">Published</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 text-blue py-3 rounded transition"
        >
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
