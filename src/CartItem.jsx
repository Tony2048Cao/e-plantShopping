import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
/*
  // Estado para el total de cantidad de artículos en el carrito
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Función para calcular el total de artículos en el carrito
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Actualizar el total de artículos cada vez que cambie el carrito
  useEffect(() => {
    setTotalQuantity(calculateTotalQuantity());
  }, [cart]);
*/
const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const convertCostToInt = (costString) => {
  // Remover el símbolo de dólar y convertir a número entero
  return parseInt(costString.replace('$', ''), 10);
};
  // Función para calcular el costo total de todos los productos en el carrito
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + (item.quantity * convertCostToInt(item.cost));
    }, 0);
  };

  // Manejo de incrementar cantidad
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Manejo de decrementar cantidad
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item); // Si la cantidad es 1 y se presiona "-", eliminamos el artículo.
    }
  };

  // Manejo de remover el artículo del carrito
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calcular el costo total basado en la cantidad de un artículo específico
  const calculateTotalCost = (item) => {
    return item.quantity * convertCostToInt(item.cost);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3>Total Items in Cart: {totalQuantity}</h3>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Price: {item.cost}</div>
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
