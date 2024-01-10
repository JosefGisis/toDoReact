import { useState } from 'react'
import DeleteListButton from './DeleteListButton'

export default function ToDoListsList({ data }) {
	const [selectedList, setSelectedList] = useState()

	const handleClick = (list) => {
		setSelectedList(list)
	}

	return (
		<div>
			{data &&
				data?.map((list, i) => (
					<div
						key={i}
						className={
							'flex flex-row justify-between px-4 my-3 rounded-lg ' +
							(selectedList?.name === list?.name ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')
						}
						onClick={() => handleClick(list)}
					>
						<div>{list.name}</div>
						<div>{list.toDoCount}</div>
						<div>{list.updatedAt}</div>
						<DeleteListButton />
					</div>
				))}
		</div>
	)
}
