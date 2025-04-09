using Intex2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;

namespace Intex2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;
        private const int PageSize = 20;  // Set the page size (number of movies per page)

        public MovieController(MovieDbContext temp)
        {
            _movieContext = temp;
        }

        // Updated GetMovies to handle pagination and search query
        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? movieGenres = null, [FromQuery] string? searchQuery = null)
        {
            var query = _movieContext.Movies_Titles.AsQueryable();

            // Filter by genre
            if (movieGenres != null && movieGenres.Any())
            {
                var lowerTrimmedSelectedGenres = movieGenres.Select(g => g.ToLower().Trim()).ToList();
                query = query.Where(m => !string.IsNullOrEmpty(m.genre) &&
                       lowerTrimmedSelectedGenres.Any(sg => m.genre.ToLower().Contains(sg)));
            }

            // Filter by title search query
            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(m => m.title.ToLower().Contains(searchQuery.ToLower()));
            }

            var totalNumMovies = query.Count();

            // Get the movies from the database, with pagination
            var movies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Movies = movies,
                TotalNumMovies = totalNumMovies,
            };

            // Return the movies
            return Ok(result);
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

        [HttpGet("{show_id}")]
        public async Task<IActionResult> GetMovieById(string show_id)
        {
            var movie = await _movieContext.Movies_Titles.FindAsync(show_id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] Movies_Title newMovie)
        {
            // Pull just the show_ids starting with 's'
            var showIds = _movieContext.Movies_Titles
                .Where(m => m.show_id.StartsWith("s"))
                .Select(m => m.show_id)
                .ToList(); // Materialize to memory so we can use normal C# code

            // Now safely parse and get the max numeric part
            int maxId = showIds
                .Select(id =>
                {
                    if (int.TryParse(id.Substring(1), out int num))
                        return num;
                    return 0;
                })
                .DefaultIfEmpty(0)
                .Max();

            int nextId = maxId + 1;
            newMovie.show_id = $"s{nextId}";

            _movieContext.Movies_Titles.Add(newMovie);
            _movieContext.SaveChanges();

            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{show_id}")]
        public IActionResult UpdateMovie(string show_id, [FromBody] Movies_Title updatedMovie)
        {
            var existingMovie = _movieContext.Movies_Titles.Find(show_id);

            existingMovie.type = updatedMovie.type;
            existingMovie.title = updatedMovie.title;
            existingMovie.director = updatedMovie.director;
            existingMovie.cast = updatedMovie.cast;
            existingMovie.country = updatedMovie.country;
            existingMovie.release_year = updatedMovie.release_year;
            existingMovie.rating = updatedMovie.rating;
            existingMovie.duration = updatedMovie.duration;
            existingMovie.description = updatedMovie.description;
            existingMovie.genre = updatedMovie.genre;

            _movieContext.Movies_Titles.Update(existingMovie);
            _movieContext.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{show_id}")]
        public IActionResult DeleteMovie(string show_id)
        {
            var movie = _movieContext.Movies_Titles.Find(show_id);
            if (movie == null)
            {
                return NotFound();
            }

            _movieContext.Movies_Titles.Remove(movie);
            _movieContext.SaveChanges();

            return Ok();
        }
    }
}
