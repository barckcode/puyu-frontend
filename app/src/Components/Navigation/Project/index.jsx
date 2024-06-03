import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


export default function Project({ projects, backendUrl, apiToken }) {
    const [projectDetails, setProjectDetails] = useState([]);

    useEffect(() => {
        const fetchProjectNames = async () => {
            const details = await Promise.all(projects.map(async (project) => {
                try {
                    const response = await axios.get(`${backendUrl}/project/${project.project_id}`, {
                        headers: {
                            Authorization: `Bearer ${apiToken}`
                        }
                    });
                    return { ...project, name: response.data.name };
                } catch (error) {
                    console.error('Error fetching project details:', error);
                    return { ...project, name: 'Error loading name' };
                }
            }));
            setProjectDetails(details);
        };

        if (projects.length > 0) {
            fetchProjectNames();
        }
    }, [projects, backendUrl, apiToken]);

    return (
        <div>
            <label htmlFor="project" className="block text-sm font-medium leading-6 text-gray-900">
                Project
            </label>
            <select
                id="project"
                name="project"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
                {projectDetails.map((project) => (
                    <option key={project.id}>{project.name}</option>
                ))}
            </select>
        </div>
    );
}

Project.propTypes = {
    projects: PropTypes.array.isRequired,
    backendUrl: PropTypes.string.isRequired,
    apiToken: PropTypes.string.isRequired,
};
