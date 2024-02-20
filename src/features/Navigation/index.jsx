import Avatar from './components/Avatar'
import ThemeToggler from './components/ThemeToggler'

export default function Navigation() {
	return (
		<div className="bg-base-300 px-4 px-2 w-full">
			<div className="navbar mx-auto max-w-screen-xl">
				<div className="flex-1">
					<a href="/" className="text-2xl">
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