import React from 'react'
import { Link } from 'react-router-dom'

export default function MainLayout({ children }) {
	return (
		<div>
			<div className="header">
				<nav className='flex gap-5 bg-white p-3'>
					<Link to="/" className="bg-blue-500 p-2 rounded-md">Home</Link>
					<Link to="/form" className="bg-blue-500 p-2 rounded-md">Form</Link>
				</nav>
			</div>
			{children}
			<div className="footer"></div>
		</div>
	)
}
