import { memo } from 'react'
import './ProductModal.css'

function ProductModal({ product, inCart, cartQuantity, onAddToCart, onClose }) {
  const isOutOfStock = (product.stock ?? 0) === 0

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAddToCart(product)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img
              src={product.thumbnail || product.image}
              alt={product.title}
              className="modal-image"
            />
          </div>
          <div className="modal-details">
            <h2 className="modal-title">{product.title}</h2>
            <p className="modal-category">{product.category}</p>
            <p className="modal-description">
              {product.description || 'No description available.'}
            </p>
            <div className="modal-info">
              <div className="modal-info-item">
                <span className="modal-info-label">Price:</span>
                <span className="modal-info-value">${product.price.toFixed(2)}</span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Stock:</span>
                <span className={`modal-info-value ${isOutOfStock ? 'out' : 'in'}`}>
                  {isOutOfStock ? 'Out of Stock' : `${product.stock ?? 'N/A'} available`}
                </span>
              </div>
              {product.rating && (
                <div className="modal-info-item">
                  <span className="modal-info-label">Rating:</span>
                  <span className="modal-info-value">
                    {product.rating} ⭐ ({product.ratingCount || 'N/A'} reviews)
                  </span>
                </div>
              )}
            </div>
            <button
              className={`modal-add-btn ${isOutOfStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {inCart ? `In Cart (${cartQuantity})` : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProductModal)

