import ListsList from './ListsList'

import type { List as ListType } from '../../api/listsSlice'

export interface ListsProps {
	orderedLists: ListType[]
	listsStatus: 'loading' | 'hasLists' | 'noLists'
}

export default function Lists({ orderedLists, listsStatus }: ListsProps) {
	return <ListsList orderedLists={orderedLists} listsStatus={listsStatus} />
}
