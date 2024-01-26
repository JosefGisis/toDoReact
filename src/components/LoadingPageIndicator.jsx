export default function LoadingPageIndicator() {
	return (
		<div className="w-[100%] h-[35rem] flex flex-col items-center content-center justify-center">
			<div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-sky-400 rounded-full"></div>
			<p className="text-xl mt-5">Getting your stuff...</p>
		</div>
	)
}