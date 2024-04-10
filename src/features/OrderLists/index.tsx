import ListOrderControls from './ListOrderControls'
import type { List as ListType } from '../../api/listsSlice'

function OrderLists({ setOrderedLists }: { setOrderedLists: React.Dispatch<React.SetStateAction<ListType[] | []>> }) {
	return <ListOrderControls setOrderedLists={setOrderedLists} />
}
export default OrderLists
