import React, { useEffect, useState } from 'react'
import { GET_ALL } from '../../api/apiService';
import { Link } from 'react-router-dom'; // Import Link

function Items() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        GET_ALL(`http://localhost:8080/api/public/products?pageNumber=1&pageSize=10&sortBy=id&sortOrder=ASC`)
            .then((data) => {
                console.log("data la:", data.content)
                const product = data.content;
                console.log("data:", product)

                setProducts(product); // Lưu dữ liệu sản phẩm vào state
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []); // Chạy chỉ một lần khi component được mount

    return (
        <section className="padding-bottom">
            <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">Request for Quotation</h4>
            </header>

            <div className="row row-sm">
                {products.map((product) => (
                    <div key={product.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
                        <div className="card card-sm card-product-grid">
                            <Link to={`/product/${product.productId}`} className="img-wrap"> {/* Sử dụng Link để điều hướng */}
                                <img src={`http://localhost:8080/api/public/products/image/${product.image}`} alt={product.name} />
                            </Link>
                            <figcaption className="info-wrap">
                                <Link to={`/product/${product.id}`} className="title">{product.productName}</Link>
                                <div className="price mt-1">${product.specialPrice}</div>
                            </figcaption>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Items;
