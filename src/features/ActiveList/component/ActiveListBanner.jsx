import useActiveListInfo from '../hooks/useActiveListInfo'

function ActiveListBanner() {
	const { creationDate, title } = useActiveListInfo()

	return (
		<div>
			<h3 className="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">{title}</h3>
			<p>
				Created: <i>{new Date(creationDate).toDateString()}</i>
			</p>
		</div>
	)
}

export default ActiveListBanner
