import api from '@/lib/api';

// Service để lấy company của user hiện tại
export const getMyCompany = async () => {
    try {
        const response = await api.get('/companies/my-company');
        return response.data;
    } catch (error) {
        console.error('Error fetching my company:', error);
        throw error;
    }
}; 