import { List } from '../../api/listsSlice'
import ListsList from './ListsList'

export default function Lists({ orderedLists }: { orderedLists: List[] }) {
	return <ListsList orderedLists={orderedLists} />
}
