import { useAuth } from '../hooks/useAuth'
import { useUserContext } from '../hooks/useUserContext'

function ProfilePage() {
	const { user, dispatch } = useUserContext()
	const { logout } = useAuth()

	return (
		<div className="max-w-screen-lg m-auto px-4">
			<div className="flex items-center my-10">
				<div className="mr-5">
					<div className="avatar placeholder">
						<div className="bg-secondary text-neutral-content rounded-full w-24">
							<span className="text-5xl">{user?.username?.charAt(0)}</span>
						</div>
					</div>
				</div>

				<div>
					<p className="mb-2 text-2xl">{user?.username}</p>
					<p className="text-xl">{user?.email}</p>
				</div>
				
			</div>
			<hr />
		</div>
	)
}

export default ProfilePage
