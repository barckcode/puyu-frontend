import { useRoutes, BrowserRouter } from "react-router-dom"
import Home from '../Home'
import Login from '../Login'
import NotFound from '../NotFound'


const AppRoutes = () => {
	let routes = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/login', element: <Login /> },
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
