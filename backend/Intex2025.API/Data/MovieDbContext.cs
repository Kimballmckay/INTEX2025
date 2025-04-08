using Microsoft.EntityFrameworkCore;

namespace Intex2025.API.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        public DbSet<Movies_Rating> Movies_Ratings { get; set; }
        public DbSet<Movies_Title> Movies_Titles { get; set; }
        public DbSet<Movies_User> Movies_Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set composite primary key for Movies_Rating
            modelBuilder.Entity<Movies_Rating>()
                .HasKey(r => new { r.user_id, r.show_id });

            // Define relationship with Movies_User
            modelBuilder.Entity<Movies_Rating>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.user_id);

            // Define relationship with Movies_Title
            modelBuilder.Entity<Movies_Rating>()
                .HasOne(r => r.Title)
                .WithMany()
                .HasForeignKey(r => r.show_id);
        }
    }
}
