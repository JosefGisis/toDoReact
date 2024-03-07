import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDeleteToDoMutation, useUpdateToDoMutation } from '../../api/apiSlice'

import { GoKebabHorizontal, GoTrash, GoCalendar } from 'react-icons/go'

function ToDo({ toDoData }) {
	const [isEditing, setIsEditing] = useState({ title: false, dueDate: false })

	const [deleteToDo] = useDeleteToDoMutation()
	const [updateToDo] = useUpdateToDoMutation()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	// onDelete takes toDo object instead of id to determine if toDo has membership
	const onDelete = useCallback(async (toDo) => {
		try {
			await deleteToDo(toDo.id).unwrap()
		} catch (error) {
			console.log(error)
		}
	}, [])

	const handleUpdate = useCallback(async (toDoId, update) => {
		setIsEditing({ ...isEditing, title: false, dueDate: false })
		reset()
		try {
			await updateToDo({ toDoId, update })
		} catch (error) {
			console.log(error)
		}
	}, [])

	return (
		<div
			className={
				'flex items-center justify-between rounded-lg transition-all p-3 mb-3 hover:bg-base-300 ' +
				(toDoData?.completed ? 'bg-base-200' : 'bg-neutral')
			}
		>
			<div className="flex items-center">
				{/* to-do check to complete and un-complete */}
				<input
					type="checkbox"
					checked={toDoData?.completed}
					onChange={() => handleUpdate(toDoData.id, { completed: !toDoData.completed })}
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
									handleUpdate(toDoData.id, { title: values ? values.title : toDoData.title })
								})
							}}
							onSubmit={handleSubmit((values) => handleUpdate(toDoData.id, { title: values.title }))}
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
						onBlur={handleSubmit((values) => handleUpdate(toDoData.id, { dueDate: values.date }))}
						onSubmit={handleSubmit((values) => handleUpdate(toDoData.id, { dueDate: values.date }))}
					>
						<input
							{...register('date', {
								pattern: {
									value: /^\d{4}-\d{2}-\d{2}$/,
									message: 'date format mm/dd/yyyy required',
								},
							})}
							type="date"
							defaultValue={toDoData.dueDate}
							className={'input input-outline mr-6 ' + (errors?.dueDate ? 'input-error' : 'input-secondary')}
						/>
					</form>
				) : toDoData?.dueDate ? (
					<div onDoubleClick={() => setIsEditing({ ...isEditing, dueDate: true })} className="flex items-center mr-6">
						<DueDate dueDate={toDoData.dueDate} completed={toDoData.completed} />
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
						<li onClick={() => handleUpdate(toDoData.id, { dueDate: null })}>
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

function DueDate({ dueDate, completed }) {
	// need to remove UTC and get local date
	const localDate = dueDate?.split('Z')[0]

	const currentDate = new Date().setHours(0, 0, 0, 0)
	const dueDateComparison = new Date(localDate).setHours(0, 0, 0, 0)

	const due = dueDateComparison === currentDate
	const overDue = dueDateComparison < currentDate

	const formattedDate = new Date(localDate).toDateString()

	const textColor = completed ? 'text-success' : due ? 'text-warning' : overDue ? 'text-error' : 'text-success'

	return (
		<>
			<GoCalendar className="mr-2" />
			<p className={textColor}>{formattedDate}</p>
		</>
	)
}

export default ToDo
