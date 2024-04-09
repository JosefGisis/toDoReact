import { useGetListsQuery } from '../../api/listsSlice'

import type { List as ListType } from '../../api/listsSlice'

import List from './List'
import NoListMessage from './NoListsMessage'

export default function ToDoListsList({ orderedLists }: { orderedLists: ListType[]}) {
	// Not sure how to remove ts error yet. Why does it require args?
	const { isFetching, isSuccess } = useGetListsQuery()

	let content
	if (orderedLists?.length) {
		content = orderedLists.map((list, index) => (
			<div key={index}>
				<List listData={list} />
			</div>
		))
	} else if (!isFetching && isSuccess ) {
		content = <NoListMessage />
	} else content = null

	return <>{content}</>
}
