import ListsList from './ListsList'

import type { List as ListType } from '../../api/listsSlice'

export default function Lists({ orderedLists }: { orderedLists: ListType[] }) {
	return <ListsList orderedLists={orderedLists} />
}
