using Microsoft.EntityFrameworkCore;
using NZWalks.Data;
using NZWalks.Models.Domain;

namespace NZWalks.Repository
{
    public class SqlWalkRepository : IWalkRepositroy
    {
        NZWalksDBContext _dbContext;
        public SqlWalkRepository(NZWalksDBContext nZWalksDBContext)
        {
           _dbContext = nZWalksDBContext;
        }

       

        public async Task<Walk> CreateAsync(Walk walk)
        {
            await _dbContext.Walks.AddAsync(walk);
            await _dbContext.SaveChangesAsync();
            return walk;
        }

        public async Task<List<Walk>> BulkCreate(List<Walk> walks)
        {
            await _dbContext.Walks.AddRangeAsync(walks);
            await _dbContext.SaveChangesAsync();
            return walks;
        }

        public async Task<Walk?> DeleteAsync(Guid id)
        {
            var walk = await _dbContext.Walks.FirstOrDefaultAsync(x => x.Id == id);    
            if(walk == null)
            {
                return null;
            }
            _dbContext.Remove(walk);
            await _dbContext.SaveChangesAsync();
            return walk;
        }

        public async Task<List<Walk>> GetAllAsync(string? filterOn=null , string? filterQuery = null , string? sortBy = null , bool IsAscending = true)
        {
            var walks =  _dbContext.Walks.Include(x=>x.Difficulty).Include(x=>x.Region).AsQueryable();

            if(string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                walks = filterOn.ToLower() switch
                {
                    "name" => walks.Where(x=>x.Name.Contains(filterQuery)),
                    "description" => walks.Where(x => x.Description.Contains(filterQuery)),
                };
            }

            if(string.IsNullOrWhiteSpace(sortBy) == false)
            {
                walks = sortBy.ToLower() switch
                {
                    "name" => IsAscending ? walks.OrderBy(x=>x.Name) : walks.OrderByDescending(x=>x.Name),
                    "lengthinkm" => IsAscending ? walks.OrderBy(x => x.LengthInKm) : walks.OrderByDescending(x => x.LengthInKm),
                };
            }

            return await walks.ToListAsync();
        }

        public async Task<Walk?> GetByIdAsync(Guid id)
        {
            var walk = await _dbContext.Walks.Include(x => x.Difficulty).Include(x => x.Region).FirstOrDefaultAsync(x=> x.Id == id);
            if (walk == null) return null;
            return walk;
        }

        public async Task<Walk> UpdateAsync(Guid id, Walk walk)
        {
            var existingWalk = await _dbContext.Walks.FirstOrDefaultAsync( x=> x.Id == id);
            if (existingWalk == null) return null;

            existingWalk.Name = walk.Name;
            existingWalk.Description = walk.Description;    
            existingWalk.LengthInKm = walk.LengthInKm;  
            existingWalk.WalkImageURL = walk.WalkImageURL;
            existingWalk.DifficultyId = walk.DifficultyId;
            existingWalk.RegionId = walk.RegionId;

            return existingWalk;
        }
    }
}


