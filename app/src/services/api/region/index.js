import axios from 'axios';


const getAmis = async (backendUrl, session, regionId) => {
    try {
        const response = await axios.get(`${backendUrl}/region/${regionId}/amis`, {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching amis:', error);
        return [];
    }
}

export { getAmis };
