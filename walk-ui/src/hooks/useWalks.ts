import { useEffect, useState } from 'react';
import {
  getWalks,
  createWalk,
  updateWalkById,
  deleteWalkById,
} from '../api/WalkApi';
import type { IWalk } from '../components/walk/WalkInterface';

interface WalkQueryParams {
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export const useWalks = (initialParams?: WalkQueryParams) => {
  const [walks, setWalks] = useState<IWalk[]>([]);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<WalkQueryParams>({
    filterOn: '',
    filterQuery: '',
    sortBy: '',
    isAscending: true,
    pageNumber: 1,
    pageSize: 10,
    ...initialParams,
  });

  const fetchWalks = async () => {
    try {
      setLoading(true);
      const data = await getWalks(queryParams);
      setWalks(data);
    } catch (error) {
      console.error('Failed to fetch walks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalks();
  }, [queryParams]);

  const addWalk = async (walk: IWalk) => {
    try {
      await createWalk(walk);
      fetchWalks();
    } catch (error) {
      console.error('Failed to add walk:', error);
    }
  };

  const updateWalk = async (walk: IWalk) => {
    try {
      await updateWalkById(walk);
      console.log('new walk',walk)
      fetchWalks();
    } catch (error) {
      console.error('Failed to update walk:', error);
    }
  };

  const deleteWalk = async (id: string) => {
    try {
      await deleteWalkById(id);
      fetchWalks();
    } catch (error) {
      console.error('Failed to delete walk:', error);
    }
  };

  return {
    walks,
    loading,
    fetchWalks,
    addWalk,
    updateWalk,
    deleteWalk,
    queryParams,
    setQueryParams,
  };
};
