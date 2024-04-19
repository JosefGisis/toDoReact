export default function FullPageLoadingIndicator() {
	return (
		<div className="w-screen h-screen absolute bg-white bg-opacity-5 top-0 left-0 items-center justify-center flex">
			<div className=" flex flex-col items-center">
				<div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-sky-400 rounded-full mb-4"></div>
				<div className="text-xl">Getting your stuff...</div>
			</div>
		</div>
	)
}
