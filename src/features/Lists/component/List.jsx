import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useListContext } from '../../../hooks/useListContext'
import { GoKebabHorizontal, GoListUnordered } from 'react-icons/go'
import { actions } from '../../../state-management/List/listReducer'
import { useDeleteList } from '../hooks/useDeleteList'
import { useAccessList } from '../hooks/useAccessList'
import { useEditList } from '../hooks/useEditList'

function List({ listData }) {
	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [_errors, setErrors] = useState(null)
	const { activeList, setActiveList, removeActiveList, dispatch } = useListContext()

	const { deleteList } = useDeleteList()
	const { accessList } = useAccessList()
	const { editList } = useEditList()

	const {
		register,
		reset,
		formState: { errors, isValid },
	} = useForm()

	async function onSelect(list) {
		if (list?.id === activeList?.id) return
		setIsLoading(true)
		setIsEditing(false)
		reset()
		try {
			if (list) {
				const [error] = await accessList(list)
				if (error) {
					setErrors({ message: error })
					return
				}
				setActiveList(list.id)
			} else removeActiveList()
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	async function onDelete(list) {
		setIsLoading(true)
		try {
			const [error] = await deleteList(list?.id)
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

	async function handleEdit(list, newTitle) {
		setIsLoading(true)
		try {
			const [error, editedList] = await editList(list.id, newTitle)
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
		<div
			className={
				'flex flex-row items-center justify-between rounded-lg px-2 my-3 border-2 border-accent ' +
				(activeList?.id === listData?.id ? ' bg-neutral py-4' : 'bg-base-300 py-2')
			}
			onClick={() => onSelect(listData)}
		>
			<div className="flex flex-row items-center">
				<div className="flex-1 mr-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</div>
				{isEditing && listData?.id === activeList?.id ? (
					<form
						onBlur={() => {
							setIsEditing(false)
							reset()
						}}
						onSubmit={() => {
							setIsEditing(false)
							reset()
						}}
						onChange={(e) => handleEdit(listData, e.target.value)}
					>
						<input
							{...register('listTitle', { required: 'title required*' })}
							className={'input input-secondary rounded-sm order-0 input-sm w-full max-w-xs p-1 m-0 '}
							type="text"
							value={listData.title}
							placeholder="list title"
						></input>
					</form>
				) : (
					<div onDoubleClick={() => setIsEditing(true)} className="">
						{listData.title}
					</div>
				)}
			</div>

			<div className="dropdown dropdown-bottom">
				<div tabIndex={0} role="button" className="btn btn-ghost btn-round btn-sm m-1">
					<GoKebabHorizontal />
				</div>
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
					<li
						onClick={() => {
							setIsEditing(true)
						}}
					>
						<p>edit</p>
					</li>
					<li onClick={() => onDelete(listData)}>
						<p className="text-rose-500">delete</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default List