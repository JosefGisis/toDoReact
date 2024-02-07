import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAccessList } from '../hooks/useAccessList'
import { useEditList } from '../hooks/useEditList'
import { useDeleteList } from '../hooks/useDeleteList'
import { useListContext } from '../../../hooks/useListContext'
import { actions } from '../../../state-management/List/listReducer'

export default function ToDoListsList() {
	const { activeList, lists, dispatch, setActiveList, removeActiveList } = useListContext()

	const [isLoading, setIsLoading] = useState(false)
	const [_errors, setErrors] = useState(null)
	const [isEditing, setIsEditing] = useState(false)

	const { deleteList } = useDeleteList()
	const { accessList } = useAccessList()
	const { editList } = useEditList()

	const {
		register,
		reset,
		formState: { errors, isValid },
	} = useForm()

	if (errors && isValid && editList && isLoading) console.log()

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
			// TODO: correct active list update when deleting list
			/**
			 * this should really be dependant on whether or not the
			 * deleted list is the active list; however, deleted lists
			 * always become active when their respective delete
			 * buttons are pressed.
			 */
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
		<div className="">
			<div
				className={
					'flex flex-row items-center justify-between rounded-lg px-2 mb-3 border-2 border-neutral ' +
					(!activeList ? 'bg-neutral py-3' : 'bg-base-300 py-2')
				}
				onClick={() => {
					onSelect(null)
				}}
			>
				{' '}
				<div className="flex items-center">
					<div className="mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
					</div>
					<p>To-dos</p>
				</div>
			</div>

			<div className="dropdown">
				<div tabIndex={0} role="button" className="btn bg-primary hover:bg-secondary">
					sort list
				</div>
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-lg w-48">
					<li>
						<a>title</a>
					</li>
					<li>
						<a>creation date</a>
					</li>
					<li>
						<a>last modified</a>
					</li>
				</ul>
			</div>
			
			<div className="dropdown">
				<div tabIndex={0} role="button" className="btn bg-primary hover:bg-secondary">
					order
				</div>
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-lg w-48">
					<li>
						<a>ascending</a>
					</li>
					<li>
						<a>descending</a>
					</li>
				</ul>
			</div>

			{lists &&
				lists.map((list, i) => (
					<div
						key={i}
						className={
							'flex flex-row items-center justify-between rounded-lg px-2 my-3 border-2 border-neutral ' +
							(activeList?.id === list?.id ? ' bg-neutral py-4' : 'bg-base-300 py-2')
						}
						onClick={() => onSelect(list)}
					>
						<div className="flex flex-row items-center">
							<div className="flex-1 mr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block w-5 h-5 stroke-current"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
								</svg>
							</div>
							{isEditing && list?.id === activeList?.id ? (
								<form
									onBlur={() => {
										setIsEditing(false)
										reset()
									}}
									onSubmit={() => {
										setIsEditing(false)
										reset()
									}}
									onChange={(e) => handleEdit(list, e.target.value)}
								>
									<input
										{...register('listTitle', { required: 'title required*' })}
										className="text-black px-1 py-0.5 focus:outline-sky-500"
										type="text"
										value={list.title}
										placeholder="list title"
									></input>
								</form>
							) : (
								<div className="">{list.title}</div>
							)}
						</div>
						{/* <div>{new Date(list?.creation_date?.split('T')[0]).toDateString()}</div> */}
					</div>
				))}
			{_errors && <p> {_errors.message} </p>}
		</div>
	)
}
