using NZWalks.Models.Domain;

namespace NZWalks.Repository
{
    public interface IWalkRepositroy
    {
        Task<List<Walk>> GetAllAsync();
        Task<Walk?> GetByIdAsync(Guid id);
        Task<Walk> CreateAsync(Walk walk);
        Task<List<Walk>> BulkCreate(List<Walk> walks);
        Task<Walk> UpdateAsync(Guid id, Walk walk);
        Task<Walk?> DeleteAsync(Guid id);
    }
}
