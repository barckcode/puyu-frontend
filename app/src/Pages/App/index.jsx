import { useRoutes } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import logo from '/assets/logo.png'
import Home from '../Home'
import NotFound from '../NotFound'
import Login from '../Login'
import Sidebar from '../../Components/Navigation/Sidebar'


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const AppRoutes = ({ session }) => {
	let routes = useRoutes([
		{ path: '/', element: <Home session={session} /> },
		{ path: '/login', element: <Login /> },
		{ path: '/*', element: <NotFound /> },
	])

	return routes
}

AppRoutes.propTypes = {
	session: PropTypes.object,
}


export default function App({ session, supabase, setSession }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (session) {
            const fetchData = async () => {
                try {
                    const sub = session.user.id;
                    const response = await axios.get(`${BACKEND_URL}/projects/user?sub=${sub}`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    });
					if (response.status === 200) {
                        setProjects(response.data);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        const { data: { session } } = await supabase.auth.refreshSession();
                        setSession(session);
                    } else {
						setProjects([]);
                    }
                }
            };
            fetchData();
        }
    }, [session, supabase, setSession]);

	return (
		<>
            {projects.length > 0 ? (
                <>
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} helmcode_logo={logo} />
                    <main className="py-10 lg:pl-72">
                        <div className="px-4 sm:px-6 lg:px-8">
							<AppRoutes session={session} />
                            {projects.map(project => (
                                <div key={project.id}>
                                    <p>Proyecto ID: {project.project_id}</p>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
            ) : (
                <h1>No tienes proyectos</h1>
            )}
		</>
	)
}

App.propTypes = {
	session: PropTypes.object,
	supabase: PropTypes.object,
	setSession: PropTypes.func,
}
