import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDeleteToDoMutation, useUpdateToDoMutation } from '../../api/toDosSlice'
import { useAuth } from '../../hooks/useAuth'

import ToDoDueDate from './ToDoDueDate'
import { GoTrash, GoCheck, GoX, GoPencil } from 'react-icons/go'

import type { ToDo as ToDoType, UpdateToDo } from '../../api/toDosSlice'
import type { ToDoPropsWithEditingId } from './ToDoList'

function ToDo({ toDoData, editingId, setEditingId }: ToDoPropsWithEditingId) {
	const { logout } = useAuth()
	const [deleteToDo] = useDeleteToDoMutation()
	const [updateToDo] = useUpdateToDoMutation()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()

	// onDelete takes toDo object instead of id to determine if toDo has membership
	const onDelete = useCallback(async (toDo: ToDoType) => {
		try {
			await deleteToDo(toDo.id).unwrap()
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	const handleUpdate = useCallback(async (toDo: ToDoType, update: UpdateToDo) => {
		console.log(update)
		setEditingId(null)
		reset()

		try {
			const toDoId = toDo.id
			await updateToDo({ toDoId, update })
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	return (
		<div
			className={
				'flex items-center justify-between rounded-lg transition-all p-3 mb-3 hover:bg-base-300 ' +
				(toDoData?.completed ? 'bg-base-200' : 'bg-neutral')
			}
		>
			{/**
			 * This segment contains the checkbox, to-do title, and when in editing mode, the to-do editing form
			 * and the accent and cancel changes buttons. The flex-1 class is used to make the to-do title expand when
			 * in editing mode and the dropdown menu and delete buttons are hidden.
			 */}
			<div className="flex items-center flex-1">
				{/* to-do check to complete and un-complete */}
				<input
					type="checkbox"
					checked={toDoData?.completed}
					// toggle completed status
					onChange={() => handleUpdate(toDoData, { completed: !toDoData.completed })}
					className="checkbox checkbox-primary mr-3"
				/>

				{/* to-do title and title editing form */}
				<div className="flex-1">
					{editingId === toDoData.id ? (
						<form
							className="flex justify-between"
							// can't use onBlur because it will trigger changing fields within the editing form
							// and would not allow users to cancel changes with triggering onBlur.
							// Is there a way to prevent onBlur when navigating elements within the form?
							onSubmit={handleSubmit((values) => handleUpdate(toDoData, values))}
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
								className={'input input-outline rounded-md mr-4 w-full ' + (errors?.title ? 'input-error' : 'input-secondary')}
								placeholder={String(errors?.title?.message || '')}
								autoFocus
							/>
							<input
								{...register('dueDate', {
									pattern: {
										value: /^\d{4}-\d{2}-\d{2}$/,
										message: 'date format mm/dd/yyyy required',
									},
								})}
								type="date"
								className={'input input-outline rounded-md mr-6 w-full ' + (errors?.dueDate ? 'input-error' : 'input-secondary')}
							/>

							<button className="btn btn-ghost btn-round mr-2">
								<GoCheck className="w-5 h-5" />
							</button>

							<button className="btn btn-ghost btn-round" onClick={() => setEditingId(null)} type="button">
								<GoX className="w-5 h-5" />
							</button>
						</form>
					) : (
						// When not in editing mode, display the to-do title and due-date (if available).
						<div className="flex items-center justify-between" onDoubleClick={() => setEditingId(toDoData.id)}>
							{/* to-do title*/}
							<h3 className={'rounded-lg text-2xl font-bold my-2 mr-4 ' + (toDoData.completed && 'line-through text-rose-400')}>
								{toDoData.title}
							</h3>

							{/* due-date component */}
							{toDoData?.dueDate && (
								<div className="flex items-center mr-6">
									<ToDoDueDate dueDate={toDoData.dueDate} completed={toDoData.completed} />

									<GoX
										className="ml-1.5 w-5 h-5 text-rose-200 hover:text-red-400"
										onClick={() => handleUpdate(toDoData, { dueDate: null })}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* dropdown menu and delete button */}
			{editingId !== toDoData.id ? (
				<div className="flex items-center">
					{/* dropdown button for to-do */}
					{/* Not currently being used */}
					{/* <div className="dropdown dropdown-bottom dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-round mr-2">
							<GoKebabHorizontal className="w-4 h-4" />
						</div>
						<ul
							tabIndex={0}
							className={
								'dropdown-content dropdown-left z-[1] menu p-2 shadow bg-base-300 border border-primary rounded-lg z-[10] absolute w-52 '
							}
						>
							<li onClick={() => setEditingId(toDoData.id)}>
								<p>edit</p>
							</li>

							<li onClick={() => handleUpdate(toDoData, { dueDate: null })}>
								<p>remove due-date</p>
							</li>
						</ul>
					</div> */}

					{/* edit button */}
					<div>
						<button className="btn btn-ghost mr-2" onClick={() => setEditingId(toDoData.id)}>
							<GoPencil className="w-5 h-5" />
						</button>
					</div>
					{/* delete to-do button */}
					<div>
						<button className="btn btn-ghost" onDoubleClick={() => onDelete(toDoData)}>
							<GoTrash className="w-5 h-5" />
						</button>
					</div>
				</div>
			) : null}
			{/* to-do due-date and editing form */}
		</div>
	)
}

export default ToDo
