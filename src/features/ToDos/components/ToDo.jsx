import { useState } from 'react'
import useDeleteToDos from '../hooks/useDeleteToDo'
import useToggleToDos from '../hooks/useToggleToDo'
import { useListContext } from '../../../hooks/useListContext'
import { actions } from '../../../state-management/List/listReducer'
import { GoKebabHorizontal, GoTrash, GoCalendar } from 'react-icons/go'

function ToDo({ data }) {
	const { meta: deleteMeta, deleteToDo } = useDeleteToDos()
	const { meta: toggleMeta, toggleToDo } = useToggleToDos()
	const [errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	if (deleteMeta && toggleMeta && errors && isLoading) console.log()

	const { dispatch } = useListContext()

	async function onDelete(toDo) {
		try {
			const [error] = await deleteToDo(toDo)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.REMOVE_TODO, payload: toDo })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	async function onToggle(toDo) {
		try {
			const [error] = await toggleToDo(toDo)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: actions.TOGGLE_TODO, payload: toDo })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={'rounded-lg transition-all p-3 mb-5 hover:bg-base-300 ' + (data?.completed ? 'bg-default' : 'bg-neutral')}>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input type="checkbox" checked={data?.completed} onClick={() => onToggle(data)} className="checkbox checkbox-primary mr-3" />

					<div className="py-1">
						<h3 className={'rounded-lg text-2xl font-bold my-2 ' + (data?.completed ? 'line-through text-rose-400' : '')}>
							{data?.title}
						</h3>
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex items-center mr-6">
						<GoCalendar className="mr-2" />
						<p className=" text-green-500">{data.due_date ? new Date(data.due_date.split('T')[0]).toDateString() : 'no due-date'}</p>
					</div>
					<div className="dropdown dropdown-bottom dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-primary btn-outline btn-round mr-2">
							<GoKebabHorizontal className="w-4 h-4" />
						</div>
						<ul tabIndex={0} className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-primary rounded-box w-52">
							<li>
								<p>edit</p>
							</li>
							<li>
								<p>information</p>
							</li>
							<li onClick={() => onToggle(data)}>
								<p>complete</p>
							</li>
						</ul>
					</div>
					<button className="btn btn-outline btn-primary" onClick={() => onDelete(data)}>
						<GoTrash className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ToDo
