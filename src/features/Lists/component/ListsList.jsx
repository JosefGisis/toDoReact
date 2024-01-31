import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import DataContext from '../../../state-management/data/DataContext'
import { useAccessList } from '../hooks/useAccessList'
import { useEditList } from '../hooks/useEditList'
import { useDeleteList } from '../hooks/useDeleteList'
import ListContext from '../../../state-management/List/ListContext'

export default function ToDoListsList() {
	const { data } = useContext(DataContext)
	const { activeList, dispatch } = useContext(ListContext)

	const [isLoading, setIsLoading] = useState(false)
	const [_errors, setErrors] = useState(null)
	const [awaitingTitle, setAwaitingTitle] = useState(false)

	const { deleteList } = useDeleteList()
	const { accessList } = useAccessList()
	const { editList } = useEditList()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	async function onSelect(list) {
		if (list?.id === activeList?.id) return
		setIsLoading(true)
		setAwaitingTitle(false)
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

	async function onEdit() {
		setAwaitingTitle(!awaitingTitle)
	}

	const onSubmit = (list) => (data) => {
		console.log(list, data)
		setAwaitingTitle(false)
		reset()
		// setIsLoading(true)
		// try {
		// 	const [error] = await editList(list?.id, data.title)
		// 	if (error) {
		// 		setErrors({ message: error })
		// 		return
		// 	}
		// } catch (error) {
		// 	setErrors({ message: error.message })
		// } finally {
		// 	setIsLoading(false)
		// }
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

			{data.lists &&
				data?.lists?.map((list, i) => (
					<div
						key={i}
						className={
							'flex flex-row justify-between px-4 my-3 ' +
							(activeList?.id === list?.id ? 'bg-slate-500 text-sky-200 py-4' : 'bg-slate-700 py-2')
						}
						onClick={() => onSelect(list)}
					>
						{awaitingTitle && list?.id === activeList?.id ? (
							<form onSubmit={handleSubmit(onSubmit(list))}>
								<input
									{...register('listTitle', {
										required: 'title required*',
										minLength: {
											value: 5,
											message: 'minimum five characters required',
										},
									})}
									className="text-black px-1 py-0.5 focus:outline-sky-500"
									type="text"
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
						<button className="bg-sky-500 w-20 rounded-md focus:outline-sky-500" type="button" onClick={() => onEdit()}>
							edit
						</button>
					</div>
				))}
			{activeList && <p>{activeList?.id}</p>}
			{isLoading && <p>loading...</p>}
			{_errors && <p>errors present</p>}
		</>
	)
}
