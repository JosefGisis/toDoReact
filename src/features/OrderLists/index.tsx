import ListOrderControls from './ListOrderControls'

import type { List as ListType } from '../../api/listsSlice'
import type { Dispatch, SetStateAction } from 'react'

function OrderLists({ setOrderedLists }: { setOrderedLists: Dispatch<SetStateAction<ListType[]>> }) {
	return <ListOrderControls setOrderedLists={setOrderedLists} />
}

export default OrderLists
