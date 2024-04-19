const ListSkeleton = () => (
	<div className="w-full bg-base h-[56px] mb-3 rounded-lg flex items-center">
		<div className="skeleton w-[56px] h-full rounded-lg shrink-0"></div>
		<div className="skeleton w-full flex-1 h-full rounded-lg shrink-0 ml-3"></div>
	</div>
)

export default ListSkeleton