import MainLayout from '../layouts/MainLayout'
import MainFrame from '../components/MainFrame'
import Dashboard from '../features/Dashboard/index'
import ActiveListProvider from '../state-management/ActiveList/ActiveListProvider'

function DashboardPage() {
	return (
		
		<MainLayout>
					<MainFrame>
					<ActiveListProvider>
						<Dashboard />
			</ActiveListProvider>
					</MainFrame>
				</MainLayout>
				
	)
}

export default DashboardPage
