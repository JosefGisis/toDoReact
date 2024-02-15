import { useState } from 'react'
import { useListContext } from '../../../hooks/useListContext'
import { GoKebabHorizontal } from 'react-icons/go'
import { useUpdateList } from '../../Lists/hooks/useUpdateList'
import { useDeleteList } from '../../Lists/hooks/useDeleteList'
import { actions } from '../../../state-management/List/listReducer'

function ActiveListBanner() {
	const { activeList, dispatch, removeActiveList } = useListContext()
	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState(null)
	const { updateList } = useUpdateList()
	const { deleteList } = useDeleteList()

	async function onDelete() {
		setIsLoading(true)
		try {
			const [error] = await deleteList(activeList?.id)
			if (error) {
				setErrors({ message: error })
				return
			}
			removeActiveList()
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	async function handleEdit(newTitle) {
		setIsLoading(true)
		try {
			const [error, editedList] = await updateList(activeList.id, newTitle)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.UPDATE_LIST, payload: editedList })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex items-center justify-between">
			<h3 className="w-fit rounded-lg bg-info text-4xl font-bold p-3">
				{activeList ? (
					isEditing ? (
						<form
						
							onSubmit={() => setIsEditing(false)}
						>

						<input
							type="text"
							value={activeList.title}
							onChange={(e) => handleEdit(e.target.value)}
							onBlur={() => setIsEditing(false)} 
							className="input input-bordered input-secondary w-full max-w-xs"
							/>
							</form>
					) : (
						<div onDoubleClick={() => setIsEditing(true)}>
							{

							activeList.title
							}

						</div>
					)
				) : (
					'To-dos'
				)}
			</h3>
			{activeList && (
				<div className="menu-btn dropdown dropdown-bottom dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-outline btn-info btn-round btn-lg m-1">
						<GoKebabHorizontal className="w-6 h-6" />
					</div>
					<ul tabIndex={0} className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
						<li
							onClick={() => {
								setIsEditing(!isEditing)
							}}
						>
							<p>edit list</p>
						</li>
						<li onClick={() => onDelete()}>
							<p className="text-rose-500">delete list</p>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default ActiveListBanner
