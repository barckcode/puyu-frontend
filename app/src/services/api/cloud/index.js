import axios from 'axios';


const getCloudServices = async (backendUrl, session) => {
    try {
        const response = await axios.get(`${backendUrl}/cloud`, {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cloud services:', error);
        return [];
    }
};

const getRegions = async (backendUrl, session, cloudId) => {
    try {
        const response = await axios.get(`${backendUrl}/cloud/${cloudId}/regions`, {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching regions:', error);
        return [];
    }
};

const getInstanceTypes = async (backendUrl, session, cloudId) => {
    try {
        const response = await axios.get(`${backendUrl}/cloud/${cloudId}/instance-types`, {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching instance types:', error);
        return [];
    }
};

const getStorage = async (backendUrl, session, cloudId) => {
    try {
        const response = await axios.get(`${backendUrl}/cloud/${cloudId}/storage`, {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching storage:', error);
        return [];
    }
}

export { getCloudServices, getRegions, getInstanceTypes, getStorage };
