import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import { Link ,useNavigate} from "react-router-dom";
import us from "../assets/images/icons/flags/US.png";
import logo from "../assets/images/logo.svg";
import Dropdown from 'react-bootstrap/Dropdown';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
function Header() {
  const token = localStorage.getItem("authToken");
  const [categories, setCategories] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Thay đổi từ 0 thành ''
    const navigate = useNavigate();

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 5,
      sortBy: "categoryId",
      sortOrder: "asc",
    };
    GET_ALL("categories", params) // Pass the query parameters here
      .then((response) => {
        // Assuming the response structure has the data inside 'data' /
        setCategories(response.content); // Update the state with the fetched data
        console.log("response", response.content);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error); // Handle any errors
      });
  }, []);
      const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() || selectedCategoryId) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}&pageNumber=1&pageSize=10&sortBy=id&sortOrder=ASC${selectedCategoryId ? `&cateid=${selectedCategoryId}` : ''}`);
        }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login");
  };

  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
const handleSearch = (e) => {
        e.preventDefault();
        
        if (searchTerm.trim() !== "") {
            navigate(`/search?query=${searchTerm}`); // Điều hướng đến trang tìm kiếm
        }
    };

  return (
    <header className="section-header">
      <nav className="navbar d-none d-md-flex p-md- navbar-expand-sm navbar-light border-bottom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTop4"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTop4">
            <ul className="navbar-nav mr-auto">
              {!token ? (
                <li>
                  <span className="nav-link">
                    Xin chào, <Link to="/Login">Đăng nhap </Link> hoặc
                    <Link to="/Register"> Đăng ký</Link>
                  </span>
                </li>
              ) : (
<li>
                  <span className="nav-link">
                    Xin chào, <button onClick={handleLogout} className="btn btn-link">Đăng xuất</button> hoặc
                    <Link to="/Register"> Đăng ký</Link>
                  </span>
                </li>              )
              }
              <li>
                <a href="#" className="nav-link">
                  {" "}
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Bán hàng
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Trợ giúp.
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li>
                <a href="#" className="nav-link">
                  <img src={us} alt="us" height="16" /> Giao hàng tới
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  {" "}
                  Danh sách theo dõi
                </a>
                <ul className="dropdown-menu small">
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      Sản phẩm thứ nhất
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      Sản phẩm thứ hai
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      Sản phẩm thứ ba
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Cửa hàng của tôi
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  {" "}
                  <i className="fa fa-bell"></i>
                </a>
              </li>
              <li>
                <a href="/cart" className="nav-link">
                  <i className="fa fa-shopping-cart"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <section className="header-main border-bottom">
          <div className="row row-sm">
            <div className="col-6 col-sm col-md col-lg flex-grow-0">
              <Link to="/Home" className="brand-wrap">
                <img className="logo" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="col-6 col-sm col-md col-lg flex-md-grow-0">
              <div className="d-md-none float-right">
                <a href="#" className="btn btn-light">
                  <i className="fa fa-bell"></i>
                </a>
                <a href="#" className="btn btn-light">
                  {" "}
                  <i className="fa fa-user"></i>
                </a>
                <a href="#" className="btn btn-light">
                  {" "}
                  <i className="fa fa-shopping-cart"></i> 2
                </a>
              </div>
              <div className="category-wrap d-none dropdown d-md-inline-block">
                <button
                  type="button"
                  className="btn btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Mua sắm theo
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    {" "}
                    Máy móc / Phụ tùng cơ khí / Dụng cụ
                  </a>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Điện tử tiêu dùng / Thiết bị gia dụng
                  </a>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Xe hơi / Giao thông
                  </a>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Thời trang / Vải và sản phẩm vải
                  </a>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Nhà cửa &amp; Vườn / Xây dựng / Đèn
                  </a>
                  <a className="dropdown-item" href="#">
                    Làm đẹp &amp; Châm sóc cá nhân / Sức khỏe
                  </a>
                </div>
              </div>
            </div>
        <div className="col-lg-6 col-xl col-md-5 col-sm-12 flex-grow-1">
                            <form className="search-header" onSubmit={handleSearch}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <select className="custom-select border-left" name="category_name">
                                        <option value="">Tất cả loại</option>
                                        <option value="codex">Đặc biệt</option>
                                        <option value="comments">Chỉ tốt nhất</option>
                                        <option value="content">Mới nhất</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg col-md" style={{ flexGrow: 0.2 }}>
                            <button className="btn btn-block btn-primary" type="submit" onClick={handleSearch}>
                                Tìm kiếm
                            </button>
                        </div>
            <div className="col-lg col-md" style={{ flexGrow: 0.2 }}>
              {" "}
              <button className="btn btn-block btn-light" type="submit">
                {""}
                Nâng cao{""}
              </button>
            </div>
          </div>
        </section>
        <nav className="navbar navbar-main navbar-expand pl-0">
		

          <ul className="navbar-nav flex-wrap">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                Trang chủ
              </Link>
            </li>
			<li>
		
			<Dropdown>
      <Dropdown.Toggle  variant="none" id="dropdown-basic">
      Danh sách sản phẩm
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {categories.length > 0 &&
                  categories.map((row) => (
                    <Dropdown.Item
                      className="dropdown-item"
                      href={`/ListingGrid?categoryId=${row.categoryId}`}
                    >
                      {row.categoryName}
                    </Dropdown.Item>
                  ))
				  }
          <Dropdown.Item className="dropdown-item" href="/ListingGrid">
                  Tất cả sản phẩm
                </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
					
				
			
			</li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Điện tử
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Thời trang
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Làm đẹp
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {" "}
                Xe hơi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {" "}
                Thể thao
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {" "}
                Nông trại và vườn
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {" "}
                Khuyến mãi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dưới $10
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;

