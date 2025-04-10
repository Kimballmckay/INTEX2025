using Intex2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace Intex2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MovieSimilarityController : ControllerBase
    {
        private MovieSimilarityDbContext _context;

        public MovieSimilarityController(MovieSimilarityDbContext temp)
        {
           _context = temp;
        }

        [HttpGet("top5/{ShowId}")]
        public async Task<IActionResult> GetTop5SimilarMovies(string ShowId)
        {
            var top5 = await _context.movie_similarities
                .Where(m => m.source_show_id == ShowId)
                .OrderByDescending(m => m.similarity_score)
                .Take(5)
                .Select(m => new
                {
                    m.target_show_id
                })
                .ToListAsync();

            if (top5 == null || !top5.Any())
            {
                return NotFound($"No Similar movies found for source_show_id");
            }

            return Ok(top5);
        }

    }
}
