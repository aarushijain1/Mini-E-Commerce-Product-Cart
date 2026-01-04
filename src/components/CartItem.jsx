import { memo } from 'react'
import './CartItem.css'

function CartItem({ item, onRemove, onUpdateQuantity }) {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10)
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    } else {
      onRemove(item.id)
    }
  }

  const handleIncrease = () => {
    const stock = item.stock ?? Infinity
    if (item.quantity < stock) {
      onUpdateQuantity(item.id, item.quantity + 1)
    }
  }

  return (
    <div className="cart-item">
      <img
        src={item.thumbnail || item.image}
        alt={item.title}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              className="quantity-input"
              value={item.quantity}
              onChange={handleQuantityChange}
              min="1"
              max={item.stock ?? undefined}
            />
            <button
              className="quantity-btn"
              onClick={handleIncrease}
              disabled={item.stock !== undefined && item.quantity >= item.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            className="remove-btn"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
        <p className="cart-item-total">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default memo(CartItem)

