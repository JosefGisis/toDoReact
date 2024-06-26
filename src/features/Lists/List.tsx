import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

import { setActiveList, selectActiveList, removeActiveList } from '../../app/activeListSlice'
import { useDeleteListMutation, useUpdateListMutation } from '../../api/listsSlice.js'
import { useDeleteToDosByListMutation } from '../../api/toDosSlice.js'

import ListIcon from '../../components/ListIcon'
import { GoKebabHorizontal, GoCheck, GoX } from 'react-icons/go'

import type { List as ListType, UpdateList } from '../../api/listsSlice.js'
import type { ListPropsWithEditingId } from './ListsList.js'

function List({ listData, editingId, setEditingId }: ListPropsWithEditingId) {
	const activeList = useSelector(selectActiveList)
	const dispatch = useDispatch()

	const { logout } = useAuth()
	const [deleteList] = useDeleteListMutation()
	const [deleteToDosByList] = useDeleteToDosByListMutation()
	const [updateList] = useUpdateListMutation()

	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: { errors: formErrors },
	} = useForm()

	// onSelect cannot be handled by handleUpdate because dispatch and other states need to be handled differently.
	const onSelect = useCallback(async (list: ListType, activeList: ListType | null) => {
		// Do not update list if it is already active
		if (list.id === activeList?.id) return

		setEditingId(null)
		reset()

		try {
			await updateList({ listId: list.id, update: { title: undefined } }).unwrap()
			dispatch(setActiveList(list))
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

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

	const handleUpdate = useCallback(async (list: ListType, update: UpdateList) => {
		setEditingId(null)
		reset()
		// Do not update list if title is the same
		if (update.title === list.title) return

		try {
			await updateList({ listId: list.id, update }).unwrap()
		} catch (error: any) {
			console.log(error)
			if (error?.status === 401) logout()
		}
	}, [])

	// Attached to delete message modal to bring it up when delete button is clicked.
	// Putting this in a function to use @ts-ignore.
	const handleShowDeleteModal = useCallback(() => {
		// @ts-ignore
		document.getElementById('my_modal_1')?.showModal?.()
	}, [])

	useEffect(() => {
		if (listData.id === activeList?.id && listData.title !== activeList.title) dispatch(setActiveList(listData))
	}, [listData])

	// onBlur event handler for the form to update the list data when the user clicks outside the form.
	const handleFormBlur = useCallback(
		(list: ListType, e: React.FormEvent) => {
			const fieldValues = watch()
			// @ts-ignore
			if (e?.relatedTarget?.classList?.contains('on-form')) {
				e.preventDefault()
			} else handleUpdate(list, fieldValues)
		},
		[watch, handleUpdate]
	)

	return (
		// div contains group tailwind class to interact with dropdown menu
		<div
			className={
				'group flex items-center justify-between rounded-lg px-2 mb-3 ' +
				(activeList?.id !== listData?.id
					? 'bg-base-300 text-base-content border-2 border-neutral py-2'
					: 'bg-neutral text-neutral-content py-3')
			}
			onClick={() => onSelect(listData, activeList)}
		>
			{/* list icon and list title */}
			<div className="flex flex-row items-center">
				<div className="mr-2">
					<ListIcon />
				</div>

				<div>
					{/* both the title and a title input field */}
					{editingId === listData.id && listData?.id === activeList?.id ? (
						<form
							className="flex justify-between"
							onBlur={(e) => handleFormBlur(listData, e)}
							onSubmit={handleSubmit((values) => handleUpdate(listData, values))}
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
									'input rounded-sm input-sm w-full flex-1 max-w-xs p-1 m-0 mr-1 ' +
									(formErrors?.title ? 'input-error' : 'input-secondary')
								}
								type="text"
								defaultValue={listData.title}
								placeholder={String(formErrors?.title?.message || '')}
								autoFocus
							/>
							<button className="btn btn-ghost btn-round btn-sm mr-0.5 on-form">
								<GoCheck className="w-4 h-4" />
							</button>

							<button className="btn btn-ghost btn-round btn-sm on-form" onClick={() => setEditingId(null)} type="button">
								<GoX className="w-4 h-4" />
							</button>
						</form>
					) : (
						<div onDoubleClick={() => setEditingId(listData.id)}>{listData.title}</div>
					)}
				</div>
			</div>

			{/* dropdown menu */}
			{editingId !== listData.id && (
				// when list is active dropdown menu button is visible, else it is visible on hover.
				<div className={'dropdown dropdown-end ' + (activeList?.id === listData.id ? 'visible' : 'invisible group-hover:visible')}>
					<div tabIndex={0} role="button" className="btn btn-ghost btn-round btn-sm m-1">
						<GoKebabHorizontal />
					</div>

					<ul
						tabIndex={0}
						// the hidden class is not strictly necessary, but it is needed in this case because the dropdown menu open on the next list when the
						// list is deleted. This hides the menu until the user clicks on another list.
						className={
							'dropdown-content dropdown-left menu p-2 shadow bg-base-300 text-base-content border border-secondary rounded-md w-[7rem] ' +
							(activeList?.id !== listData.id && 'hidden')
						}
						style={{ zIndex: 1000 }}
					>
						<li onClick={() => setEditingId(listData.id)}>
							<p>edit</p>
						</li>

						<div>
							<li className="" onClick={handleShowDeleteModal}>
								<p className="text-error">delete!</p>
							</li>
							<dialog id="my_modal_1" className="modal">
								<div className="modal-box">
									<h3 className="font-bold text-lg text-rose-400 text-center">Warning!</h3>
									<p className="py-4 text-center">This action is irreversible. Are you sure you would like to proceed?</p>
									<div className="modal-action flex justify-around">
										<form method="dialog" className="flex items-center justify-around">
											{/* if there is a button in form, it will close the modal */}
											<button className="btn mr-3 border border-secondary" onClick={() => onDelete(listData.id)}>
												Ok
											</button>
											<button className="btn border border-neutral">Cancel</button>
										</form>
									</div>
								</div>
							</dialog>
						</div>
					</ul>
				</div>
			)}
		</div>
	)
}

export default List
