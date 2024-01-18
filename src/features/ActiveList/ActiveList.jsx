import { useEffect, useReducer } from "react"
import listIdReducer from "../../state-management/reducers/listIdReducer"

function ActiveList() {
	const [activeList, dispatch] = useReducer(listIdReducer)

	return (
		<div>
			<h3 className="w-fit rounded-lg | bg-sky-500 | text-4xl font-bold | p-3  mb-5">Have You?</h3>
			<p className="">
				<i>Created: 01/01/2024</i>
			</p>
		</div>
	)
}

export default ActiveList
