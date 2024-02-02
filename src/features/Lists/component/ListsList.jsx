import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import DataContext from '../../../state-management/data/DataContext'
import { useAccessList } from '../hooks/useAccessList'
import { useEditList } from '../hooks/useEditList'
import { useDeleteList } from '../hooks/useDeleteList'
import ListContext from '../../../state-management/List/ListContext'

export default function ToDoListsList() {
	const { data, dispatch: dispatchData } = useContext(DataContext)
	const { activeList, dispatch } = useContext(ListContext)

	const [isLoading, setIsLoading] = useState(false)
	const [_errors, setErrors] = useState(null)
	const [isEditing, setIsEditing] = useState(false)

	const { deleteList } = useDeleteList()
	const { accessList } = useAccessList()
	const { editList } = useEditList()

	const {
		register,
		handleSubmit,
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
				dispatch({ type: 'ASSIGN', payload: { id: list.id, title: list.title, creationDate: list.creation_date } })
			} else dispatch({ type: 'UNASSIGN' })
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
			dispatch({ type: 'UNASSIGN' })
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
			dispatchData({ type: 'EDIT LIST', payload: editedList })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<div
				className={'flex flex-row justify-between px-4 my-3 ' + (!activeList ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')}
				onClick={() => {
					onSelect(null)
				}}
			>
				To-dos
			</div>

			{data?.lists &&
				data?.lists?.map((list, i) => (
					<div
						key={i}
						className={
							'flex flex-row justify-between px-4 my-3 ' +
							(activeList?.id === list?.id ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')
						}
						onClick={() => onSelect(list)}
					>
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
							<div>{list.title}</div>
						)}

						<div>{new Date(list?.creation_date?.split('T')[0]).toDateString()}</div>
						<button className="bg-sky-500 w-20 rounded-md focus:outline-sky-500" type="button" onClick={() => onDelete(list)}>
							delete
						</button>
						<button className="bg-sky-500 w-20 rounded-md focus:outline-sky-500" type="button" onClick={() => setIsEditing(!isEditing)}>
							edit
						</button>
					</div>
				))}
			{_errors && <p> {_errors.message} </p>}
		</>
	)
}
