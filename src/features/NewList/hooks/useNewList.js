import { useCallback, useContext, useState } from 'react'
import AuthContext from '../../../state-management/Token/AuthContext'

const useNewList = async (data) => {
	const [loading, setLoading] = useState(false)
	const [errs, setErrs] = useState(null)
    const [newList, setNewList] = useState({})
	const { token } = useContext(AuthContext)

	const createList = useCallback(() => {
        setLoading(true)
		fetch('https://localhost:3000/api/1/lists', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: data.listTitle
			}),
		})
			.then((response) => {
				if (!response.ok) throw new Error(`ERROR ${response.status} fetching ${response.url}`)
				return response.json()
			})
			.then((data) => {
                setNewList(data.data)
                setLoading(false)
            })
			.catch((err) => {
				setErrs(err)
			})
	}, [])
	return { newList, loading, errs, createList }
}

export default useNewList
