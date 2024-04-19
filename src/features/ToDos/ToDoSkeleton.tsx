const ToDoSkeleton = () => (
	<div className="w-full bg-base h-[72px] mb-3 rounded-lg flex items-center mt-3">
		<div className="skeleton w-[72px] h-full rounded-lg shrink-0"></div>
		<div className="skeleton w-full flex-1 h-full rounded-lg shrink-0 ml-3 mr-3"></div>
	</div>
)

export default ToDoSkeleton
