function ProductCard(props) {
  function renderStars(rating) {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>★</span>
      )
    }
    return stars
  }

  return (
    <div className="card">
      <button className="wishlist-btn" onClick={props.onToggleWishlist}>
        <span className={props.isWishlisted ? "heart filled" : "heart"}>♥</span>
      </button>
      {props.image && (
        <img src={props.image} alt={props.name} className="product-img" />
      )}
      <h3>{props.name}</h3>
      <div className="rating">{renderStars(props.rating)}</div>
      <p>${props.price}</p>
      <button onClick={props.onAddToCart}>Add to Cart</button>
    </div>
  )
}

export default ProductCard