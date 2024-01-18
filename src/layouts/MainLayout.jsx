import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
	return (
		<div className="bg-sky-950 text-slate-50 font-sans px-2.5 py-4 flex flex-col justify-between min-h-screen">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	)
}
