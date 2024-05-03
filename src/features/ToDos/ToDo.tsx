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
		watch,
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

	// onBlur event handler for the form to update the to-do title and due-date when the user clicks outside the form.
	const handleFormBlur = useCallback(
		(toDo: ToDoType, e: React.FormEvent) => {
			const fieldValues = watch()
			// @ts-ignore
			if (e?.relatedTarget?.classList?.contains('on-form')) {
				e.preventDefault()
			} else handleUpdate(toDo, fieldValues)
		},
		[watch, handleUpdate]
	)

	// Attached to delete message modal to bring it up when delete button is clicked.
	// Putting this in a function to use @ts-ignore.
	const handleShowDeleteModal = useCallback(() => {
		// @ts-ignore
		document.getElementById('my_modal_1')?.showModal?.()
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
			<div className="flex items-center flex-1 on-form">
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
						<form className="flex justify-between" 
						onSubmit={handleSubmit((values) => handleUpdate(toDoData, values))}
						onBlur={(e) => handleFormBlur(toDoData, e)}>
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
								className={
									'input input-outline rounded-md mr-4 w-full on-form ' + (errors?.title ? 'input-error' : 'input-secondary')
								}
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
								className={
									'input input-outline rounded-md mr-6 w-full on-form ' + (errors?.dueDate ? 'input-error' : 'input-secondary')
								}
							/>

							<button
								className="btn btn-ghost btn-round mr-2 on-form "
								type="button"
								onClick={handleSubmit((values) => handleUpdate(toDoData, values))}
							>
								<GoCheck className="w-5 h-5" />
							</button>

							<button className="btn btn-ghost btn-round on-form" onClick={() => setEditingId(null)} type="button">
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
					{/* edit button */}
					<div>
						<button className="btn btn-ghost mr-2" onClick={() => setEditingId(toDoData.id)}>
							<GoPencil className="w-5 h-5" />
						</button>
					</div>
					{/* delete to-do button */}
					<div>
						<button className="btn btn-ghost" onClick={handleShowDeleteModal}>
							<GoTrash className="w-5 h-5" />
						</button>
						<dialog id="my_modal_1" className="modal">
							<div className="modal-box">
								<h3 className="font-bold text-lg text-rose-400 text-center">Warning!</h3>
								<p className="py-4 text-center">This action is irreversible. Are you sure you would like to proceed?</p>
								<div className="modal-action flex justify-around">
									<form method="dialog" className="flex items-center justify-around">
										{/* if there is a button in form, it will close the modal */}
										<button className="btn mr-3 border border-secondary" onClick={() => onDelete(toDoData)}>
											Ok
										</button>
										<button className="btn border border-neutral">Cancel</button>
									</form>
								</div>
							</div>
						</dialog>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default ToDo
