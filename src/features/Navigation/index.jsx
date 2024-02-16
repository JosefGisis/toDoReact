import Avatar from './components/Avatar'
import ThemeToggler from './components/ThemeToggler'

function Navigation() {
	return (
		<div className="bg-base-300 fixed px-4 py-2 left-0 top-0 w-[100%] z-[30]">
			<div className="navbar mx-auto max-w-screen-lg">
				<div className="flex-1">
					<a href="/" className="text-xl">
						UNTITLED TO-DO APP
					</a>
				</div>

				<div className="flex-none">
					<div className="mr-6">
						<ThemeToggler />
					</div>

					<div className="">
						<Avatar />
					</div>
				</div>
			</div>
		</div>
	)
}
export default Navigation
