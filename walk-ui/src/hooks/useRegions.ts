import { useEffect, useState } from 'react';
import type { IRegion } from '../components/region/RegionInterfaces';
import {
  getRegions,
  createRegion,
  updateRegionById,
  deleteRegionById,
} from '../api/RegionApi';

export const useRegions = () => {
  const [regions, setRegions] = useState<IRegion[]>([]);

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
      setRegions((prev)=> [...prev, region]);
    } catch (error) {
      console.error('Failed to add region:', error);
    }
  };

  const updateRegion = async (region: IRegion) => {
    try {
      await updateRegionById(region);
      const updatedRegion = regions.map((reg)=> reg.id===region.id ? region : reg);
      setRegions(updatedRegion);
      
    } catch (error) {
      console.error('Failed to update region:', error);
    }
  };

  const deleteRegion = async (id: string) => {
    try {
      await deleteRegionById(id);
      const updatedRegion = regions.filter((reg)=> reg.id!= id);
      setRegions(updatedRegion);
    } catch (error) {
      console.error('Failed to delete region:', error);
    }
  };

  return {
    regions,
    fetchRegions,
    addRegion,
    updateRegion,
    deleteRegion,
  };
};
