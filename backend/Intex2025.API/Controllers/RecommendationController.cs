using Intex2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intex2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        private RecommendationsDbContext _recommendationContext;

        public RecommendationController(RecommendationsDbContext temp) 
        {
            _recommendationContext = temp;
        }

        [HttpGet("Recommend/{show_id}")]
        public ActionResult<Recommendations> GetRecommendationsByShowId(string show_id)
        {
            var recommendations = _recommendationContext.Recommendations
                .Where(r => r.show_id == show_id)
                .ToList();

            if (recommendations == null)
            {
                return NotFound(); // Return a 404 if no recommendations are found
            }

            return Ok(recommendations); // Return the recommendations if found
        }
    }
}
