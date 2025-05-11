import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { GET_ALL } from "../../api/apiService";
import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";

function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("query") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchTerm) return;

        setLoading(true);
        setError(null);

        const params = { pageNumber: 0, pageSize: 100, sortBy: "productId", sortOrder: "asc" };

        GET_ALL("products", params)
            .then((response) => {
                if (response && response.content) {
                    // Lọc sản phẩm theo từ khóa
                    const filteredProducts = response.content.filter(product =>
                        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    setProducts(filteredProducts);
                } else {
                    setError("API trả về dữ liệu không hợp lệ.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy sản phẩm:", error);
                setError("Có lỗi xảy ra, vui lòng thử lại.");
            })
            .finally(() => setLoading(false));

    }, [searchTerm]);

    return (
        <div className="container">
            <strong className="mb-4">Kết quả tìm kiếm cho: "{searchTerm}"</strong>

            {loading && <p>Đang tải...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={product.productId}>
                            <div className="card card-product-grid">
                                <Link to={`/product/${product.productId}`} className="img-wrap">
                                    <img
                                        src={`http://localhost:8080/api/public/products/image/${product.image}`}
                                        alt={product.productName}
                                        onError={(e) => (e.target.src = "/images/default-product.png")}
                                    />
                                </Link>
                                <figcaption className="info-wrap">
                                    <ul className="rating-stars mb-1">
                                        <li className="stars-active">
                                            <img src={startsActive} alt="Active stars" />
</li>
                                        <li>
                                            <img src={startsDisable} alt="Disabled stars" />
                                        </li>
                                    </ul>
                                    <div>
                                        <Link to={`/product/${product.productId}`} className="title">
                                            {product.productName}
                                        </Link>
                                    </div>
                                    <div className="price h5 mt-2">${product.price}</div>
                                </figcaption>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">Không có sản phẩm nào phù hợp.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResults;