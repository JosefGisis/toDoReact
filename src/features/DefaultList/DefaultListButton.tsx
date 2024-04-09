import { useSelector, useDispatch } from 'react-redux'
import { removeActiveList, selectActiveList } from '../../app/activeListSlice'

import { GoHome } from 'react-icons/go'
import { List } from '../../api/listsSlice'

export default function DefaultListButton() {
	const activeList: List | null = useSelector(selectActiveList)
	const dispatch = useDispatch()

	return (
		<div
			className={
				'flex flex-row items-center justify-between rounded-lg px-2 ' +
				(!activeList ? 'bg-neutral text-neutral-content py-4' : 'bg-base-300 text-base-content border-2 border-neutral py-3')
			}
			onClick={() => dispatch(removeActiveList())}
		>
			<div className="flex items-center">
				<GoHome className="mr-2" />
				<p>To-dos</p>
			</div>
		</div>
	)
}
