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

        [HttpGet("GetMovieGenres")]
        public IActionResult GetMovieGenres()
        {
            var movieGenres = _movieContext.Movies_Titles
                .AsEnumerable()  // Fetch data into memory first
                .Where(m => !string.IsNullOrEmpty(m.genre))  // Ensure that genre is not null or empty
                .SelectMany(m => m.genre.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))  // Split and handle empty entries
                .Select(g => g.Trim().ToLower())  // Trim spaces and convert to lowercase for standard comparison
                .Distinct()  // Remove duplicate genres
                .ToList();

            return Ok(movieGenres);
        }
    }
}
