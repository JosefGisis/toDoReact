import MainLayout from '../layouts/MainLayout'
import MainFrame from '../components/MainFrame'
import Dashboard from '../features/Dashboard/index'

function DashboardPage() {
	return (
		<MainLayout>
			<MainFrame>
				<Dashboard />
			</MainFrame>
		</MainLayout>
	)
}

export default DashboardPage
