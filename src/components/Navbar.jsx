import { Link } from 'react-router-dom'
import { FaShoppingBag } from 'react-icons/fa'

function Navbar(props) {
  return (
    <div className="navbar">
      <Link to="/cart" className="cart-icon-link">
        <FaShoppingBag size={22} />
        <span className="cart-badge">{props.cartCount}</span>
      </Link>

      <input
        type="text"
        placeholder="Search products..."
        value={props.searchText}
        onChange={(e) => props.onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default Navbar