import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_ID } from "../api/apiService";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await GET_ID("products", id);
                setProduct(response);
            } catch (error) {
                console.error("Không thể lấy dữ liệu sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    if (loading) return <p>Loading...</p>;

    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    const totalPrice = quantity * product.specialPrice;

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
        <div className="container mt-5">
            <div className="row">
                <aside className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="img-big-wrap">
                            <img
                                src={`http://localhost:8080/api/public/products/image/${product.image}`}
                                alt={product.productName}
                                className="img-fluid rounded"
                                style={{
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>
                </aside>
                <main className="col-md-6">
                    <article className="product-info-aside">
                        <h2 className="title mt-3 mb-3">{product.productName}</h2>
                        <div className="rating-wrap mb-3">
                            <ul className="rating-stars">
                                <li style={{ width: `${product.rating}%` }} className="stars-active">
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
                            <small className="label-rating text-muted ml-2">
                                {product.reviews?.length || 0} reviews
                            </small>
                            <small className="label-rating text-success ml-3">
                                <i className="fa fa-clipboard-check"></i> {product.orders} orders
                            </small>
                        </div>
                        <div className="mb-3">
                            <var className="price h4 text-primary">USD {totalPrice.toFixed(2)}</var>
                            <span className="text-muted d-block">
                                Giá gốc: USD {product.originalPrice} (đã bao gồm VAT)
                            </span>
                        </div>
                        <p>{product.description}</p>
                        <dl className="row mb-4">
                            <dt className="col-sm-4">Nhà sản xuất</dt>
                            <dd className="col-sm-8">
                                <a href="#">{product.manufacturer}</a>
                            </dd>
                            <dt className="col-sm-4">Mã sản phẩm</dt>
                            <dd className="col-sm-8">{product.articleNumber}</dd>
                            <dt className="col-sm-4">Bảo hành</dt>
                            <dd className="col-sm-8">{product.guarantee}</dd>
                            <dt className="col-sm-4">Thời gian giao hàng</dt>
                            <dd className="col-sm-8">{product.deliveryTime}</dd>
                            <dt className="col-sm-4">Tình trạng hàng</dt>
                            <dd className="col-sm-8">{product.availability}</dd>
                        </dl>
                        <div className="form-row mt-4">
                            <div className="form-group col-md-4">
                                <div className="input-group input-spinner">
                                    <div className="input-group-prepend">
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            onClick={decrementQuantity}
                                        >
                                            −
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        value={quantity}
                                        readOnly
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-light"
                                            type="button"
                                            onClick={incrementQuantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-8">
<button className="btn btn-primary me-2" onClick={addToCart}>
                            <i className="fas fa-shopping-cart"></i> <span className="text">Add to cart</span>
                        </button>                            </div>
                        </div>
                    </article>
                </main>
            </div>
            <section className="section-name padding-y bg mt-5">
                <div className="container">
                    <h5 className="title-description">Đánh giá sản phẩm</h5>
                    <div className="reviews">
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <div key={index} className="review-item mb-4 p-3 bg-light rounded shadow-sm">
                                    <div className="review-author font-weight-bold">
                                        {review.author}{" "}
                                        <small className="text-muted ml-2">{review.date}</small>
                                    </div>
                                    <div className="review-rating text-warning">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <i key={i} className="fa fa-star"></i>
                                        ))}
                                    </div>
                                    <div className="review-comment mt-2">
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có đánh giá nào.</p>
                        )}
                    </div>
                    {/* Add Review Form */}
                    {/* <div className="add-review mt-5">
                        <h5 className="title-description">Viết đánh giá</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="reviewAuthor">Tên của bạn</label>
                                <input
                                    type="text"
                                    id="reviewAuthor"
                                    name="author"
                                    className="form-control"
                                    placeholder="Tên của bạn"
                                    value={newReview.author}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewComment">Đánh giá của bạn</label>
                                <textarea
                                    id="reviewComment"
                                    name="comment"
                                    className="form-control"
                                    placeholder="Viết đánh giá của bạn tại đây"
                                    value={newReview.comment}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewRating">Xếp hạng</label>
                                <select
                                    id="reviewRating"
                                    name="rating"
                                    className="form-control"
                                    value={newReview.rating}
                                    onChange={handleChange}
                                >
                                    <option value="5">5 - Tuyệt vời</option>
                                    <option value="4">4 - Tốt</option>
                                    <option value="3">3 - Trung bình</option>
                                    <option value="2">2 - Kém</option>
                                    <option value="1">1 - Tệ</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Gửi đánh giá</button>
                        </form>
                    </div> */}
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
