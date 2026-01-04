import { memo } from 'react'
import ProductCard from './ProductCard'
import './ProductListing.css'

function ProductListing({ products, cart, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <svg
            className="empty-state-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2>No products found</h2>
          <p>Try adjusting your filters to see more products.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="product-listing">
      <div className="product-grid">
        {products.map((product) => {
          const cartItem = cart.find(item => item.id === product.id)
          const inCart = !!cartItem
          const cartQuantity = cartItem?.quantity || 0

          return (
            <ProductCard
              key={product.id}
              product={product}
              inCart={inCart}
              cartQuantity={cartQuantity}
              onAddToCart={onAddToCart}
            />
          )
        })}
      </div>
    </div>
  )
}

export default memo(ProductListing)

