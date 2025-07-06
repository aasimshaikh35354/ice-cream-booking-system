import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/category/${categoryId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/user-home/cart'); // Navigate to Cart Page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="categories" id="categories">
      <h1 className="heading">
        Products <span>Categories</span>
      </h1>
      <div className="box-container">
        {categories.map((category) => (
          <div
            className="cat-box"
            key={category._id}
            onClick={() => fetchProducts(category._id)}
          >
            <img src={category.imageUrl} alt={category.name} />
            <h3>{category.name}</h3>
            <p className='cat-discount'>{category.discount || 'No discounts available'} OFF</p>
          </div>
        ))}
      </div>

      {/* Display products when a category is selected */}
      {selectedCategory && (
        <div className="products-container">
          <h2>
            Products in{' '}
            {categories.find((cat) => cat._id === selectedCategory)?.name}
          </h2>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={product.imageUrl || 'fallback-image.jpg'}
                    alt={product.name}
                    onError={(e) => (e.target.src = 'fallback-image.jpg')}
                  />
                  <h3>{product.name}</h3>
                  <div className="price">Rs {product.price.toFixed(2)}</div>
                  <div className="ratings">Rating: {product.ratings} / 5</div>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
