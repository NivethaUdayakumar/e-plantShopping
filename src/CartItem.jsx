import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementItem, decrementItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((totalCost, item) => {
      const itemCost = parseFloat(item.cost.replace(/[^0-9.-]+/g, ""));
      return totalCost + itemCost * item.quantity;
    }, 0);
  };

  const handleContinueShopping = (e) => {
    dispatch((e) => onContinueShopping(e));
  };

  const handleCheckoutShopping = (e) => {
    console.log('Checkout');
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(incrementItem(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(decrementItem(item));
    } else {
      dispatch(removeItem(item)); //remove item if 0 quantity
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const calculateTotalCost = (item) => 
    parseFloat(item.cost.replace(/[^\d.-]/g, '')) * item.quantity;

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.filter(item => item.quantity > 0).map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;