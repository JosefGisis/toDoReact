import ListsList from './ListsList'

import type { List as ListType } from '../../api/listsSlice'

export default function Lists({ orderedLists, listsStatus }: { orderedLists: ListType[], listsStatus: 'loading' | 'hasLists' | 'noLists'}) {
	return <ListsList orderedLists={orderedLists} listsStatus={listsStatus} />
}
