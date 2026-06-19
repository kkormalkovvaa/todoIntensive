import { Route, Navigate, Outlet } from 'react-router';
import localStorageHelpers from "../../helpers/localStorageHelpers"

const PrivateRoute = ({ ...props }) => {
  const isAuth = localStorageHelpers.get
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute