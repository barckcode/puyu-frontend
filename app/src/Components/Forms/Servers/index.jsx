import PropTypes from "prop-types";
import { FaArrowLeft } from 'react-icons/fa';


export default function FormServers({ serverName, handleServerNameChange, errorMessage, regions, distributions, instanceTypes, storage, selectedRegion, setSelectedRegion, selectedDistribution, setSelectedDistribution, selectedInstanceType, setSelectedInstanceType, selectedStorage, setSelectedStorage, openModal }) {
    return (
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
    )
}

FormServers.propTypes = {
    serverName: PropTypes.string.isRequired,
    handleServerNameChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    regions: PropTypes.array.isRequired,
    distributions: PropTypes.array.isRequired,
    instanceTypes: PropTypes.array.isRequired,
    storage: PropTypes.array.isRequired,
    selectedRegion: PropTypes.object,
    setSelectedRegion: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    selectedDistribution: PropTypes.object,
    setSelectedDistribution: PropTypes.func.isRequired,
    selectedInstanceType: PropTypes.object,
    setSelectedInstanceType: PropTypes.func.isRequired,
    selectedStorage: PropTypes.object,
    setSelectedStorage: PropTypes.func.isRequired
}
