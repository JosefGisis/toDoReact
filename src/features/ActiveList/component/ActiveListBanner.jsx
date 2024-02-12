import { useListContext } from '../../../hooks/useListContext'

function ActiveListBanner() {
	const { activeList } = useListContext()

	return (
		<div>
			<h3 className="w-fit rounded-lg bg-info text-4xl font-bold p-3">{activeList ? activeList.title : 'To-dos'}</h3>
			{activeList?.creation_date && (
				<p>
					Created: <i>{new Date(activeList.creation_date).toDateString()}</i>
				</p>
			)}
		</div>
	)
}

export default ActiveListBanner
