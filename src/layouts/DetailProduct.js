import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GET_ALL } from "../../api/apiService";

const DetaiProduct = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("productId"); // Lấy productId từ URL

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // Khai báo state cho số lượng sản phẩm

    useEffect(() => {
        if (!productId) {
            setError("Không tìm thấy productId.");
            setLoading(false);
            return;
        }

        console.log("Product ID từ URL:", productId);

        GET_ALL(`products/${productId}`)
            .then(response => {
                console.log("API Response:", response);
                if (response) {
                    setProduct(response);
                } else {
                    setError("Không tìm thấy sản phẩm.");
                }
            })
            .catch(err => {
                console.error("Lỗi API:", err);
                setError("Lỗi khi lấy dữ liệu sản phẩm.");
            })
            .finally(() => setLoading(false));
    }, [productId]);

    // Hàm giảm số lượng
    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Không cho số lượng nhỏ hơn 1
    };

    // Hàm tăng số lượng
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!product) return <p>Không tìm thấy sản phẩm.</p>;



     // Hàm thêm sản phẩm vào giỏ hàng
     const addToCart = () => {
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.id === product.productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.productId,
                productName: product.productName,
                image: product.image,
                price: product.price,
                quantity: quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng! 🛒");
    };

    return (
        <section className="section-content bg-white padding-y">
            <div className="container">
                <div className="row">
                    <aside className="col-md-6">
                        <div className="card">
                            <article className="gallery-wrap">
                                <div className="img-big-wrap">
                                    <div>
                                        <img
src={product.image ? `http://localhost:8080/api/public/products/image/${product.image}` : "/images/default-product.png"} 
                                            alt={product.productName} 
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </article>
                        </div>
                    </aside>
                    <main className="col-md-6">
                        <article className="product-info-aside">
                            <h2 className="title mt-3">{product.productName}</h2>

                            <div className="rating-wrap my-3">
                                <ul className="rating-stars">
                                    <li style={{ width: "80%" }} className="stars-active">
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li>
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </li>
                                </ul>
                                <small className="label-rating text-muted">132 reviews</small>
                                <small className="label-rating text-success">
                                    <i className="fa fa-clipboard-check"></i> 154 orders
                                </small>
                            </div>

                            <div className="mb-3">
                                <var className="price h4">${product.price}</var>
                            </div>

                            <p>{product.description}</p>

                            <div className="form-row mt-4">
                                {/* Bộ điều chỉnh số lượng */}
                                <div className="quantity-control d-flex align-items-center my-3">
                                    <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                                    <input 
                                        type="text" 
                                        className="form-control text-center mx-2" 
                                        value={quantity} 
                                        readOnly 
                                        style={{ width: "50px" }}
                    />
      <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                                </div>
                                
                                <div className="form-group col-md mt-3">
                                <button className="btn btn-primary me-2" onClick={addToCart}>
                            <i className="fas fa-shopping-cart"></i> <span className="text">Add to cart</span>
                        </button>
                        <a href="#" className="btn btn-light">
                            <i className="fas fa-envelope"></i> <span className="text">Contact supplier</span>
                        </a>
                    </div>                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default DetaiProduct;