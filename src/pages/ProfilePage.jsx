import { useGetUserQuery } from "../api/apiSlice"

function ProfilePage() {
	const { data } = useGetUserQuery()

	return (
		<div className="max-w-screen-lg m-auto px-4">
			<div className="flex items-center my-10">
				<div className="mr-5">
					<div className="avatar placeholder">
						<div className="bg-secondary text-neutral-content rounded-full w-24">
							<span className="text-5xl">{typeof data?.data?.username === typeof 'string' && data.data.username.charAt(0)}</span>
						</div>
					</div>
				</div>

				<div>
					<p className="mb-2 text-2xl">{data?.data?.username}</p>
					<p className="text-xl">{data?.data?.email}</p>
				</div>
				
			</div>
			<hr />
		</div>
	)
}

export default ProfilePage
