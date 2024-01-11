import Authentication from "../features/Authentication"
import MainLayout from "../layouts/MainLayout"

function Login() {
  return (
    <MainLayout>
        <div className="h-screen w-screen bg-sky-950 font-sans text-slate-50">
            <Authentication />
        </div>
    </MainLayout>
  )
}

export default Login