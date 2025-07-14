import { useEffect, useState } from 'react';
import type { IRegion } from '../components/region/RegionInterfaces';
import {
  getRegions,
  createRegion,
  updateRegionById,
  deleteRegionById,
} from '../api/api';

export const useRegions = () => {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);

  const fetchRegions = async () => {
    try {
      const data = await getRegions();
      setRegions(data);
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const addRegion = async (region: IRegion) => {
    try {
      await createRegion(region);
      await fetchRegions();
    } catch (error) {
      console.error('Failed to add region:', error);
    }
  };

  const updateRegion = async (region: IRegion) => {
    try {
      await updateRegionById(region);
      await fetchRegions();
    } catch (error) {
      console.error('Failed to update region:', error);
    }
  };

  const deleteRegion = async (id: string) => {
    try {
      await deleteRegionById(id);
      await fetchRegions();
    } catch (error) {
      console.error('Failed to delete region:', error);
    }
  };

  return {
    regions,
    selectedRegion,
    setSelectedRegion,
    fetchRegions,
    addRegion,
    updateRegion,
    deleteRegion,
  };
};
