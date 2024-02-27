import { useListContext } from '../../../hooks/useListContext'
import { GoHome } from 'react-icons/go'

export default function DefaultListButton() {
	const { activeList, removeActiveList } = useListContext()

	return (
		<div
			className={
				'flex flex-row items-center justify-between rounded-lg px-2 ' +
				(activeList ? 'bg-neutral py-3' : 'bg-base-300 border-2 border-neutral py-4')
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
