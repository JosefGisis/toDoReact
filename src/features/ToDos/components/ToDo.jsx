import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useDeleteToDo } from '../hooks/useDeleteToDo'
import { useListContext } from '../../../hooks/useListContext'
import { useUpdateToDo } from '../hooks/useUpdateToDo'

import { actions } from '../../../state-management/List/listReducer'

import { GoKebabHorizontal, GoTrash, GoCalendar } from 'react-icons/go'

function ToDo({ toDoData }) {
	const [_errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	// isEditing is a an object to control the different forms in the to-do
	const [isEditing, setIsEditing] = useState({ title: false, dueDate: false })

	const { dispatch } = useListContext()
	const { deleteToDo } = useDeleteToDo()
	const { updateToDo } = useUpdateToDo()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	// onDelete takes toDo object instead of id to determine if toDo has membership
	const onDelete = useCallback(async (toDo) => {
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
	}, [])

	const handleUpdate = useCallback(async (toDoId, update) => {
		setIsLoading(true)
		try {
			const [error, editedToDo] = await updateToDo(toDoId, update)
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
	}, [])

	return (
		<div className={'rounded-lg transition-all p-3 mb-3 hover:bg-base-300 ' + (toDoData?.completed ? 'bg-default' : 'bg-neutral')}>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					{/* to-do check to complete and un-complete */}
					<input
						type="checkbox"
						checked={toDoData?.completed}
						onChange={() => handleUpdate(toDoData.id, { ...toDoData, completed: toDoData.completed === 1 ? 0 : 1 })}
						className="checkbox checkbox-primary mr-3"
					/>

					<div className="">
						{isEditing?.title ? (
							<form
								onChange={(e) => handleUpdate({ title: e.target.value })}
								onSubmit={() => setIsEditing({ isEditing, title: false })}
								onBlur={() => setIsEditing({ isEditing, title: false })}
							>
								<input type="text" value={toDoData?.title} className="input input-outline input-secondary" />
							</form>
						) : (
							<h3
								onDoubleClick={() => setIsEditing({ ...isEditing, title: true })}
								className={'rounded-lg text-2xl font-bold my-2 ' + (toDoData?.completed ? 'line-through text-rose-400' : '')}
							>
								{toDoData?.title}
							</h3>
						)}
					</div>
				</div>
				<div className="flex items-center">
					{isEditing?.dueDate ? (
						<form
							defaultValue={toDoData?.due_date}
							onChange={(e) => handleUpdate({ dueDate: e.target.value })}
							onBlur={() => setIsEditing({ ...isEditing, dueDate: false, title: false })}
							onSubmit={() => setIsEditing({ ...isEditing, dueDate: false })}
						>
							<input
								type="date"
								defaultValue={toDoData?.due_date}
								className="input input-outline input-secondary mr-6"
								placeholder={toDoData?.due_date}
							/>
						</form>
					) : toDoData?.due_date ? (
						<div onDoubleClick={() => setIsEditing({ ...isEditing, dueDate: true })} className="flex items-center mr-6">
							<GoCalendar className="mr-2" />
							<p className=" text-green-500">
								{toDoData.due_date ? new Date(toDoData.due_date.split('T')[0]).toDateString() : 'no due-date'}
							</p>
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
								<p>{toDoData.completed ? 'un-complete' : 'complete'}</p>
							</li>
							<li onClick={() => setIsEditing({ ...isEditing, dueDate: true })}>
								<p>add due-date</p>
							</li>
							<li onClick={() => handleUpdate({ removeDueDate: true })}>
								<p>remove due-date</p>
							</li>
						</ul>
					</div>
					<button className="btn btn-outline btn-primary" onClick={() => onDelete(toDoData)}>
						<GoTrash className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ToDo
