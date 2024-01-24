import MainLayout from '../layouts/MainLayout'
import MainFrame from '../components/MainFrame'
import Dashboard from '../features/Dashboard/index'
import ActiveListProvider from '../state-management/ActiveList/ActiveListProvider'

function DashboardPage() {
	return (
			<ActiveListProvider>

				<MainLayout>
					<MainFrame>
						<Dashboard />
					</MainFrame>
				</MainLayout>
				
			</ActiveListProvider>
	)
}

export default DashboardPage
