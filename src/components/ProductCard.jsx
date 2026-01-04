import { memo, useState } from 'react'
import ProductModal from './ProductModal'
import './ProductCard.css'

function ProductCard({ product, inCart, cartQuantity, onAddToCart }) {
  const [showModal, setShowModal] = useState(false)
  const isOutOfStock = (product.stock ?? 0) === 0

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!isOutOfStock) {
      onAddToCart(product)
    }
  }

  const handleCardClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <div className="product-image-container">
          <img
            src={product.thumbnail || product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
          {isOutOfStock && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <span className={`stock-status ${isOutOfStock ? 'out' : 'in'}`}>
              {isOutOfStock ? 'Out of stock' : 'In stock'}
            </span>
          </div>
          <button
            className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {inCart ? `In Cart (${cartQuantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>
      {showModal && (
        <ProductModal
          product={product}
          inCart={inCart}
          cartQuantity={cartQuantity}
          onAddToCart={onAddToCart}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default memo(ProductCard)

