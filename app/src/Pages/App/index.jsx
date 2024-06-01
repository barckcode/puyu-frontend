import { useRoutes } from "react-router-dom"
import { useState } from 'react'
import logo from '/assets/logo.png'
import Home from '../Home'
import NotFound from '../NotFound'
import Login from '../Login'
import Sidebar from '../../Components/Navigation/Sidebar'


const AppRoutes = () => {
	let routes = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/login', element: <Login /> },
		{ path: '/*', element: <NotFound /> },
	])

	return routes
}


export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	return (
		<>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} helmcode_logo={logo} />
			<main className="py-10 lg:pl-72">
				<div className="px-4 sm:px-6 lg:px-8">
					<AppRoutes />
				</div>
			</main>
		</>
	)
}
