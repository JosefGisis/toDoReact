import MainLayout from '../layouts/MainLayout'
import MainFrame from '../components/MainFrame'
import Dashboard from '../features/Dashboard/index'
import AuthProvider from '../state-management/Token/AuthProvider'
import ActiveListProvider from '../state-management/ActiveList/ActiveListProvider'

function DashboardPage() {
	return (
		<AuthProvider>
			<ActiveListProvider>

				<MainLayout>
					<MainFrame>
						<Dashboard />
					</MainFrame>
				</MainLayout>
				
			</ActiveListProvider>
		</AuthProvider>
	)
}

export default DashboardPage
