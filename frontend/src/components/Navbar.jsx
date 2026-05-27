import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ taskCount }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      {/* Left — Brand */}
      <div className="navbar-brand">✅ TaskFlow</div>

      {/* Right — User info + logout */}
      <div className="navbar-right">
        <div className="navbar-user">
          Welcome, <span>{user?.name}</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar