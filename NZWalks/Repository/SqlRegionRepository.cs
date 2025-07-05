using Microsoft.EntityFrameworkCore;
using NZWalks.Data;
using NZWalks.Models.Domain;

namespace NZWalks.Repository
{
    public class SqlRegionRepository : IRegionRepository
    {
        NZWalksDBContext _dbContext;
        public SqlRegionRepository(NZWalksDBContext nZWalksDBContext)
        {
            _dbContext = nZWalksDBContext;
        }
        public async Task<Region> CreateAsync(Region region)
        {
            await _dbContext.Regions.AddAsync(region);
            await _dbContext.SaveChangesAsync();
            return region;
        }

        public async  Task<Region?> DeleteAsync(Guid id)
        {
            var region = await _dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (region == null) return null;
            _dbContext.Regions.Remove(region);
            await _dbContext.SaveChangesAsync();
            return region;

        }

        public async Task<List<Region>> GetAllAsync()
        {
            var regions = await _dbContext.Regions.ToListAsync();
            return regions;
        }

        public async Task<Region?> GetByIdAsync(Guid id)
        {
            var region = await _dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (region == null)
            {
                return null;
            }
            return region;
        }

        public async Task<Region?> UpdateAsync(Guid id, Region region)
        {
           
            var existingRegion = await _dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (existingRegion == null) return null;

            existingRegion.Name = region.Name;
            existingRegion.Code = region.Code;
            existingRegion.RegionImageURL = region.RegionImageURL;  

            await _dbContext.SaveChangesAsync();
            return existingRegion;
        }
    }
}
