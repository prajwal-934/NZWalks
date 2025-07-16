export interface IWalk {
  id?: string;
  name: string;
  description: string;
  lengthInKm: number;
  walkImageURL?: string;
  regionId: string;
  difficultyId: string;
}
