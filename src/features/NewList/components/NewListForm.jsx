import { useForm } from 'react-hook-form'
// import { useEffect, useState } from 'react'
import useNewList from '../hooks/useNewList'
import { useContext, useEffect } from 'react'
import DataContext from '../../../state-management/data/DataContext'

function NewListForm() {
	const { createList } = useNewList()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = (newListData) => {
		createList(newListData)
        reset()
	}

	const onCancel = () => {
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex items-center bg-slate-700 px-4 py-4 my-5">
			<div className="mt-2 mb-4">
				{/* <label htmlFor="list-title">list title</label> */}
				<input
					{...register('listTitle', {
						required: 'title required*',
						minLength: {
							value: 5,
							message: 'minimum five characters required',
						},
					})}
					className="text-black p-1 rounded-md focus:outline-sky-500"
					type="text"
					placeholder="list title"
				></input>
				{errors?.listTitle && <p className="text-rose-500 text-sm absolute">{errors.listTitle.message}</p>}
			</div>

			<button
				id="new-list-submit"
				className={'w-20 ml-1 rounded-md mr-4 focus:outline-sky-500 ' + (isValid ? 'bg-sky-500' : 'bg-sky-800')}
				type="submit"
			>
				submit
			</button>

			<button id="new-list-cancel" className="bg-sky-500 w-20 rounded-md focus:outline-sky-500" type="button" onClick={onCancel}>
				cancel
			</button>
		</form>
	)
}

export default NewListForm
