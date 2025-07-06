import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UserDashboard from './UserDashboard';
import VendorDashboard from './VendorDashboard';
import AdminDashboard from './AdminDashboard';
import Product from './pages/User Pages/Products';
import Categories from './pages/User Pages/Categories';
import OrderStatus from './pages/User Pages/OrderStatus';
import AddProductVendor from './pages/Vendor Pages/AddProduct';
import AddProduct from './pages/Admin Pages/AddProducts';
import UsersManagement from './pages/Admin Pages/UserManagementPage';
import VendorsManagement from './pages/Admin Pages/VendorManagementPage';
import OrderStatusManagementPage from './pages/Vendor Pages/OrderStatusManagementPage';
import CategoryManagementPage from './pages/Admin Pages/CategoryManagementPage';
import ReviewPage from './pages/User Pages/ReviewPage';
import CartPage from './pages/User Pages/Cart';
import CheckoutPage from './pages/User Pages/Checkout';
import SearchForm from './components/Common Components/Header/SearchForm/index';
import BlogPage from './pages/User Pages/BlogPage';
import ManageBlogsPage from './pages/Admin Pages/Blogs';
import RegisterPage from './RegisterPage';
import './App.css';
import WishlistPage from './pages/User Pages/WishlistPage';
import BlogDetail from './pages/User Pages/BlogDetail';
import DeliveryBoyManagement from './pages/Vendor Pages/AddDeliveryBoy';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  return (
    <Router>
      <div>
        {/* Search Bar (Visible on all pages except login) */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        <Routes>
          <Route path="/user-home" element={<UserDashboard />} />
          <Route path="/vendor-home" element={<VendorDashboard />} />
          <Route path="/admin-home" element={<AdminDashboard />} />

          {/* User Pages */}
          <Route path="/user-home/product" element={<Product />} />
          <Route path="/user-home/categories" element={<Categories />} />
          <Route path="/user-home/order" element={<OrderStatus />} />
          <Route path="/user-home/wishlist" element={<WishlistPage />} />
          <Route path="/user-home/review" element={<ReviewPage />} />
          <Route path="/user-home/cart" element={<CartPage />} />
          <Route path="/user-home/checkout" element={<CheckoutPage />} />
          <Route path="/user-home/blogs" element={<BlogPage />} />
          <Route path="/user-home/blog/:id" element={<BlogDetail />} />

          {/* Vendor Pages */}
          <Route
            path="/vendor-home/add-product"
            element={<AddProductVendor />}
          />
          <Route
            path="/vendor-home/manage-order-status"
            element={<OrderStatusManagementPage />}
          />

          <Route
            path='/vendor-home/add-delivery-boy'
            element={<DeliveryBoyManagement />}
          />

          {/* Admin Pages */}
          <Route path="/admin-home/add-product" element={<AddProduct />} />
          <Route
            path="/admin-home/user-management"
            element={<UsersManagement />}
          />
          <Route
            path="/admin-home/vendor-management"
            element={<VendorsManagement />}
          />
          <Route
            path="/admin-home/manage-categories"
            element={<CategoryManagementPage />}
          />
          <Route
            path="/admin-home/manage-blogs"
            element={<ManageBlogsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
