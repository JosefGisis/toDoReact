export default function ProfileButton() {
	return (
		<div className="dropdown dropdown-hover dropdown-end">
				<div tabIndex={0} role="button" className="btn btn-md">
					<a href="/profile">
						<p className="underline">profile</p>
						</a>
				</div>
			<ul tabIndex={0} className="dropdown-content bg-info z-[1] menu p-2 shadow bg-base-100 rounded-sm w-52">
				<li>
					<a href="/profile">profile</a>
				</li>
				<li>
					<a>logout</a>
				</li>
			</ul>
		</div>
	)
}
