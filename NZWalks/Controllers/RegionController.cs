using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using NZWalks.Data;
using NZWalks.Models.Domain;
using NZWalks.Models.DTO;
using NZWalks.Repository;

namespace NZWalks.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class RegionController : Controller
    {

        private NZWalksDBContext _dbContext;
        private IRegionRepository _regionRepository;
        public RegionController(NZWalksDBContext dBContext, IRegionRepository repository)
        {
            _dbContext = dBContext;
            _regionRepository = repository;
        } 

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var regionsDomain =  await _regionRepository.GetAllAsync();
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
            var region = await _regionRepository.GetByIdAsync(id);
            if (region == null) { return NotFound(); }
            RegionDTO regionDto = new RegionDTO
            {
                Id = region.Id,
                Code = region.Code,
                Name = region.Name,
                RegionImageURL = region.RegionImageURL
            };
            return Ok(regionDto);
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

            await _regionRepository.CreateAsync(regionDomianModel);

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


            Region regionDomainModel = new Region
            {
                Code = updateRegionRequestDTO.Code,
                Name = updateRegionRequestDTO.Name,
                RegionImageURL = updateRegionRequestDTO?.RegionImageURL,
            };

            regionDomainModel = await _regionRepository.UpdateAsync(id, regionDomainModel);

            if (regionDomainModel == null)
            {
                return NotFound();
            }

            var regionDto = new RegionDTO
            {
                Id = regionDomainModel.Id,
                Code = regionDomainModel.Code,
                Name = regionDomainModel.Name,
                RegionImageURL = regionDomainModel.RegionImageURL,
            };

            return Ok(regionDto);

        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var regionDomainModel = await _regionRepository.DeleteAsync(id);
            if(regionDomainModel == null)
            {
                return NotFound();
            }
          
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
