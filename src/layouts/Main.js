import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import UserLogin from './UserLogin';
import SectionContent from './../pages/listinggrid/SectionContent';
import SearchResults from './../pages/search/SearchResults';
import Register from './../pages/register/Register';
import ProductDetail from '../component/productdetail';
import Cart from './Cart';

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<UserLogin />} />
      <Route path="/ListingGrid" element={<SectionContent />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/Cart" element={<Cart />} />
    </Routes>
  </main>
);

export default Main;
