using System.ComponentModel.DataAnnotations;

namespace NZWalks.Models.DTO
{
    public class UpdateWalkRequestDTO
    {
        [Required]
        [MaxLength(20, ErrorMessage = "Name has to be maximum 20 characters")]
        [MinLength(5, ErrorMessage = "Name has to be minimum 5 characters")]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public double LengthInKm { get; set; }

        public string? WalkImageURL { get; set; }

        public Guid DifficultyId { get; set; }
        public Guid RegionId { get; set; }
    }
}
