using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NZWalks.Data;
using NZWalks.Models.Domain;

namespace NZWalks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class RegionController : Controller
    {

        private NZWalksDBContext _dbContext;
        public RegionController(NZWalksDBContext dBContext)
        {
            _dbContext = dBContext;
        } 

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var regionsDomain =  await _dbContext.Regions.ToListAsync();
            List<RegionDTO> regionsDTO = new List<RegionDTO>();
            foreach (var region in regionsDomain)
            {
                regionsDTO.Add(new RegionDTO
                {
                    Id = region.Id,
                    Code = region.Code,
                    Name = region.Name,
                    RegionImageURL = region.RegionImageURL
                });
            }

            return Ok(regionsDTO);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var region = await _dbContext.Regions.AsNoTracking().FirstOrDefaultAsync(x=>x.Id == id);
            if (region == null) { return NotFound(); }
            RegionDTO regionDto = new RegionDTO
            {
                Id = region.Id,
                Code = region.Code,
                Name = region.Name,
                RegionImageURL = region.RegionImageURL
            };
            return Ok(region);
        }
    }
}
