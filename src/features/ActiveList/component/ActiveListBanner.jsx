import { useListContext } from '../../../hooks/useListContext'

function ActiveListBanner() {
	const { activeList } = useListContext()

	return (
		<div>
			<h3 className="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">{activeList ? activeList.title : 'To-dos'}</h3>
			{activeList?.creationDate && (
				<p>
					Created: <i>{new Date(activeList.creationDate).toDateString()}</i>
				</p>
			)}
		</div>
	)
}

export default ActiveListBanner
