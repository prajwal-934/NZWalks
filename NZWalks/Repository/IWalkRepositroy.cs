﻿using NZWalks.Models.Domain;

namespace NZWalks.Repository
{
    public interface IWalkRepositroy
    {
        Task<List<Walk>> GetAllAsync(string? filterOn = null, string? filterQuery = null
            , string? sortBy = null, bool isAscending = true
            ,int pageNumber=1, int pageSize = 1000);
        Task<Walk?> GetByIdAsync(Guid id);

        Task<Walk> CreateAsync(Walk walk);
        Task<List<Walk>> BulkCreate(List<Walk> walks);
        Task<Walk> UpdateAsync(Guid id, Walk walk);
        Task<Walk?> DeleteAsync(Guid id);
    }
}
