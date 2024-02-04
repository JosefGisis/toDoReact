import { useContext } from "react"
import ListContext from "../state-management/List/ListContext"

export const useListContext = () => {
	return useContext(ListContext) 
}
