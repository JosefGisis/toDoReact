import { useContext, useEffect } from 'react'
import ActiveListContext from '../../../state-management/ActiveList/ActiveListContext'

function useActiveList() {
	const { activeList, dispatch } = useContext(ActiveListContext)

	useEffect(() => {
	}, [])
}

export default useActiveList