// Fetch products from dummyjson.com API
export async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=20')
    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

