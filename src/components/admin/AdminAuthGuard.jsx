import { Navigate } from 'react-router-dom'

export default function AdminAuthGuard({ children }) {
  const isAdmin = true
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}
