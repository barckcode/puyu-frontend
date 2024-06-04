import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaAws } from 'react-icons/fa';
import { SiOvh } from 'react-icons/si';

export default function CloudServices({ backendUrl, session }) {
    const [cloudServices, setCloudServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

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

    const getIcon = (name) => {
        switch (name) {
            case 'AWS':
                return <FaAws />;
            case 'OVH':
                return <SiOvh />;
            default:
                return null; // default icon
        }
    };

    const handleServiceClick = (name) => {
        setSelectedService(name);
    };

    return (
        <>
            <h2 className="text-center p-8 text-2xl font-bold"> ☁️ Cloud Provider</h2>
            <div className="grid grid-cols-2 gap-4">
                {cloudServices.map(service => (
                    <div
                        key={service.id}
                        className={`p-4 border rounded-lg shadow cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 ${selectedService === service.name ? 'border-4 border-indigo-500' : 'border'}`}
                        onClick={() => handleServiceClick(service.name)}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            {getIcon(service.name)}
                            <span>{service.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            {selectedService && (
                <h1 className="text-center mt-4">Has elegido {selectedService}</h1>
            )}
        </>
    );
}

CloudServices.propTypes = {
    backendUrl: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
};
