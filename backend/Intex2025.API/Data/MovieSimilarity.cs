using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2025.API.Data
{
    public class MovieSimilarity
    {
        [Key]
        [Column(Order = 0)]
        public string source_show_id {  get; set; }
        
        [Column(Order = 1)]
        public string target_show_id { get; set;}
        public double similarity_score { get; set;}


    }
}
