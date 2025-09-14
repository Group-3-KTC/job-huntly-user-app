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

// Service để tạo company mới
export const createCompany = async (companyData) => {
    try {
        const response = await api.post('/companies/add', companyData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

// Service để cập nhật company
export const updateCompany = async (companyId, companyData) => {
    try {
        const response = await api.put(`/companies/${companyId}`, companyData);
        return response.data;
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
}; 