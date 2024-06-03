import { useRoutes } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import logo from '/assets/logo.png'
import Home from '../Home'
import NotFound from '../NotFound'
import Login from '../Login'
import Sidebar from '../../Components/Navigation/Sidebar'
import Spinner from "../../Components/Core/Spinner";


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
	const [projectName, setProjectName] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const fetchProjects = async () => {
		if (!session) return;
		setIsLoading(true);
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
		} finally {
			setIsLoading(false);
		}
	};

    useEffect(() => {
        fetchProjects();
    }, [session, supabase, setSession]);

    const handleInputChange = (e) => {
        setProjectName(e.target.value);
		if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!projectName.trim()) {
            setError('Project name cannot be empty');
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/project`, {
                name: projectName
            }, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });
            if (response.status === 201) {
				setProjectName('');
				fetchProjects();
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

	return (
		<>
            {
				isLoading ? (
					<div className="flex items-center justify-center min-h-screen">
						<Spinner />
					</div>
				) : projects.length > 0 ? (
                <>
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} helmcodeLogo={logo} projects={projects} backendUrl={BACKEND_URL} apiToken={session.access_token}/>
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
				<div className="max-w-screen-lg mx-auto pt-40 text-center">
					<label htmlFor="name" className="ml-px block pl-4 text-4xl font-medium leading-6 text-gray-300">
						Create a project
					</label>
					<form className="mt-16 w-2/4 mx-auto" onSubmit={handleSubmit}>
						<input
							type="text"
							name="project_name"
							id="project_name"
							value={projectName}
							onChange={handleInputChange}
							className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Production"
						/>
						<button
							type="submit"
							className="mt-16 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
						>
							Create
						</button>
						{error && <div className="mt-4 text-red-400">{error}</div>}
					</form>
				</div>
            )}
		</>
	)
}

App.propTypes = {
	session: PropTypes.object,
	supabase: PropTypes.object,
	setSession: PropTypes.func,
}
