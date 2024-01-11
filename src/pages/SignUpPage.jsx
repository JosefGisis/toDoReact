import SignUp from '../features/SignUp'
import MainLayout from '../layouts/MainLayout'

function SignUpPage() {
	return (
		<MainLayout>
			<div className="h-screen w-screen bg-sky-950 font-sans text-slate-50">
				<SignUp />
			</div>
		</MainLayout>
	)
}

export default SignUpPage
