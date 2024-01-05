import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Form from './form.jsx'
import ToDoLists from './features/ToDoLists'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import MainLayout from './layouts/MainLayout.jsx'

const router = createBrowserRouter([
	{ path: '/', element: <MainLayout><ToDoLists /></MainLayout> },
	{ path: '/form', element: <MainLayout><Form /></MainLayout>  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</React.StrictMode>
)
