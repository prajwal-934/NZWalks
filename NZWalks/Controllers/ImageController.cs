using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NZWalks.Models.Domain;
using NZWalks.Models.DTO;
using NZWalks.Repository;

namespace NZWalks.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ImageController : Controller
    {
        private readonly IImageRepository imageRepository;

        public ImageController(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        [HttpPost]
        [Route("Upload")]
        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDto imageUploadRequestDto )
        {
            ValidateFileUplaod(imageUploadRequestDto);
            if(ModelState.IsValid)
            {
                //convert dto to domain model
                var imageDomainModel = new Image
                {
                    File = imageUploadRequestDto.File,
                    FileExtension = Path.GetExtension(imageUploadRequestDto.File.FileName),
                    FileSizeInByte = imageUploadRequestDto.File.Length,
                    FileName = imageUploadRequestDto.FileName,
                    FileDescription = imageUploadRequestDto.FileDescription

                };

                await imageRepository.Upload(imageDomainModel);
                return Ok(imageDomainModel);
        

            }
            return BadRequest(ModelState);
            

        }

        private void ValidateFileUplaod([FromForm] ImageUploadRequestDto fileUploadRequestDto )
        {
            var allowedExtension = new string[] { ".jpeg",".png",".jpg" };
            if (!allowedExtension.Contains(Path.GetExtension(fileUploadRequestDto.File.FileName)))
            {
                ModelState.AddModelError("file", "Unsupported file extension");
            }
            if(fileUploadRequestDto.File.Length > 10485760)
            {
                ModelState.AddModelError("file", "File Size is more than 10MB, Please upload smaller file");
            }



        }


    }
}
