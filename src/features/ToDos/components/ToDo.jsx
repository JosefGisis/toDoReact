import { useState } from 'react'

import { useDeleteToDo } from '../hooks/useDeleteToDo'
import { useListContext } from '../../../hooks/useListContext'
import { useUpdateToDo } from '../hooks/useUpdateToDo'

import { actions } from '../../../state-management/List/listReducer'

import { GoKebabHorizontal, GoTrash, GoCalendar } from 'react-icons/go'

function ToDo({ data }) {
	const [errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	if (errors && isLoading) console.log('')
	const [isEditing, setIsEditing] = useState({ title: false, dueDate: false })

	const { dispatch } = useListContext()
	const { deleteToDo } = useDeleteToDo()
	const { updateToDo } = useUpdateToDo()

	async function onDelete(toDo) {
		try {
			const [error] = await deleteToDo(toDo)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.REMOVE_TODO, payload: toDo })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	async function handleUpdate(values) {
		setIsLoading(true)
		try {
			const [error, editedToDo] = await updateToDo(data, values)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.UPDATE_TODO, payload: editedToDo })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={'rounded-lg transition-all p-3 mb-3 hover:bg-base-300 ' + (data?.completed ? 'bg-default' : 'bg-neutral')}>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input
						type="checkbox"
						checked={data?.completed}
						onClick={() => handleUpdate({ toggle: true })}
						className="checkbox checkbox-primary mr-3"
					/>

					<div className="">
						{isEditing?.title ? (
							<form
								onChange={(e) => handleUpdate({ title: e.target.value })}
								onSubmit={() => setIsEditing({ isEditing, title: false })}
								onBlur={() => setIsEditing({ isEditing, title: false })}
							>
								<input type="text" value={data?.title} className="input input-outline input-secondary" />
							</form>
						) : (
							<h3
								onDoubleClick={() => setIsEditing({ ...isEditing, title: true })}
								className={'rounded-lg text-2xl font-bold my-2 ' + (data?.completed ? 'line-through text-rose-400' : '')}
							>
								{data?.title}
							</h3>
						)}
					</div>
				</div>
				<div className="flex items-center">
					{isEditing?.dueDate ? (
						<form
							defaultValue={data?.due_date}
							onChange={(e) => handleUpdate({ dueDate: e.target.value })}
							onBlur={() => setIsEditing({ ...isEditing, dueDate: false, title: false })}
							onSubmit={() => setIsEditing({ ...isEditing, dueDate: false })}
						>
							<input
								type="date"
								defaultValue={data?.due_date}
								className="input input-outline input-secondary mr-6"
								placeholder={data?.due_date}
							/>
						</form>
					) : data?.due_date ? (
						<div onDoubleClick={() => setIsEditing({ ...isEditing, dueDate: true })} className="flex items-center mr-6">
							<GoCalendar className="mr-2" />
							<p className=" text-green-500">{data.due_date ? new Date(data.due_date.split('T')[0]).toDateString() : 'no due-date'}</p>
						</div>
					) : null}
					<div className="dropdown dropdown-bottom dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-primary btn-outline btn-round mr-2">
							<GoKebabHorizontal className="w-4 h-4" />
						</div>
						<ul tabIndex={0} className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-primary rounded-box w-52">
							<li onClick={() => setIsEditing({ ...isEditing, title: true, dueDate: true })}>
								<p>edit</p>
							</li>
							<li onClick={() => handleUpdate({ toggle: true })}>
								<p>{data.completed ? 'un-complete' : 'complete'}</p>
							</li>
							<li onClick={() => setIsEditing({ ...isEditing, dueDate: true })}>
								<p>add due-date</p>
							</li>
							<li onClick={() => handleUpdate({ removeDueDate: true })}>
								<p>remove due-date</p>
							</li>
						</ul>
					</div>
					<button className="btn btn-outline btn-primary" onClick={() => onDelete(data)}>
						<GoTrash className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ToDo