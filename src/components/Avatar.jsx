function Avatar() {
	return (
		<>
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
		</>
	)
}

export default Avatar
