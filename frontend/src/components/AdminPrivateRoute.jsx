
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


const AdminPrivateRoute = () => {

    const {currentUser} = useSelector((state) => state.user)


  return (
    currentUser && currentUser.isAdmin ? ( <Outlet /> ) : ( <Navigate to='/login' />)
  ) // so that error doesn't occur after logout
}

export default AdminPrivateRoute