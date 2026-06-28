import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart()

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="empty-cart">
  <div className="empty-cart-icon">💔</div>
  <h2>No favorites yet</h2>
  <p>Tap the heart on any product to save it here for later.</p>
  <Link to="/" className="continue-shopping">Browse Products</Link>
</div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              onAddToCart={() => addToCart(product)}
              onToggleWishlist={() => toggleWishlist(product)}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist