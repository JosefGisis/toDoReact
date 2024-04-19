import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDeleteToDoMutation, useUpdateToDoMutation } from '../../api/toDosSlice'
import { useAuth } from '../../hooks/useAuth'

import ToDoDueDate from './toDoDueDate'
import { GoKebabHorizontal, GoTrash } from 'react-icons/go'

import type { ToDo as ToDoType, UpdateToDo } from '../../api/toDosSlice'
import type { KeyboardEvent } from 'react'

function ToDo({ toDoData }: { toDoData: ToDoType }) {
	const [isEditing, setIsEditing] = useState({ title: false, dueDate: false })
	const titleRef = useRef<HTMLInputElement | null>(null)
	const dueDateRef = useRef<HTMLInputElement | null>(null)

	const { logout } = useAuth()
	const [deleteToDo] = useDeleteToDoMutation()
	const [updateToDo] = useUpdateToDoMutation()

	const {
		register,
		reset,
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
		setIsEditing({ title: false, dueDate: false })
		reset()

		try {
			const toDoId = toDo.id
			await updateToDo({ toDoId, update })
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	// handleKeyDown provides more control over the key events for editing fields
	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault()
				handleUpdate(toDoData, { title: titleRef.current?.value, dueDate: dueDateRef.current?.value })
			}
			if (event.key === 'Escape') setIsEditing({ title: false, dueDate: false })
		},
		[handleUpdate, toDoData, titleRef, dueDateRef]
	)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (titleRef.current)
				if (dueDateRef.current) {
					if (!titleRef.current.contains(event.target as Node) && !dueDateRef.current.contains(event.target as Node))
						handleUpdate(toDoData, { title: titleRef.current?.value, dueDate: dueDateRef.current?.value })
					else return
				} else {
					if (!titleRef.current.contains(event.target as Node)) handleUpdate(toDoData, { title: titleRef.current?.value })
					else return
				}
			else {
				if (dueDateRef.current) {
					if (!dueDateRef.current.contains(event.target as Node)) handleUpdate(toDoData, { dueDate: dueDateRef.current?.value })
					else return
				} else return
			}
		}

		const handleTabOutside = (event: globalThis.KeyboardEvent) => {
			if (event.key === 'Tab') {
				if (titleRef.current)
					if (dueDateRef.current) {
						if (!titleRef.current.contains(event.target as Node) && !dueDateRef.current.contains(event.target as Node))
							handleUpdate(toDoData, { title: titleRef.current?.value, dueDate: dueDateRef.current?.value })
						else return
					} else {
						if (!titleRef.current.contains(event.target as Node)) handleUpdate(toDoData, { title: titleRef.current?.value })
						else return
					}
				else {
					if (dueDateRef.current) {
						if (!dueDateRef.current.contains(event.target as Node)) handleUpdate(toDoData, { dueDate: dueDateRef.current?.value })
						else return
					} else return
				}
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleTabOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [handleUpdate, toDoData, titleRef, dueDateRef])

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
					onChange={() => handleUpdate(toDoData, { completed: !toDoData.completed })}
					className="checkbox checkbox-primary mr-3"
				/>

				{/* to-do title and title editing form */}
				<div className="mr-2">
					{isEditing.title ? (
						<form>
							<input
								{...register('title', {
									required: 'title required*',
									maxLength: {
										value: 100,
										message: 'maximum one-hundred characters',
									},
								})}
								type="text"
								name="title"
								ref={titleRef}
								onKeyDown={handleKeyDown}
								defaultValue={toDoData?.title}
								className={'input input-outline ' + (errors?.title ? 'input-error' : 'input-secondary')}
								placeholder={String(errors?.title?.message || '')}
								autoFocus
							/>
						</form>
					) : (
						<h3
							onDoubleClick={() => setIsEditing((prevEditing) => ({ ...prevEditing, title: true }))}
							className={'rounded-lg text-2xl font-bold my-2 ' + (toDoData.completed && 'line-through text-rose-400')}
						>
							{toDoData.title}
						</h3>
					)}
				</div>
			</div>

			{/* to-do due-date and editing form */}
			<div className="flex items-center">
				{isEditing.dueDate ? (
					<form>
						<input
							{...register('date', {
								pattern: {
									value: /^\d{4}-\d{2}-\d{2}$/,
									message: 'date format mm/dd/yyyy required',
								},
							})}
							type="date"
							name="date"
							ref={dueDateRef}
							onKeyDown={handleKeyDown}
							className={'input input-outline mr-6 ' + (errors?.dueDate ? 'input-error' : 'input-secondary')}
						/>
					</form>
				) : toDoData?.dueDate ? (
					<div onDoubleClick={() => setIsEditing((prevEditing) => ({ ...prevEditing, dueDate: true }))} className="flex items-center mr-6">
						{/* due-date component  */}
						<ToDoDueDate dueDate={toDoData.dueDate} completed={toDoData.completed} />
					</div>
				) : null}

				{/* dropdown button for to-do */}
				<div className="dropdown dropdown-bottom dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-primary btn-outline btn-round mr-2">
						<GoKebabHorizontal className="w-4 h-4" />
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-base-300 border border-primary rounded-lg w-52"
					>
						<li onClick={() => setIsEditing({ title: true, dueDate: true })}>
							<p>edit</p>
						</li>
						<li onClick={() => setIsEditing((prevEditing) => ({ ...prevEditing, dueDate: true }))}>
							<p>add due-date</p>
						</li>
						<li onClick={() => handleUpdate(toDoData, { dueDate: null })}>
							<p>remove due-date</p>
						</li>
					</ul>
				</div>

				{/* delete to-do button */}
				<div>
					<button className="btn btn-outline btn-primary" onClick={console.log} onDoubleClick={() => onDelete(toDoData)}>
						<GoTrash className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ToDo
