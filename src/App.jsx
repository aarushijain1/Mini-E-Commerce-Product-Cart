import { useState, useEffect, useMemo, useCallback } from 'react'
import ProductListing from './components/ProductListing'
import Cart from './components/Cart'
import Filters from './components/Filters'
import { fetchProducts } from './utils/api'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('')

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))]
    return uniqueCategories.sort()
  }, [products])


  const filteredProducts = useMemo(() => {
    let filtered = [...products]


    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (sortOrder === 'low-high') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'high-low') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [products, searchQuery, selectedCategory, sortOrder])

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      const stock = product.stock ?? Infinity // Treat undefined stock as unlimited
      if (existingItem) {
        if (existingItem.quantity < stock) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return prevCart
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCart(prevCart => {
      const product = products.find(p => p.id === productId)
      if (!product) return prevCart

      const stock = product.stock ?? Infinity
      const maxQuantity = Math.min(newQuantity, stock)
      if (maxQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId)
      }

      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: maxQuantity }
          : item
      )
    })
  }, [products])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortOrder('')
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini E-Commerce</h1>
      </header>
      <div className="app-container">
        <aside className="sidebar">
          <Filters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onClearFilters={clearFilters}
          />
        </aside>
        <main className="main-content">
          <ProductListing
            products={filteredProducts}
            cart={cart}
            onAddToCart={addToCart}
          />
        </main>
        <aside className="cart-sidebar">
          <Cart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        </aside>
      </div>
    </div>
  )
}

export default App