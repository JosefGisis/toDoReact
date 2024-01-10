function NewToDoForm() {
	return (
		<div id="new-todo-form">
			<div className="max-w-[640px] | bg-slate-800 | p-4 my-4 | rounded-lg">
				<h3 className="text-2xl | mb-5">Add New To-do</h3>
				<div className="flex flex-col sm:flex-row">
					<input
						className="text-black | max-w-[15rem] my-2 p-1 mr-4 | h-10 | rounded-md focus:outline-sky-500"
						type="text"
						id="new-todo-title"
						name="new-todo-title"
						placeholder="new to-do title"
						required
					/>
					<input
						className="text-black | max-w-[15rem] my-2 p-1 mr-4 | h-10 | rounded-md focus:outline-sky-500"
						type="date"
						id="new-todo-due-date"
						placeholder="mm/dd/yyyy"
					/>
					<button id="new-todo-submit" className="bg-sky-800 | my-2 w-20 h-10 | rounded-md focus:outline-sky-500" type="submit">
						submit
					</button>
				</div>
			</div>
		</div>
	)
}
export default NewToDoForm
