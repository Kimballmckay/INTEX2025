using Intex2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;

namespace Intex2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;
        private const int PageSize = 20;  // Set the page size (number of movies per page)

        public MovieController(MovieDbContext temp)
        {
            _movieContext = temp;
        }

        // Updated GetMovies to handle pagination
        [HttpGet("AllMovies")]
        public IActionResult GetMovies([FromQuery] int page = 1)
        {
            // Calculate the number of movies to skip based on the page number and page size
            var skip = (page - 1) * PageSize;

            // Get the movies from the database, with pagination
            var movies = _movieContext.Movies_Titles
                                      .Skip(skip)
                                      .Take(PageSize)
                                      .ToList();

            // Return the movies
            return Ok(movies);
        }

        [HttpGet("FilteredMovies")]
        public IActionResult GetFilteredMovies([FromQuery] List<string> genres, [FromQuery] int? releaseYear, [FromQuery] int page = 1)
        {
            // Get all properties of the Movies_Title class (excluding release_year)
            var genreProperties = typeof(Movies_Title).GetProperties()
                                                      .Where(p => p.PropertyType == typeof(int?) && p.Name != "release_year")
                                                      .ToList();

            var query = _movieContext.Movies_Titles.AsQueryable();

            // Apply genre filters
            foreach (var genre in genres)
            {
                // Find the corresponding genre property by name
                var property = genreProperties.FirstOrDefault(p => p.Name.Equals(genre, StringComparison.OrdinalIgnoreCase));

                if (property != null)
                {
                    // Apply filter for the genre property
                    query = query.Where(m => (int?)property.GetValue(m) == 1);
                }
                else
                {
                    // Return BadRequest with the invalid genre specified
                    return BadRequest($"Invalid genre specified: {genre}");
                }
            }

            // Apply release year filter if specified
            if (releaseYear.HasValue)
            {
                query = query.Where(m => m.release_year == releaseYear);
            }

            // Calculate the number of movies to skip based on the page number and page size
            var skip = (page - 1) * PageSize;

            // Get the filtered movies with pagination
            var filteredMovies = query.Skip(skip)
                                      .Take(PageSize)
                                      .ToList();

            // Return the filtered movies
            return Ok(filteredMovies);
        }
    }
}
