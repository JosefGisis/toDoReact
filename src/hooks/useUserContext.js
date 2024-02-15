import { useContext } from "react"
import UserContext from '../state-management/Token/UserContext'

export const useAuthContext = () => {
    return useContext(UserContext)
}