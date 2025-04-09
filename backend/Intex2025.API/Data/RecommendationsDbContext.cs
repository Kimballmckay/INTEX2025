using Microsoft.EntityFrameworkCore;

namespace Intex2025.API.Data
{
    public class RecommendationsDbContext : DbContext
    {
        public RecommendationsDbContext(DbContextOptions<RecommendationsDbContext> options) : base(options) 
        {
        }

        public DbSet<Recommendations> Recommendations { get; set; }
    }
}
