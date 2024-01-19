import { useContext } from "react"
import ActiveListContext from '../../state-management/ActiveList/ActiveListContext'

function ActiveList() {
	const { activeList } = useContext(ActiveListContext)

	return (
		<div>
			<h3 className="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">{activeList?.title}</h3>
			<p className="">
				<i>Created: {activeList?.creationDate}</i>
			</p>
		</div>
	)
}

export default ActiveList
