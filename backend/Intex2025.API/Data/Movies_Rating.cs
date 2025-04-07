using System.ComponentModel.DataAnnotations;

namespace Intex2025.API.Data
{
    public class Movies_Rating
    {
        [Key]
        public int user_id { get; set; }
        public string show_id { get; set; }
        public int rating { get; set; }
    }
}
