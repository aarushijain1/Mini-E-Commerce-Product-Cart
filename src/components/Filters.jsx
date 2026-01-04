import { useState, useEffect } from 'react'
import './Filters.css'

function Filters({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClearFilters,
}) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  useEffect(() => {
    setDebouncedSearch(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(debouncedSearch)
    }, 300)

    return () => clearTimeout(timer)
  }, [debouncedSearch, onSearchChange])

  const hasActiveFilters = searchQuery || selectedCategory || sortOrder

  return (
    <div className="filters">
      <h2 className="filters-title">Filters</h2>

      <div className="filter-section">
        <label htmlFor="search" className="filter-label">
          Search Products
        </label>
        <input
          id="search"
          type="text"
          className="filter-input"
          placeholder="Search by name..."
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
        />
      </div>

      <div className="filter-section">
        <label htmlFor="category" className="filter-label">
          Category
        </label>
        <select
          id="category"
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="sort" className="filter-label">
          Sort by Price
        </label>
        <select
          id="sort"
          className="filter-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Default</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters-btn" onClick={onClearFilters}>
          Clear All Filters
        </button>
      )}
    </div>
  )
}

export default Filters

