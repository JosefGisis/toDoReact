export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="md">
			<div className="navbar">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">UNTITLED TO-DO APP</a>
				</div>
				<div className="flex-none">
					<div className="avatar placeholder">
						<div className="bg-secondary text-neutral-content rounded-full w-12">
							<span className="text-3xl">JG</span>
						</div>
					</div>
					<button className="btn btn-square btn-ghost">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
							></path>
						</svg>
					</button>
				</div>
			</div>
			{/* <div className="bg-sky-950 text-slate-50 font-sans px-2.5 py-4 flex flex-col justify-between min-h-screen"> */}
			<main>{children}</main>
			{/* </div> */}
		</div>
	)
}
