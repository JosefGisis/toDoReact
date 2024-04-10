import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import { removeActiveList, selectActiveList } from '../../app/activeListSlice'
import { useDeleteListMutation, useUpdateListMutation } from '../../api/listsSlice.js'
import { useDeleteToDosByListMutation } from '../../api/toDosSlice.js'

import { GoKebabHorizontal } from 'react-icons/go'

import type { List, UpdateList } from '../../api/listsSlice.js'

function ActiveListBanner() {
	const [isEditing, setIsEditing] = useState(false)

	const activeList = useSelector(selectActiveList)
	const dispatch = useDispatch()

	const [deleteToDosByList] = useDeleteToDosByListMutation()
	const [deleteList] = useDeleteListMutation()
	const [updateList] = useUpdateListMutation()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onDelete = useCallback(async (listId: number) => {
		try {
			await deleteToDosByList({ membership: listId }).unwrap()
			await deleteList(listId).unwrap()
			dispatch(removeActiveList())
		} catch (error) {
			console.log(error)
		}
	}, [])

	const handleUpdate = useCallback(async (list: List, update: UpdateList) => {
		setIsEditing(false)
		reset()
		// Do not update list if nothing changes because it causes lists to re-sort.
		if (update.title === list.title) return
		try {
			await updateList({ listId: list.id, update })
		} catch (error) {
			console.log(error)
		}
	}, [])

	let content: any
	if (activeList && !isEditing) {
		content = <div onDoubleClick={() => setIsEditing(true)}>{activeList?.title}</div>
	}
	if (activeList && isEditing) {
		content = (
			<form
				onBlur={handleSubmit((values) => handleUpdate(activeList, { title: values.title }))}
				onSubmit={handleSubmit((values) => handleUpdate(activeList, { title: values.title }))}
			>
				<input
					{...register('title', {
						required: 'title required*',
						maxLength: {
							value: 35,
							message: 'maximum thirty-five characters',
						},
					})}
					className={'input rounded-sm input-md w-full max-w-xs p-1 text-2xl ' + (errors?.title ? 'input-error' : 'input-secondary')}
					type="text"
					defaultValue={activeList.title}
					placeholder={errors?.title && typeof errors?.title?.message === 'string' ? errors?.title?.message : undefined}
				/>
			</form>
		)
	}
	if (!activeList) {
		content = <div className="my-2">To-dos</div>
	}

	return (
		<div className="flex items-center justify-between">
			{/* render title content */}
			<div className="text-4xl font-bold">{content}</div>

			{/* conditional button for created lists */}
			{activeList && (
				<div className="menu-btn dropdown dropdown-bottom dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-info btn-round btn-md m-1">
						<GoKebabHorizontal className="w-6 h-6" />
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-base-300 border border-secondary rounded-lg w-[7rem]"
					>
						<li onClick={() => setIsEditing(!isEditing)}>
							<p>{isEditing ? 'stop editing' : 'edit list'}</p>
						</li>

						<li onClick={() => onDelete(activeList.id)}>
							<p className="text-rose-500">delete list</p>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default ActiveListBanner
