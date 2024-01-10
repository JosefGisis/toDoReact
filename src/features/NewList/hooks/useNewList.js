import { useEffect, useState } from "react"

export default function useNewList(listData) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const createNewList = async (alteredList) => {
            try {
                setIsLoading(true)
                await setTimeout(() => setData(alteredList), 6000)
                setIsLoading(false)
                setError(null)
            } catch (err) {
                console.log(err)
                setIsLoading(false)
            }
        }
        createNewList({ ...listData, users_id: 1})
    })
    return { isLoading, error, data }
}
