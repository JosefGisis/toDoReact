import { useState } from 'react'

import List from './List'
import NoListMessage from './NoListsMessage'

import type { ListsProps } from '.'
import { List as ListType } from '../../api/listsSlice'
import { Dispatch, SetStateAction } from 'react'

export interface ListPropsWithEditingId {
	listData: ListType
	editingId: null | number
	setEditingId: Dispatch<SetStateAction<null | number>>
}

export default function ToDoListsList({ orderedLists, listsStatus }: ListsProps) {
	const [editingId, setEditingId] = useState<null | number>(null)

	// lists status determines if lists should display
	let content
	if (listsStatus === 'loading') {
		// listsList does not display a loading spinner because that is handled by the toDosList
		content = null
	} else if (listsStatus === 'hasLists') {
		content = orderedLists.map((list, index) => (
			<div key={index}>
				<List listData={list} editingId={editingId} setEditingId={setEditingId}/>
			</div>
		))
	} else {
		content = <NoListMessage />
	}

	return <>{content}</>
}
