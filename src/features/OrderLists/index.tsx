import ListOrderControls from './ListOrderControls'

import type { List as ListType } from '../../api/listsSlice'
import type { Dispatch, SetStateAction } from 'react'

function OrderLists({ setOrderedLists, setListsStatus }: { setOrderedLists: Dispatch<SetStateAction<ListType[]>>, setListsStatus: Dispatch<SetStateAction<'loading' | 'hasLists' | 'noLists'>>}) {
	return <ListOrderControls setOrderedLists={setOrderedLists} setListsStatus={setListsStatus} />
}

export default OrderLists
