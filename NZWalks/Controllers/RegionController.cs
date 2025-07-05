using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using NZWalks.Data;
using NZWalks.Models.Domain;
using NZWalks.Models.DTO;

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

        [HttpPost]
        public async  Task<IActionResult> Create([FromBody] AddRegionRequestDTO addRegionRequestDTO)
        {
            Region regionDomianModel = new Region
            {
                Code = addRegionRequestDTO.Code,
                Name = addRegionRequestDTO.Name,
                RegionImageURL = addRegionRequestDTO.RegionImageURL
            };

            await _dbContext.Regions.AddAsync(regionDomianModel);
            await _dbContext.SaveChangesAsync();

            RegionDTO regionDTO = new RegionDTO
            {
                Id = regionDomianModel.Id,
                Code = regionDomianModel.Code,
                Name = regionDomianModel.Name,
                RegionImageURL = regionDomianModel.RegionImageURL
            };

            Console.WriteLine("NAme of ....................", nameof(GetById));
            return CreatedAtAction(nameof(GetById), new { id = regionDTO.Id }, regionDTO);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id , [FromQuery] UpdateRegionRequestDTO updateRegionRequestDTO)
        {
            var   regionDomainModel  =_dbContext.Regions.FirstOrDefault(x => x.Id == id);

            if(regionDomainModel == null)
            {
                return NotFound();
            }

            regionDomainModel.Code = updateRegionRequestDTO.Code;
            regionDomainModel.Name = updateRegionRequestDTO.Name;
            regionDomainModel.RegionImageURL = updateRegionRequestDTO.RegionImageURL;

            await _dbContext.SaveChangesAsync();

            RegionDTO region = new RegionDTO
            {
                Id = regionDomainModel.Id,
                Code = regionDomainModel.Code,
                Name = regionDomainModel.Name,
                RegionImageURL = regionDomainModel?.RegionImageURL,
            };

            return Ok(region);

        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var regionDomainModel = await _dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if(regionDomainModel == null)
            {
                return NotFound();
            }
            
            await _dbContext.SaveChangesAsync();
            RegionDTO regionDTO = new RegionDTO
            {
                Id = regionDomainModel.Id,
                Code = regionDomainModel.Code,
                Name = regionDomainModel.Name,
                RegionImageURL = regionDomainModel?.RegionImageURL,
            };

            return Ok(regionDTO);
        }
    }
}
