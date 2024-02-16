import { useContext } from 'react'
import UserContext from '../state-management/User/UserContext'

export const useUserContext = () => {
	return useContext(UserContext)
}
