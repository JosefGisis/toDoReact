import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
	return (
		<div className="bg-sky-950 text-slate-50 font-sans p-2.5 flex flex-col justify-between min-h-screen">
			
			<Header />
			
			<div className="m-auto my-10">
				<main>{children}</main>
			</div>
			
			<Footer />
		
		</div>
	)
}
