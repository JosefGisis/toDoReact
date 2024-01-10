import { useState, useEffect } from "react"

const usePractice = (data) => {
    const [entry, setEntry] = useState({})
    const [error, setError] = useState({})
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: data.listTitle || 'no title',
                body: data.listDescription || 'no description',
                userId: 1
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }})
            .then((response) => {
                if (!response.ok)
                    throw new Error(`ERROR ${response.status} fetching ${response.url}`)
                setError({})
                return response.json()
            })
            .then((data) => setEntry(data))
            .catch((err) => {
                setEntry({})
                setError(err)
            })  
    }, [])
    return { entry, error }
}

export default usePractice