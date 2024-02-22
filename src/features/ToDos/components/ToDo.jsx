import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useDeleteToDo } from '../hooks/useDeleteToDo'
import { useListContext } from '../../../hooks/useListContext'
import { useUpdateToDo } from '../hooks/useUpdateToDo'

import { actions } from '../../../state-management/List/listReducer'

import { GoKebabHorizontal, GoTrash, GoCalendar } from 'react-icons/go'
import DueDate from './DueDate'

function ToDo({ toDoData }) {
	const [_errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isEditing, setIsEditing] = useState({ title: false, dueDate: false })

	const { dispatch } = useListContext()
	const { deleteToDo } = useDeleteToDo()
	const { updateToDo } = useUpdateToDo()

	useEffect(() => {
		console.log('to-do data has changed')
		console.log(toDoData)

	}, [toDoData])

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
		setIsEditing({ ...isEditing, title: false, dueDate: false })
		reset()
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
		<div
			className={
				'flex items-center justify-between rounded-lg transition-all p-3 mb-3 hover:bg-base-300 ' +
				(toDoData?.completed ? 'bg-default' : 'bg-neutral')
			}
		>
			<div className="flex items-center">
				{/* to-do check to complete and un-complete */}
				<input
					type="checkbox"
					checked={toDoData?.completed}
					onChange={() => handleUpdate(toDoData.id, { ...toDoData, completed: toDoData.completed === 1 ? 0 : 1 })}
					className="checkbox checkbox-primary mr-3"
				/>

				{/* to-do title and title editing form */}
				<div>
					{isEditing?.title ? (
						<form
							onBlur={() => {
								setIsEditing({ ...isEditing, title: false, dueDate: false })
								reset()
								handleSubmit((values) => {
									handleUpdate(toDoData.id, { ...toDoData, title: values ? values.title : toDoData.title })
								})
							}}
							onSubmit={handleSubmit((values) => handleUpdate(toDoData.id, { ...toDoData, title: values.title }))}
						>
							<input
								{...register('title', {
									required: 'title required*',
									maxLength: {
										value: 100,
										message: 'maximum one-hundred characters',
									},
								})}
								type="text"
								defaultValue={toDoData?.title}
								className={'input input-outline ' + (errors?.title ? 'input-error' : 'input-secondary')}
								placeholder={errors?.title && errors?.title?.message}
							/>
						</form>
					) : (
						<h3
							onDoubleClick={() => setIsEditing({ ...isEditing, title: true })}
							className={'rounded-lg text-2xl font-bold my-2 ' + (toDoData.completed ? 'line-through text-rose-400' : '')}
						>
							{toDoData.title}
						</h3>
					)}
				</div>
			</div>

			{/* to-do due-date and editing form */}
			<div className="flex items-center">
				{isEditing?.dueDate ? (
					<form
						defaultValue={toDoData?.due_date}
						onBlur={handleSubmit((values) => handleUpdate(toDoData.id, { due_date: values.dueDate }))}
						onSubmit={handleSubmit((values) => handleUpdate(toDoData.id, { due_date: values.dueDate }))}
					>
						<input
							{...register('dueDate', {
								pattern: {
									value: /^\d{4}-\d{2}-\d{2}$/,
									message: 'date format mm/dd/yyyy required',
								},
							})}
							type="date"
							defaultValue={toDoData.due_date}
							className={'input input-outline mr-6' + (errors?.dueDate ? 'input-error' : 'input-secondary')}
						/>
					</form>
				) : toDoData?.due_date ? (
					<div onDoubleClick={() => setIsEditing({ ...isEditing, dueDate: true })} className="flex items-center mr-6">
						<DueDate dueDate={toDoData.due_date} />
					</div>
				) : null}

				{/* dropdown button for to-do */}
				<div className="dropdown dropdown-bottom dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-primary btn-outline btn-round mr-2">
						<GoKebabHorizontal className="w-4 h-4" />
					</div>
					<ul tabIndex={0} className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-primary rounded-box w-52">
						<li onClick={() => setIsEditing({ ...isEditing, title: true, dueDate: true })}>
							<p>edit</p>
						</li>
						<li onClick={() => setIsEditing({ ...isEditing, dueDate: true })}>
							<p>add due-date</p>
						</li>
						<li onClick={() => handleUpdate({ removeDueDate: true })}>
							<p>remove due-date</p>
						</li>
					</ul>
				</div>

				{/* delete to-do button */}
				<button className="btn btn-outline btn-primary" onClick={() => onDelete(toDoData)}>
					<GoTrash className="w-5 h-5" />
				</button>
			</div>
		</div>
	)
}

export default ToDo
