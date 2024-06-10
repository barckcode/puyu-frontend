import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaAws } from 'react-icons/fa';
import { SiOvh } from 'react-icons/si';

export default function CloudServices({ backendUrl, session }) {
    const [cloudServices, setCloudServices] = useState([]);
    const [selectedCloud, setSelectedCloud] = useState(null);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [distributions, setDistributions] = useState([]);
    const [instanceTypes, setInstanceTypes] = useState([]);

    useEffect(() => {
        const fetchCloudServices = async () => {
            try {
                const response = await axios.get(`${backendUrl}/cloud`, {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`
                    }
                });
                setCloudServices(response.data);
            } catch (error) {
                console.error('Error fetching cloud services:', error);
                setCloudServices([]);
            }
        };

        fetchCloudServices();
    }, [backendUrl, session]);

    useEffect(() => {
        if (selectedCloud) {
            const fetchRegions = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/cloud/${selectedCloud.id}/regions`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    });
                    setRegions(response.data);
                    const europeRegion = response.data.find(region => region.name.includes("Europe"));
                    setSelectedRegion(europeRegion ? europeRegion.id : response.data[0]?.id);
                } catch (error) {
                    console.error('Error fetching regions:', error);
                    setRegions([]);
                }
            };

            fetchRegions();
        }
    }, [selectedCloud, backendUrl, session]);

    useEffect(() => {
        if (selectedRegion) {
            const fetchDistributions = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/aws/region/${selectedRegion}/amis`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    });
                    setDistributions(response.data);
                } catch (error) {
                    console.error('Error fetching distributions:', error);
                    setDistributions([]);
                }
            };

            fetchDistributions();
        }
    }, [selectedRegion, backendUrl, session]);

    useEffect(() => {
        if (selectedCloud) {
            const fetchInstanceTypes = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/cloud/${selectedCloud.id}/instance_types`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    });
                    setInstanceTypes(response.data);
                } catch (error) {
                    console.error('Error fetching instance types:', error);
                    setRegions([]);
                }
            };

            fetchInstanceTypes();
        }
    }, [selectedCloud, backendUrl, session]);

    return (
        <>
            <h2 className="text-center p-8 text-2xl font-bold"> ☁️ Cloud Providers</h2>
            <div className="grid grid-cols-2 gap-4">
                {cloudServices.map(service => (
                    <div
                        key={service.id}
                        className={`p-4 border rounded-lg shadow cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 ${selectedCloud === service ? 'border-4 border-indigo-500' : 'border'}`}
                        onClick={() => setSelectedCloud(service)}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            {service.name === 'AWS' ? <FaAws /> : <SiOvh />}
                            <span>{service.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCloud && regions.length > 0 ? (
                <form className="mt-8 p-8 flex flex-col items-center justify-center text-indigo-900">
                    <label htmlFor="server_name" className="p-2 text-center text-indigo-50">Server Name</label>
                    <input
                        className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                        type="text"
                        name="server_name"
                        id="server_name"
                        placeholder="Test"
                    />
                    <label htmlFor="region" className="mt-4 p-2 text-center text-indigo-50">Region</label>
                    <select
                        className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        value={selectedRegion}
                    >
                        {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                        ))}
                    </select>
                    <label htmlFor="distribution" className="mt-4 p-2 text-center text-indigo-50">Linux Distribution</label>
                    <select className="w-1/2 p-2 border border-gray-300 rounded-md text-center">
                        {distributions.map(distribution => (
                            <option key={distribution.id} value={distribution.id}>{distribution.distribution} {distribution.version}</option>
                        ))}
                    </select>
                    <label htmlFor="instance_type" className="mt-4 p-2 text-center text-indigo-50">Instance Type</label>
                    <select className="w-1/2 p-2 border border-gray-300 rounded-md text-center">
                        {instanceTypes.map(instanceType => (
                            <option key={instanceType.id} value={instanceType.id}>{instanceType.cpu} / {instanceType.memory}</option>
                        ))}
                    </select>
                </form>
            ) : selectedCloud ? (
                <p>This cloud provider will be added soon.</p>
            ) : null}
        </>
    );
}

CloudServices.propTypes = {
    backendUrl: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
};
