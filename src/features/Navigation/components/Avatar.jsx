import { useMemo } from 'react'
import { useUserContext } from '../../../hooks/useUserContext'
import { useAuth } from '../../../hooks/useAuth'

export default function Avatar() {
	const { user } = useUserContext()
	const { logout } = useAuth()

	function getAvatarColor() {
		const currentHour = new Date().getHours()
		if (currentHour < 24 && currentHour >= 18) return 'bg-secondary text-secondary-content'
		if (currentHour < 18 && currentHour >= 12) return 'bg-primary text-primary-content'
		if (currentHour < 12 && currentHour >= 6) return 'bg-accent text-accent-content'
		return 'bg-success text-success-content'
	}

	const avatarColor = useMemo(() => getAvatarColor(), [])
	const initial = useMemo(() => (user?.username ? user.username.charAt(0) : ''), [user])

	return (
		<div className="dropdown dropdown-hover dropdown-end">
			<div tabIndex={0} role="button" className="py-1">
				<a href="/profile">
					<div className="avatar placeholder">
						<div className={'text-neutral-content rounded-full w-12 ' + avatarColor}>
							<span className="text-3xl">{initial}</span>
						</div>
					</div>
				</a>
			</div>

			<ul tabIndex={0} className={"dropdown-content z-[1] menu p-2 shadow rounded-lg w-52 bg-neutral"}>
				<li>
					<a href="/profile">profile</a>
				</li>
				<li onClick={logout}>
					<a>logout</a>
				</li>
			</ul>
		</div>
	)
}
