import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"
import { LOGIN_ROUTE } from "../data/constants"
import { useLogoutMutation } from "../features/authentication"
import { authSlice } from "../features/authentication/AuthSlice"
import { useAppDispatch } from "../hooks/redux"

const User = () => {
  const dispatch = useAppDispatch();
  const [logout, {error, data, isLoading, isSuccess}] = useLogoutMutation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout({});
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(authSlice.actions.logout())
      navigate(LOGIN_ROUTE)
    }
  }, [isSuccess])

  return (
    <div>
      <Button onClick={handleLogout} variant="danger">Выйти</Button>
    </div>
  )
}

export default User