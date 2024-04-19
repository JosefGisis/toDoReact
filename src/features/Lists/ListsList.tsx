import List from './List'
import NoListMessage from './NoListsMessage'

import type { ListsProps } from '.'

export default function ToDoListsList({ orderedLists, listsStatus }: ListsProps) {
	// lists status determines if lists should display
	let content
	if (listsStatus === 'loading') {
		// listsList does not display a loading spinner because that is handled by the toDosList
		content = null
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
