function ProfilePage() {
	return (
		<div className="max-w-screen-lg m-auto px-4">
			<div className="flex items-center my-10">
				<div className="mr-5">
					<div className="avatar placeholder">
						<div className="bg-secondary text-neutral-content rounded-full w-24">
							<span className="text-5xl">{}</span>
						</div>
					</div>
				</div>

				<div>
					<p className="mb-2 text-2xl">{}</p>
					<p className="text-xl">{}</p>
				</div>
				
			</div>
			<hr />
		</div>
	)
}

export default ProfilePage
