using Intex2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace Intex2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;

        public MovieController(MovieDbContext temp)
        {
            _movieContext = temp;
        }

        [HttpGet("AllMovies")]
        public IEnumerable<Movies_Title> GetMovies()
        {
            var allMovies = _movieContext.Movies_Titles.ToList();
            return allMovies;
        }

        [HttpGet("FilteredMovies")]
        public IActionResult GetFilteredMovies([FromQuery] List<string> genres, [FromQuery] int? releaseYear)
        {
            // Get all properties of the Movies_Title class (excluding release_year)
            var genreProperties = typeof(Movies_Title).GetProperties()
                                                      .Where(p => p.PropertyType == typeof(int?) && p.Name != "release_year")
                                                      .ToList();

            var query = _movieContext.Movies_Titles.AsQueryable();

            // Check each genre in the query
            foreach (var genre in genres)
            {
                // Find the corresponding genre property by name
                var property = genreProperties.FirstOrDefault(p => p.Name.Equals(genre, StringComparison.OrdinalIgnoreCase));

                if (property != null)
                {
                    // Apply filter for the genre property, evaluating it in memory
                    query = query.AsEnumerable()
                                 .Where(m => (int?)property.GetValue(m) == 1)
                                 .AsQueryable();  // Convert back to IQueryable after filtering
                }
                else
                {
                    // Return BadRequest with the invalid genre specified
                    return BadRequest($"Invalid genre specified: {genre}");
                }
            }

            // Execute the query and return the filtered list of movies
            var filteredMovies = query.ToList();
            return Ok(filteredMovies); // Return a successful response with filtered movies
        }
    }
}
