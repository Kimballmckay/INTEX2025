using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2025.API.Data
{
    public class Movies_Rating
    {
        [ForeignKey("user_id")]
        public int? user_id { get; set; }
        public Movies_User? User { get; set; }

        [ForeignKey("show_id")]
        public string? show_id { get; set; }
        public Movies_Title? Title { get; set; }
        public int? rating { get; set; }  
    }
}
