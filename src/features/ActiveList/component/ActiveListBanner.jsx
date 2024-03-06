import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeActiveList, selectActiveList} from '../../../app/activeListSlice'
import { useForm } from 'react-hook-form'
import { GoKebabHorizontal } from 'react-icons/go'

import { useListContext } from '../../../hooks/useListContext'
import { useUpdateList } from '../../Lists/hooks/useUpdateList'
import { useDeleteList } from '../../Lists/hooks/useDeleteList'

import { actions } from '../../../state-management/List/listReducer'
import { useDeleteListToDos } from '../../Lists/hooks/useDeleteListToDos'

function ActiveListBanner() {
	const [isEditing, setIsEditing] = useState(false)
	const [_errors, setErrors] = useState(null)

	const activeList = useSelector(selectActiveList)
	const dispatch = useDispatch()

	const { dispatch: oldDispatch } = useListContext()
	const { updateList } = useUpdateList()
	const { deleteList } = useDeleteList()
	const { deleteListToDos } = useDeleteListToDos()
	
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()


	const onDelete = useCallback(async (listId) => {
		try {
			const [deleteListToDosError] = await deleteListToDos(listId)
			if (deleteListToDosError) {
				setErrors({ message: deleteListToDosError })
				return
			}
			const [deleteListError] = await deleteList(listId)
			if (deleteListError) {
				setErrors({ message: deleteListError })
				return
			}
			oldDispatch({ type: actions.REMOVE_LIST_TODOS, payload: listId })
			oldDispatch({ type: actions.REMOVE_LIST, payload: listId })
			// removeActiveList sets activeList to to-dos (default list)
			dispatch(removeActiveList())
		} catch (error) {
			setErrors({ message: error.message })
		}
	}, [])

	const handleUpdate = useCallback(async (list, values) => {
		setIsEditing(false)
		reset()
		// Do not update list if nothing changes because it causes lists to re-sort.
		if (values.title === list.title) return
		try {
			const [error, editedList] = await updateList(list.id, values)
			if (error) {
				setErrors({ message: error })
				return
			}
			oldDispatch({ type: actions.UPDATE_LIST, payload: editedList })
		} catch (error) {
			setErrors({ message: error.message })
		}
	}, [])

	useEffect(() => {
		if (_errors) console.log(_errors.message)
	}, [_errors])

	return (
		<div className="flex items-center justify-between">
			<div className="text-4xl font-bold">
				{activeList ? (
					isEditing ? (
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
								placeholder={errors?.title && errors?.title?.message}
							/>
						</form>
					) : (
						<div onDoubleClick={() => setIsEditing(true)}>{activeList?.title}</div>
					)
				) : (
					'To-dos'
				)}
			</div>

			{activeList && (
				<div className="menu-btn dropdown dropdown-bottom dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-info btn-round btn-md m-1">
						<GoKebabHorizontal className="w-6 h-6" />
					</div>
					<ul tabIndex={0} className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-neutral rounded-box w-52">
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
