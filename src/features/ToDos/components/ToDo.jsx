import { useContext, useState } from 'react'
import DataContext from '../../../state-management/data/DataContext'
import useDeleteToDos from '../hooks/useDeleteToDo'
import useToggleToDos from '../hooks/useToggleToDo'

function ToDo({ data }) {
	const { meta: deleteMeta, deleteToDo } = useDeleteToDos()
	const { meta: toggleMeta, toggleToDo } = useToggleToDos()
	const [errors, setErrors] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	if (deleteMeta && toggleMeta && errors && isLoading) console.log()

	const { dispatch } = useContext(DataContext)

	async function onDelete(toDo) {
		try {
			const [error] = await deleteToDo(toDo)
			if (error) {
				setErrors({ message: error })
				return
			}
			dispatch({ type: 'REMOVE TODO', payload: toDo })
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
			dispatch({ type: 'TOGGLE TODO', payload: toDo })
		} catch (error) {
			setErrors({ message: error.message })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div 
		className={'rounded-lg transition-all p-3 mb-5 hover:bg-slate-600 ' + ( data?.completed ? 'bg-slate-600' : 'bg-slate-800' )}
		>
			<div className="py-1">
				<h3 className={'rounded-lg text-2xl font-bold my-2 ' + ( data?.completed ? 'line-through text-rose-400' : '')}>{data?.title}</h3>
				<p className="text-sm my-2">
					<i>{new Date(data?.creation_date?.split('T')[0]).toDateString()}</i>
				</p>
			</div>

			<div className="my-2">
				<hr className="border-1 border-solid border-sky-500" />
			</div>

			<div className='flex flex-row content-center justify-between flex-wrap'>
				<div className='flex items-center min-w-[10rem] text-lg my-2'>
					<p className='after:text-sm after:italic after:ml-1'>
						Due:{' '}
						<span className='text-white text-bold p-1 rounded-md bg-green-700'>
							{data.due_date ? new Date(data.due_date.split('T')[0]).toDateString() : 'NA'}
						</span>
					</p>
				</div>

				<div className='flex items-center' onClick={() => onToggle(data)}>
					<div className='flex items-center my-2 mr-4'>
						<h3 className='text-lg'>complete</h3>
						<div className='border-2 rounded-md h-fit ml-2'>
							<div className='complete-todo-icon p-2 rounded-md bg-slate-700 hover:bg-slate-800 transition-all'>
								<div>
									<img src='/checkbox.svg' alt='checkbox icon' className='w-4 h-5' />
								</div>
								<div className={'absolute translate-y-[-1.475rem] translate-x-[0.075rem] transition-all'}>
									{data?.completed === 1 ? (
										<img src='/checkmark.svg' width='20px' height='20px' alt='checkmark' className='w-5 h-5' />
									) : null}
								</div>
							</div>
						</div>
					</div>

					<div className='flex items-center my-2' onClick={() => onDelete(data)}>
						<h3 className='text-lg text-rose-500'>delete&lt;!&gt;</h3>
						<div className='border-2 rounded-md h-fit ml-2'>
							<div className='delete-todo-icon p-2 rounded-md bg-slate-700 hover:bg-slate-800 transition-all'>
								<img src='/delete-icon.svg' alt='icon for new list button' className='h-5 w-3.5' />
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default ToDo
