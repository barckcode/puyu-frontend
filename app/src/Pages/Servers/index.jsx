import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaAws } from 'react-icons/fa';
import { SiOvh } from 'react-icons/si';
import { getCloudServices, getRegions, getInstanceTypes, getStorage } from '../../services/api/cloud';
import { getAmis } from '../../services/api/region';
import FormServers from '../../Components/Forms/Servers';
import ServersModal from '../../Components/Modals/Servers';

export default function CloudServices({ backendUrl, session, selectedProject }) {
    const [cloudServices, setCloudServices] = useState([]);
    const [selectedCloud, setSelectedCloud] = useState(null);
    const [serverName, setServerName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [distributions, setDistributions] = useState([]);
    const [selectedDistribution, setSelectedDistribution] = useState(null);
    const [instanceTypes, setInstanceTypes] = useState([]);
    const [selectedInstanceType, setSelectedInstanceType] = useState(null);
    const [storage, setStorage] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const services = await getCloudServices(backendUrl, session);
            setCloudServices(services);
        };
        fetchData();
    }, [backendUrl, session]);

    useEffect(() => {
        if (selectedCloud) {
            const fetchRegions = async () => {
                const regionsData = await getRegions(backendUrl, session, selectedCloud.id);
                setRegions(regionsData);
                const europeRegion = regionsData.find(region => region.name.includes("Europe"));
                setSelectedRegion(europeRegion || regionsData[0]);
            };
            fetchRegions();
        }
    }, [selectedCloud, backendUrl, session]);

    useEffect(() => {
        if (selectedCloud) {
            const fetchInstanceTypes = async () => {
                const instanceTypesData = await getInstanceTypes(backendUrl, session, selectedCloud.id);
                setInstanceTypes(instanceTypesData);
                if (instanceTypesData.length > 0) {
                    setSelectedInstanceType(instanceTypesData[0]);
                }
            };
            fetchInstanceTypes();
        }
    }, [selectedCloud, backendUrl, session]);

    useEffect(() => {
        if (selectedCloud) {
            const fetchStorage = async () => {
                const storageData = await getStorage(backendUrl, session, selectedCloud.id);
                setStorage(storageData);
                if (storageData.length > 0) {
                    setSelectedStorage(storageData[0]);
                }
            };
            fetchStorage();
        }
    }, [selectedCloud, backendUrl, session]);

    useEffect(() => {
        if (selectedRegion) {
            const fetchAmis = async () => {
                const amisData = await getAmis(backendUrl, session, selectedRegion.id);
                setDistributions(amisData);
                if (amisData.length > 0) {
                    setSelectedDistribution(amisData[0]);
                }
            };
            fetchAmis();
        }
    }, [selectedRegion, backendUrl, session]);

    const handleServerNameChange = (event) => {
        setServerName(event.target.value);
        if (event.target.value.trim() === '') {
            setErrorMessage('Server name cannot be empty.');
        } else {
            setErrorMessage('');
        }
    };

    const openModal = () => {
        if (serverName.trim() === '') {
            setErrorMessage('Server name cannot be empty.');
        } else {
            setModalIsOpen(true);
            setErrorMessage('');
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

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
                <FormServers
                    serverName={serverName}
                    handleServerNameChange={handleServerNameChange}
                    errorMessage={errorMessage}
                    regions={regions}
                    distributions={distributions}
                    instanceTypes={instanceTypes}
                    storage={storage}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedDistribution={selectedDistribution}
                    setSelectedDistribution={setSelectedDistribution}
                    selectedInstanceType={selectedInstanceType}
                    setSelectedInstanceType={setSelectedInstanceType}
                    selectedStorage={selectedStorage}
                    setSelectedStorage={setSelectedStorage}
                    openModal={openModal}
                />
            ) : selectedCloud ? (
                <p>This cloud provider will be added soon.</p>
            ) : null}
            <ServersModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                selectedCloud={selectedCloud}
                selectedRegion={selectedRegion}
                selectedDistribution={selectedDistribution}
                selectedInstanceType={selectedInstanceType}
                selectedStorage={selectedStorage}
                serverName={serverName}
                selectedProject={selectedProject}
            />
        </>
    );
}

CloudServices.propTypes = {
    backendUrl: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
    selectedProject: PropTypes.object.isRequired,
};
