import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BASE_URL = 'https://localhost:7299/api';

interface AuthPayload {
    username: string;
    password: string;
}

interface RegisterData {
    username: string;
    password: string;
    roles: string[];
}
export interface RegionPayload {
    id?: string;
    code: string;
    name: string;
    regionImageURL?: string;
}


export const loginUser = async (data: AuthPayload) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, data);
        return response.data;

    } catch (error: any) {
        console.error('Login failed:', error);
        throw error?.response?.data || { message: 'Login failed. Please try again.' };
    }
};

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data);
        return response.data;
    } catch (error: any) {
        console.error('Registration failed:', error);
        throw error?.response?.data || { message: 'Registration failed. Please try again.' };
    }
};

export const getRegions = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/region`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching Region:', error);
        throw error;
    }
};


export const createRegion = async (region: RegionPayload) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post(`${BASE_URL}/region`, region, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('res',response);
    return response.data;
  } catch (error) {
    console.error('Error creating region:', error);
    throw error;
  }
};


// Update a region
export const updateRegionById = async (region: RegionPayload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${BASE_URL}/Region/${region.id}`,
      null, // No request body
      {
        params: {
          Code: region.code,
          Name: region.name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating region:', error);
    throw error;
  }
};


export const deleteRegionById = async (id: string) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BASE_URL}/region/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting region:', error);
        throw error;
    }
};
