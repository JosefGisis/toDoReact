import ListProvider from '../state-management/List/ListProvider'
import Lists from '../features/Lists'
import NewList from '../features/NewList'
import ActiveList from '../features/ActiveList'
import NewToDoForm from '../features/NewToDo/components/NewToDoForm'
import ToDos from '../features/ToDos'
import Avatar from '../components/Avatar'
import ThemeToggler from '../components/ThemeToggler'
import ProfileButton from '../components/ProfileButton'

function DashboardPage() {
	return (
		<div className="max-w-screen-lg m-auto px-4">
			{/* navbar component
			<div className="bg-base-300 fixed px-4 py-2 left-0 top-0 w-[100%] z-[2]">
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

						<div className="mr-1">
							<Avatar />
						</div>

						<div className="">
							<ProfileButton />
						</div>
					</div>
				</div>
			</div> */}

			<ListProvider>
				<div className="flex flex-row justify-between">
					<div className="w-[25%] flex flex-col justify-between overflow-y-scroll h-screen">
						<Lists />
						<div className="sticky bottom-0 bg-base-100 z-[10] py-6">
							<NewList />
						</div>
					</div>

					<div className="w-[73%] flex flex-col justify-between overflow-y-scroll h-screen">
						<div>
							<div className="sticky top-0 bg-base-100 z-[10] py-6">
								<ActiveList />
							</div>
							<div>
								<ToDos />
							</div>
						</div>
						<div className="sticky bottom-0 bg-base-100 z-[10] py-6">
							<NewToDoForm />
						</div>
					</div>
				</div>
			</ListProvider>
		</div>
	)
}

export default DashboardPage
