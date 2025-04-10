using System.ComponentModel.DataAnnotations;

namespace Intex2025.API.Data
{
    public class Recommendations
    {
        [Key]
        public string show_id { get; set; }
        [Required]
        public string Recommendation1 { get; set; }
        [Required]
        public string Recommendation2 { get; set; }
        [Required]
        public string Recommendation3 { get; set; }
        [Required]
        public string Recommendation4 { get; set; }
        [Required]
        public string Recommendation5 { get; set; }
    }
}
