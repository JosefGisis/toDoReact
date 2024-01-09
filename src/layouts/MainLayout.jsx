import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
	return (
		<div className="bg-sky-950 text-slate-50 font-sans p-2.5">
			<Header/>
			<main>{children}</main>
			<Footer/>
		</div>
	)
}
