import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'

import { removeActiveList, selectActiveList } from '../../app/activeListSlice'
import { useDeleteListMutation, useUpdateListMutation } from '../../api/listsSlice.js'
import { useDeleteToDosByListMutation } from '../../api/toDosSlice.js'

import { GoKebabHorizontal } from 'react-icons/go'

import type { List, UpdateList } from '../../api/listsSlice.js'

function ActiveListBanner() {
	const [isEditing, setIsEditing] = useState(false)

	const activeList = useSelector(selectActiveList)
	const dispatch = useDispatch()

	const { logout } = useAuth()
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
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	const handleUpdate = useCallback(async (list: List, update: UpdateList) => {
		setIsEditing(false)
		reset()
		// Do not update list if nothing changes because it causes lists to re-sort.
		if (update.title === list.title) return
		try {
			await updateList({ listId: list.id, update })
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	return (
		<div className="flex items-center justify-between">
			{/* title or title input field. Defaults to to-dos if not active list */}
			<div className="text-4xl font-bold my-5">
				{activeList ? (
					!isEditing ? (
						// title for active list
						<div onDoubleClick={() => setIsEditing(true)}>{activeList?.title}</div>
					) : (
						// input field when active list and isEditing
						<form
							onBlur={handleSubmit((values) => handleUpdate(activeList, values))}
							onSubmit={handleSubmit((values) => handleUpdate(activeList, values))}
						>
							<input
								{...register('title', {
									required: 'title required*',
									maxLength: {
										value: 35,
										message: 'maximum thirty-five characters',
									},
								})}
								className={
									'input rounded-sm input-md w-full max-w-xs p-1 text-2xl ' + (errors?.title ? 'input-error' : 'input-secondary')
								}
								type="text"
								defaultValue={activeList.title}
								placeholder={String(errors?.title?.message || '')}
								autoFocus
							/>
						</form>
					)
				) : (
					// default list title (to-dos)
					<div>To-dos</div>
				)}
			</div>

			{/* dropdown button for created lists */}
			{/* only appears if it is a list created by the user and not default list */}
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
