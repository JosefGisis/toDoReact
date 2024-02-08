import ListProvider from '../state-management/List/ListProvider'
import Lists from '../features/Lists'
import NewList from '../features/NewList'
import SectionFrame from '../components/SectionFrame'
import ActiveList from '../features/ActiveList'
import NewToDoForm from '../features/NewToDo/components/NewToDoForm'
import ToDos from '../features/ToDos'
import Avatar from '../components/Avatar'
import ThemeToggler from '../components/ThemeToggler'
import ProfileButton from '../components/ProfileButton'
import ColorPalette from '../components/ColorPalette'

function DashboardPage() {
	return (
		<div className='max-w-screen-lg m-auto overflow-hidden px-4 pt-24 '>
			{/* navbar component */}
			<div className='bg-base-300 fixed px-4 py-2 left-0 top-0 w-[100%] z-[2]'>
				<div className='navbar mx-auto max-w-screen-lg'>
					<div className='flex-1'>
						<a href='/' className='text-xl'>
							UNTITLED TO-DO APP
						</a>
					</div>

					<div className='flex-none'>
						<div className='mr-6'>
							<ThemeToggler />
						</div>

						<div className='mr-1'>
							<Avatar />
						</div>

						<div className=''>
							<ProfileButton />
						</div>
					</div>
				</div>
			</div>

			<ListProvider>
				<div className='flex flex-row justify-between'>

					<div className='w-[22%]'>
						<Lists />
						<NewList />
					</div>
					<div className='w-[75%]'>
						{/* <SectionFrame> */}
							<ActiveList />
							<NewToDoForm />
							<ToDos />
						{/* </SectionFrame> */}
					</div>
				</div>
			</ListProvider>

			{/* <ColorPalette /> */}

			<footer className='footer footer-center p-4 bg-base-300 text-base-content'>
					<p>Designed by Josef Gisis - 2024</p>
			</footer>
			<div className='flex items-center bg-info h-10 fixed bottom-0 right-[7%] px-4 rounded-t-lg'>
				<p className='text-center text-base-300'>
				Designed by Josef Gisis - 2024
				</p>

			</div>
		</div>
	)
}

export default DashboardPage
