import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart()

  return (
    <div className="products-grid" style={{ padding: "30px 40px" }}>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        wishlist.map((product) => (
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
        ))
      )}
    </div>
  )
}

export default Wishlist