import { useGetListsQuery } from '../../api/apiSlice'

import List from './List'
import NoListMessage from './NoListsMessage'

export default function ToDoListsList({ orderedLists }) {
	const { isFetching, isSuccess } = useGetListsQuery()

	let content
	if (orderedLists?.length) {
		content = orderedLists.map((list, index) => (
			<div key={index}>
				<List listData={list} />
			</div>
		))
	} else if (!isFetching && isSuccess) {
		content = <NoListMessage />
	} else content = null

	return <>{content}</>
}
