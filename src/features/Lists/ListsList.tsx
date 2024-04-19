import type { List as ListType } from '../../api/listsSlice'

import List from './List'
import ListSkeleton from './ListSkeleton'
import NoListMessage from './NoListsMessage'

export default function ToDoListsList({ orderedLists, listsStatus }: { orderedLists: ListType[], listsStatus: 'loading' | 'hasLists' | 'noLists'}) {
	// conditional content rendering determines if lists are loading and if user has any lists
	let content
	if (listsStatus === 'loading') {
		content = (
			<>
				<ListSkeleton />
				<ListSkeleton />
				<ListSkeleton />
				<ListSkeleton />
			</>
		)
	} else if (listsStatus === 'hasLists') {
		content = orderedLists.map((list, index) => (
			<div key={index}>
				<List listData={list} />
			</div>
		))
	} else {
		content = <NoListMessage />
	}

	return <>{content}</>
}
