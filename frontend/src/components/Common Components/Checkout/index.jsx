import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './checkout.css';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    phone: '',
    street: '',
    city: '',
    pincode: '',
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isAddressValid = () => {
    return Object.values(address).every((field) => field.trim() !== '');
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      alert('❌ Your cart is empty!');
      return;
    }

    if (!isAddressValid()) {
      alert('❌ Please fill in all address fields before proceeding.');
      return;
    }

    try {
      const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const paymentResponse = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      const orderData = await paymentResponse.json();
      console.log('Payment Order Data:', orderData);

      const options = {
        key: 'rzp_test_WgxamtVupSULV6',
        amount: orderData.amount,
        currency: 'INR',
        name: 'Nic Ice Cream',
        description: 'Purchase',
        order_id: orderData.id,
        handler: async function (response) {
          alert('✅ Payment Successful!');

          const orderResponse = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: 'Guest',
              products: cart.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
              })),
              totalAmount,
              paymentId: response.razorpay_payment_id,
              address,
            }),
          });

          if (!orderResponse.ok) {
            const errorData = await orderResponse.json();
            console.error('❌ Order API Error:', errorData);
            alert(`Order Failed: ${errorData.error}`);
            return;
          }

          const orderResult = await orderResponse.json();
          console.log('✅ Order Placed:', orderResult);
          localStorage.removeItem('cart');
          setCart([]);

          navigate('/user-home/order'); // ✅ Redirect to Order Page
        },
        prefill: { name: 'Customer', email: 'customer@example.com' },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('❌ Payment Error:', error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">Checkout</div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty! 🛒</p>
      ) : (
        <>

          <div className="address-section">
            <h2>Shipping Address</h2>
            <input type="text" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleAddressChange} />
            <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleAddressChange} />
            <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} />
            <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleAddressChange} />
          </div>

          <div className="cart-summary">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imageUrl || 'fallback-image.jpg'} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Rs {item.price.toFixed(2)} x {item.quantity}</p>
              </div>
            ))}
            <p className="total-amount">Total: Rs {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>

          <button className="pay-btn" onClick={handlePayment}>
            Pay with Razorpay
          </button>
        </>
      )}
    </div>
  );
}