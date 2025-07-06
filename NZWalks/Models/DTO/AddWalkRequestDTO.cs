using System.ComponentModel.DataAnnotations;

namespace NZWalks.Models.DTO
{
    public class AddWalkRequestDTO
    {
        [Required]
        [MaxLength(20 , ErrorMessage ="Name has to be maximum 20 characters")]
        [MinLength(5 , ErrorMessage ="Name has to be minimum 5 characters")]
        public string Name { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters can be put")]
        public string Description { get; set; }

        [Required]
        [Range(0,50)]
        public double LengthInKm { get; set; }
         
        public string? WalkImageURL { get; set; }

        [Required]
        public Guid DifficultyId { get; set; }
        
        public Guid RegionId { get; set; }
    }
}
