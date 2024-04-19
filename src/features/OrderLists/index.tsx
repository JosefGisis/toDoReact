import ListOrderControls from './ListOrderControls'

import type { List as ListType } from '../../api/listsSlice'
import type { Dispatch, SetStateAction } from 'react'

export interface OrderListsProps {
	setOrderedLists: Dispatch<SetStateAction<ListType[]>>
	setListsStatus: Dispatch<SetStateAction<'loading' | 'hasLists' | 'noLists'>>
}

function OrderLists({ setOrderedLists, setListsStatus }: OrderListsProps) {
	return <ListOrderControls setOrderedLists={setOrderedLists} setListsStatus={setListsStatus} />
}

export default OrderLists
