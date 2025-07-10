using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class RegionController : Controller
    {

        private readonly NZWalksDBContext _dbContext;
        private readonly IRegionRepository _regionRepository;
        private readonly IMapper _mapper;
        public RegionController(NZWalksDBContext dBContext, IRegionRepository repository, IMapper mapper)
        {
            _dbContext = dBContext;
            _regionRepository = repository;
            _mapper = mapper;
        } 

        [HttpGet]
        [Authorize(Roles ="Reader")]

        public async Task<IActionResult> GetAll()
        {

            var regionsDomain =  await _regionRepository.GetAllAsync();
            
            var regionsDTO = _mapper.Map<List<RegionDTO>>(regionsDomain);

            return Ok(regionsDTO);
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "Reader")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var region = await _regionRepository.GetByIdAsync(id);
            if (region == null) { return NotFound(); }

            var regionDto = _mapper.Map<RegionDTO>(region);
            return Ok(regionDto);
        }

        [HttpPost]
        [Authorize(Roles = "Writer")]

        public async  Task<IActionResult> Create([FromBody] AddRegionRequestDTO addRegionRequestDTO)
        {
            var regionDomianModel = _mapper.Map<Region>(addRegionRequestDTO);
     
            await _regionRepository.CreateAsync(regionDomianModel);
            var regionDto = _mapper.Map<RegionDTO>(regionDomianModel);
            
            return CreatedAtAction(nameof(GetById), new { id = regionDto.Id }, regionDto);
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id , [FromQuery] UpdateRegionRequestDTO updateRegionRequestDTO)
        {


            var regionDomainModel = _mapper.Map<Region>(updateRegionRequestDTO);

            regionDomainModel = await _regionRepository.UpdateAsync(id, regionDomainModel);

            if (regionDomainModel == null)
            {
                return NotFound();
            }

            var regionDto = _mapper.Map<RegionDTO>(regionDomainModel);

            return Ok(regionDto);

        }

        [HttpDelete]
        [Route("{id:guid}")]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var regionDomainModel = await _regionRepository.DeleteAsync(id);
            if(regionDomainModel == null)
            {
                return NotFound();
            }

            var regionDTO = _mapper.Map<RegionDTO>(regionDomainModel);

            return Ok(regionDTO);
        }
    }
}
