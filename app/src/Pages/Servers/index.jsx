import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { FaAws, FaArrowLeft } from 'react-icons/fa';
import { SiOvh } from 'react-icons/si';

export default function CloudServices({ backendUrl, session }) {
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

    const handleServerNameChange = (event) => {
        setServerName(event.target.value);
        if (event.target.value.trim() === '') {
            setErrorMessage('Server name cannot be empty.');
        } else {
            setErrorMessage('');
        }
    };

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
                    setSelectedRegion(europeRegion || response.data[0]);
                } catch (error) {
                    console.error('Error fetching regions:', error);
                    setRegions([]);
                }
            };

            fetchRegions();
        }
    }, [selectedCloud, backendUrl, session]); // Eliminar selectedRegion de las dependencias para evitar re-ejecuciones innecesarias

    useEffect(() => {
        if (selectedRegion) {
            const fetchDistributions = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/region/${selectedRegion.id}/amis`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    });
                    setDistributions(response.data);
                    if (response.data.length > 0) {
                        setSelectedDistribution(response.data[0]);
                    }
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
                    const response = await axios.get(`${backendUrl}/cloud/${selectedCloud.id}/instance-types`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    });
                    setInstanceTypes(response.data);
                    if (response.data.length > 0) {
                        setSelectedInstanceType(response.data[0]);
                    }
                } catch (error) {
                    console.error('Error fetching instance types:', error);
                    setRegions([]);
                }
            };

            fetchInstanceTypes();
        }
    }, [selectedCloud, backendUrl, session]);

    useEffect(() => {
        if (selectedCloud) {
            const fetchStorage = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/cloud/${selectedCloud.id}/storage`, {
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    });
                    setStorage(response.data);
                    if (response.data.length > 0) {
                        setSelectedStorage(response.data[0]);
                    }
                } catch (error) {
                    console.error('Error fetching storage:', error);
                    setStorage([]);
                }
            };

            fetchStorage();
        }
    }, [selectedCloud, backendUrl, session]);

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
                <form className="mt-8 p-8 flex flex-col items-center justify-center text-indigo-900">
                    <label htmlFor="server_name" className="p-2 text-center text-indigo-50">Server Name</label>
                    <input
                        className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                        type="text"
                        name="server_name"
                        id="server_name"
                        placeholder="Test"
                        value={serverName}
                        onChange={handleServerNameChange}
                    />
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <label htmlFor="region" className="mt-4 p-2 text-center text-indigo-50">Region</label>
                    <select
                        className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                        onChange={(e) => {
                            const selectedId = parseInt(e.target.value, 10);
                            const foundRegion = regions.find(region => region.id === selectedId);
                            setSelectedRegion(foundRegion);
                        }}
                        value={selectedRegion ? selectedRegion.id : ''}
                    >
                        {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                        ))}
                    </select>
                    <label htmlFor="distribution" className="mt-4 p-2 text-center text-indigo-50">Linux Distribution</label>
                    <select
                        className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                        onChange={(e) => {
                            const selectedId = parseInt(e.target.value, 10);
                            const foundDistribution = distributions.find(distribution => distribution.id === selectedId);
                            setSelectedDistribution(foundDistribution);
                        }}
                        value={selectedDistribution ? selectedDistribution.id : ''}
                    >
                        {distributions.map(distribution => (
                            <option key={distribution.id} value={distribution.id}>{distribution.distribution} {distribution.version}</option>
                        ))}
                    </select>
                    <label htmlFor="instance_type" className="mt-4 p-2 text-center text-indigo-50">Instance Type</label>
                    <select
                        className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                        onChange={(e) => {
                            const selectedId = parseInt(e.target.value, 10);
                            const foundInstanceType = instanceTypes.find(instanceType => instanceType.id === selectedId);
                            setSelectedInstanceType(foundInstanceType);
                        }}
                        value={selectedInstanceType ? selectedInstanceType.id : ''}
                    >
                        {instanceTypes.map(instanceType => (
                            <option key={instanceType.id} value={instanceType.id}>{instanceType.cpu} / {instanceType.memory}</option>
                        ))}
                    </select>
                    <label htmlFor="storage" className="mt-4 p-2 text-center text-indigo-50">Storage</label>
                    <select
                        className="w-1/2 p-2 border border-gray-300 rounded-md text-center"
                        onChange={(e) => {
                            const selectedId = parseInt(e.target.value, 10);
                            const foundStorage = storage.find(storage => storage.id === selectedId);
                            setSelectedStorage(foundStorage);
                        }}
                        value={selectedStorage ? selectedStorage.id : ''}
                    >
                        {storage.map(storage => (
                            <option key={storage.id} value={storage.id}>{storage.size} GiB</option>
                        ))}
                    </select>
                    <div className="mt-8 flex justify-between w-1/2">
                        <button type="button" className="inline-flex justify-center items-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-indigo-50 shadow-sm hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"><FaArrowLeft /></button>
                        <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-indigo-50 shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2" onClick={openModal}>Summary</button>
                    </div>
                </form>
            ) : selectedCloud ? (
                <p>This cloud provider will be added soon.</p>
            ) : null}
            <Transition show={modalIsOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 text-indigo-900" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-indigo-200 bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-indigo-50 px-4 pt-5 pb-4 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <Dialog.Title as="h3" className="text-xl font-bold p-4 leading-6 text-indigo-900 text-center">
                                        Server Summary
                                    </Dialog.Title>
                                    <div className="mt-2 text-lg">
                                        <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                            <h4 className="w-1/2 font-medium">Cloud:</h4>
                                            <p className="w-1/2">{selectedCloud?.name || 'Select a cloud'}</p>
                                        </div>
                                        <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                            <h4 className="w-1/2 font-medium">Name:</h4>
                                            <p className="w-1/2">{serverName}</p>
                                        </div>
                                        <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                            <h4 className="w-1/2 font-medium">Region:</h4>
                                            <p className="w-1/2">{selectedRegion?.name || 'Select a region'}</p>
                                        </div>
                                        <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                            <h4 className="w-1/2 font-medium">Distribution:</h4>
                                            <p className="w-1/2">{selectedDistribution?.distribution} {selectedDistribution?.version}</p>
                                        </div>
                                        <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                            <h4 className="w-1/2 font-medium">Instance Type:</h4>
                                            <p className="w-1/2">{selectedInstanceType?.cpu} / {selectedInstanceType?.memory}</p>
                                        </div>
                                        <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                            <h4 className="w-1/2 font-medium">Storage:</h4>
                                            <p className="w-1/2">{selectedStorage?.size} GiB</p>
                                        </div>
                                    </div>
                                    <div className="w-full mt-4 flex justify-evenly">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-indigo-50 shadow-sm hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                            // onClick={}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

CloudServices.propTypes = {
    backendUrl: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
};
