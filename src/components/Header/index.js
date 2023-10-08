import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="header-logo"
        />
      </Link>
      <ul className="nav-options-list">
        <li>
          <Link to="/">
            <AiFillHome fill="white" size="20" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsFillBriefcaseFill fill="white" size="20" />
          </Link>
        </li>
        <div>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            <FiLogOut size="20" />
          </button>
        </div>
      </ul>
      <ul className="nav-items-lg">
        <li>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <div className="logout-btn-lg-container">
        <button type="button" onClick={onClickLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
