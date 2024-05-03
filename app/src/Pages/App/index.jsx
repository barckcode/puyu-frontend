import { useRoutes, BrowserRouter } from "react-router-dom"
import Home from '../Home'
import NotFound from '../NotFound'
import Login from '../Login'
import Registration from '../Registration'


const AppRoutes = () => {
	let routes = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/login', element: <Login /> },
		{ path: '/registration', element: <Registration /> },
		{ path: '/*', element: <NotFound /> },
	])

	return routes
}


export default function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}
