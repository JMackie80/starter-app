import { Navigate, Outlet } from 'react-router'

const AuthenticatedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
};

export default AuthenticatedRoute