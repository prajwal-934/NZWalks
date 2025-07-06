using System.ComponentModel.DataAnnotations;

namespace NZWalks.Models.DTO
{
    public class AddRegionRequestDTO
    {
        [Required]
        [MaxLength(5, ErrorMessage ="Cannot be more than 5 characters")]
        public string Code { get; set; }

        [Required]
        [MinLength(10, ErrorMessage ="Minimum 10 characters is required")]
        public string Name { get; set; }

        public string? RegionImageURL { get; set; }
    }
}
