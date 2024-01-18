export default function DeleteListButton() {
	return (
		<div onClick={() => console.log('deleted list')} className="flex items-center | my-2">
			<h3 className="text-lg text-rose-500">delete &lt;!&gt;</h3>
			<div className="border-2 rounded-md | h-fit ml-2">
				<div className="delete-todo-icon | p-2 rounded-md | bg-slate-700 hover:bg-slate-800 | transition-all">
					<img src="/delete-icon.svg" alt="icon for new list button" className="h-5 w-3.5"></img>
				</div>
			</div>
		</div>
	)
}
