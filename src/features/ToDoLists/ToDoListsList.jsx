import { useState } from 'react'

export default function ToDoListsList({ data }) {
	const [selectedList, setSelectedList] = useState()

	const handleClick = (list) => {
		setSelectedList(list)
	}

	return (
		<>
			<div>ToDoListsList</div>
			{selectedList && <div>Selected List: {selectedList?.name}</div>}
			<div className="card bg-white">
				<div className="list text-neutral-500">
					{data &&
						data?.map((list, i) => (
							<div key={i} className="to-do-list" onClick={() => handleClick(list)}>
								List: {list.name}
							</div>
						))}
				</div>
			</div>
		</>
	)
}
