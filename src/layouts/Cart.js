import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import paymentsImg from "../assets/images/misc/payments.png";




const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const updateCart = (items) => {
        setCartItems(items);
        localStorage.setItem("cart", JSON.stringify(items));
    };

    // Hàm tăng số lượng sản phẩm
    const increaseQuantity = (productId) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
    };

    // Hàm giảm số lượng sản phẩm (tối thiểu là 1)
    const decreaseQuantity = (productId) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateCart(updatedCart);
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        updateCart(updatedCart);
    };

    // Tính tổng giá trị giỏ hàng
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <section className="section-content padding-y">
        <div className="container">
            <div className="row">
                <main className="col-md-9">
                    <div className="card">
                        <table className="table table-borderless table-shopping-cart">
                            <thead className="text-muted">
                                <tr className="small text-uppercase">
                                    <th scope="col">Product</th>
                                    <th scope="col" width="120">Quantity</th>
                                    <th scope="col" width="120">Price</th>
                                    <th scope="col" className="text-right" width="200"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <figure className="itemside">
                                                <div className="aside"><img 
                                                    src={item.image ? `http://localhost:8080/api/public/products/image/${item.image}` : "/images/default-product.png"}
                                                    alt={item.productName} 
                                                    width="50"
/></div>
                                                <figcaption className="info">
                                                    <a href="#" className="title text-dark">{item.productName}</a>
                                                    <p className="text-muted small">{item.productDescription}</p>
                                                </figcaption>
                                            </figure>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <button className="btn btn-light" onClick={() => decreaseQuantity(item.id)}>-</button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button className="btn btn-light" onClick={() => increaseQuantity(item.id)}>+</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="price-wrap">
                                                <var className="price">${(item.price * item.quantity).toFixed(2)}</var>
                                                <small className="text-muted"> ${item.price.toFixed(2)} each</small>
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <button className="btn btn-light btn-round" onClick={() => removeFromCart(item.id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
        
                        <div className="card-body border-top">
                            <Link to="/checkout" className="btn btn-primary float-md-right">Make Purchase <i className="fa fa-chevron-right"></i></Link>
                            <Link to="/" className="btn btn-light"> <i className="fa fa-chevron-left"></i> Continue shopping</Link>
                        </div>
                    </div>
        
                    <div className="alert alert-success mt-3">
                        <p className="icontext"><i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
                    </div>
                </main>
        
                <aside className="col-md-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Have coupon?</label>
                                        <div className="input-group">
        <input type="text" className="form-control" placeholder="Coupon code" />
                                        <span className="input-group-append">
                                            <button className="btn btn-primary">Apply</button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
        
                    <div className="card">
                        <div className="card-body">
                            <dl className="dlist-align">
                                <dt>Total price:</dt>
                                <dd className="text-right">${calculateTotal().toFixed(2)}</dd>
                            </dl>
                            <hr />
                            <p className="text-center mb-3">
                            <img src={paymentsImg} height="26" alt="Payments" />
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
        </section>
        
    );
};

export default Cart;