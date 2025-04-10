using Microsoft.EntityFrameworkCore;

namespace Intex2025.API.Data
{
    public class MovieSimilarityDbContext: DbContext
    {
        public MovieSimilarityDbContext(DbContextOptions<MovieSimilarityDbContext> options) : base(options) 
        { }

        public DbSet<MovieSimilarity> movie_similarities { get; set; }
    }
}
