using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NZWalks.CustomActionFilters;
using NZWalks.Models.Domain;
using NZWalks.Models.DTO;
using NZWalks.Repository;

namespace NZWalks.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class WalkController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IWalkRepositroy _repository;


        public WalkController(IMapper mapper , IWalkRepositroy repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn , [FromQuery] string? filterQuery,
            [FromQuery] string? sortBy , [FromQuery] bool? isAscending, 
            [FromQuery] int pageNumber =1 , [FromQuery] int pageSize = 1000)
        {
            var walks = await _repository.GetAllAsync(filterOn,filterQuery, sortBy , isAscending ?? true, pageNumber , pageSize);
            var walksDto = _mapper.Map<List<WalkDTO>>(walks);
            return Ok(walksDto);           
        }


        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var walkDomainModel = await _repository.GetByIdAsync(id);
            if(walkDomainModel == null)
            {
                return NotFound();
            }
            var walkDto = _mapper.Map<WalkDTO>(walkDomainModel); 
            return Ok(walkDto);
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddWalkRequestDTO addWalkRequestDTO)
        {
            var walksDomainMaker = _mapper.Map<Walk>(addWalkRequestDTO);
            await _repository.CreateAsync(walksDomainMaker);
            var walkDto = _mapper.Map<WalkDTO>(walksDomainMaker);
            return CreatedAtAction(nameof(GetById), new {id = walksDomainMaker.Id} , walkDto);
        }

        [HttpPost("BulkCreate")]
        [ValidateModel]
        public async Task<IActionResult> BulkCreate([FromBody] List<AddWalkRequestDTO> addWalkRequestDTOs)
        {
            var walksDomainMaker = _mapper.Map<List<Walk>>(addWalkRequestDTOs);
            walksDomainMaker =  await _repository.BulkCreate(walksDomainMaker);
            var walksDto = _mapper.Map<List<WalkDTO>>(walksDomainMaker);
            return Ok(walksDto);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> Update([FromBody]  UpdateWalkRequestDTO updateWalkRequestDTO , [FromRoute] Guid id)
        {
            var walkDomainModel = _mapper.Map<Walk>(updateWalkRequestDTO);
            walkDomainModel = await _repository.UpdateAsync(id,walkDomainModel);
            if(walkDomainModel == null)
            {
                return NotFound();
            }
            var walkDto = _mapper.Map<WalkDTO>(walkDomainModel) ;
            return Ok(walkDto); 
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var walkDomainModle = await _repository.DeleteAsync(id);
            if(walkDomainModle == null)
            {
                return NotFound();  
            }
            return Ok(walkDomainModle);
        }
    }
}
