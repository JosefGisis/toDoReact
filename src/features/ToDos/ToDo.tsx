import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDeleteToDoMutation, useUpdateToDoMutation } from '../../api/toDosSlice'
import { useAuth } from '../../hooks/useAuth'

import ToDoDueDate from './ToDoDueDate'
import { GoKebabHorizontal, GoTrash, GoCheck, GoX } from 'react-icons/go'

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
			<div className="flex items-center flex-1">
				{/* to-do check to complete and un-complete */}
				<input
					type="checkbox"
					checked={toDoData?.completed}
					onChange={() => handleUpdate(toDoData, { completed: !toDoData.completed })}
					className="checkbox checkbox-primary mr-3"
				/>

				{/* to-do title and title editing form */}
				<div className="flex-1">
					{editingId === toDoData.id ? (
						<form
							className="flex justify-between"
							// onBlur={handleSubmit((values) => handleUpdate(toDoData, values))}
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
							<button className="btn btn-outline btn-primary mr-2">
								<GoCheck className="w-5 h-5" />
							</button>

							<button className="btn btn-outline btn-primary" onClick={() => setEditingId(null)} type="button">
								<GoX className="w-5 h-5" />
							</button>
						</form>
					) : (
						<div className="flex items-center justify-between" onDoubleClick={() => setEditingId(toDoData.id)}>
							<h3 className={'rounded-lg text-2xl font-bold my-2 mr-4 ' + (toDoData.completed && 'line-through text-rose-400')}>
								{toDoData.title}
							</h3>

							<div>
								{toDoData?.dueDate && (
									<div className="flex items-center mr-6">
										{/* due-date component  */}
										<ToDoDueDate dueDate={toDoData.dueDate} completed={toDoData.completed} />
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{editingId !== toDoData.id ? (
				<div className="flex items-center">
					{/* dropdown button for to-do */}
					<div className="dropdown dropdown-bottom dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-primary btn-outline btn-round mr-2">
							<GoKebabHorizontal className="w-4 h-4" />
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-base-300 border border-primary rounded-lg z-[10] absolute w-52"
						>
							<li onClick={() => setEditingId(toDoData.id)}>
								<p>edit</p>
							</li>

							<li onClick={() => handleUpdate(toDoData, { dueDate: null })}>
								<p>remove due-date</p>
							</li>
						</ul>
					</div>

					{/* delete to-do button */}
					<div>
						<button className="btn btn-outline btn-primary" onDoubleClick={() => onDelete(toDoData)}>
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
