import { useListContext } from '../../../hooks/useListContext'
import { GoHome } from 'react-icons/go'

export default function DefaultListButton() {
	const { activeList, removeActiveList } = useListContext()

	return (
		<div
			className={
				'flex flex-row items-center justify-between rounded-lg px-2 ' +
				(!activeList ? 'bg-neutral text-neutral-content py-4' : 'bg-base-300 text-base-content border-2 border-neutral py-3')
			}
			onClick={() => {
				removeActiveList()
			}}
		>
			<div className="flex items-center">
				<div className="mr-2">
					<GoHome />
				</div>

				<div>
					<p>To-dos</p>
				</div>
			</div>
		</div>
	)
}
