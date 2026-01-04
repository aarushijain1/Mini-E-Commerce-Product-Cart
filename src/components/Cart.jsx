import { memo, useMemo } from 'react'
import CartItem from './CartItem'
import './Cart.css'

function Cart({ cart, onRemoveFromCart, onUpdateQuantity }) {
  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + item.quantity,
        totalPrice: acc.totalPrice + item.price * item.quantity,
      }),
      { totalItems: 0, totalPrice: 0 }
    )
  }, [cart])

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2 className="cart-title">Cart</h2>
        <div className="empty-cart">
          <svg
            className="empty-cart-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p>Your cart is empty</p>
          <p className="empty-cart-subtitle">Add some products to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2 className="cart-title">Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemoveFromCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Total Items:</span>
          <span className="cart-summary-value">{totalItems}</span>
        </div>
        <div className="cart-summary-row total">
          <span>Total Price:</span>
          <span className="cart-summary-value">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(Cart)

