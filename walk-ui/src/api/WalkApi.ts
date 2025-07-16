import axios from 'axios'

const BASE_URL = 'https://localhost:7299/api';

export interface IWalkPayload {
    id?: string,
    name: string,
    description: string,
    lengthInKm: number,
    walkImageURL?: string,
    difficultyId?: string,
    regionId?: string
}

interface WalkQueryParams {
    filterOn?: string;
    filterQuery?: string;
    sortBy?: string;
    isAscending?: boolean;
    pageNumber?: number;
    pageSize?: number;
}

export const getWalks = async (params: WalkQueryParams) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/walk`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

            params: {
                filterOn: params.filterOn || '',
                filterQuery: params.filterQuery || '',
                sortBy: params.sortBy || '',
                isAscending: params.isAscending ?? true,
                pageNumber: params.pageNumber ?? 1,
                pageSize: params.pageSize ?? 10,
            }
        });
        return response.data;

    } catch (error) {
        console.log('Error fetching walks data ', error);
    }
}


export const deleteWalkById = async (id: string) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BASE_URL}/walk/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error Delete Walk ', error);
    }
}

export const updateWalkById = async (walk: IWalkPayload) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `${BASE_URL}/walk/${walk.id}`,
            walk,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        console.log('response',response)
        return response.data


    } catch (error) {
        console.log('Error Updating the data', error);
        throw error;
    }
}

export const createWalk = async (walk: IWalkPayload) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/walk`, walk, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error Creating the walk' , error );
    }
}