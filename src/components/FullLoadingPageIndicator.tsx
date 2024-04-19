function FullLoadingPageIndicator() {
	return (
		<div className="w-screen h-screen absolute bg-white bg-opacity-5 top-0 left-0 items-center justify-center flex">
			<div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-sky-400 rounded-full"></div>
		</div>
	)
}

export default FullLoadingPageIndicator
