import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'

function Home() {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState("")
  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newImage, setNewImage] = useState("")
  const { cartItems, addToCart, wishlist, toggleWishlist } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  fetch("https://ecommerce-backend-production-a8b5.up.railway.app/api/products")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data)
      setLoading(false)
    })
}, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  )

  function handleAddToCart(product) {
    addToCart(product)
  }

  function handleAddProduct() {
  if (newName.trim() === "" || newPrice.trim() === "") {
    alert("Please fill in product name and price")
    return
  }

  fetch("https://ecommerce-backend-production-a8b5.up.railway.app/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, price: newPrice, image: newImage })
  })
    .then((response) => response.json())
    .then((createdProduct) => {
      setProducts([...products, createdProduct])
      setNewName("")
      setNewPrice("")
      setNewImage("")
    })
}
  function handleDeleteProduct(id) {
    fetch(`https://ecommerce-backend-production-a8b5.up.railway.app/api/products/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setProducts(products.filter((product) => product._id !== id))
      })
  }

  return (
    <div>
      <Navbar
        cartCount={cartItems.length}
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <div className="add-product-form">
        <input
          type="text"
          placeholder="Product name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="products-grid">
  {loading ? (
    Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-img"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    ))
  ) : (
    filteredProducts.map((product) => (
      <ProductCard
        key={product._id}
        name={product.name}
        price={product.price}
        image={product.image}
        rating={product.rating}
        onAddToCart={() => handleAddToCart(product)}
        onToggleWishlist={() => toggleWishlist(product)}
        isWishlisted={wishlist.some((item) => item._id === product._id)}
      />
    ))
  )}
</div>
    </div>
  )
}

export default Home