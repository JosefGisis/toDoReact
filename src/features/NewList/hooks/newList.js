import { useState } from "react"
import listServices from "../../../services/listServices"

const useNewList = async (data) => {
    const [newEntry, setNewEntry] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const createNewList = async (newList) => {
        try {
            setIsLoading(true)
            const response = await listServices.fetchLists(newList)
            if (!response.ok) return new Error(`ERROR ${response.status} fetching ${response.url}`)
            const confirmation = await response.json()
            setNewEntry(confirmation)            
            setIsLoading(false)
            setError(null)
        } catch (err) {
            console.error(err)
            setError(err)
            setIsLoading(false)
        }
    }
    await createNewList({ ...data, users_id: 1})
    return { isLoading, error, newEntry }
}

export default useNewList
