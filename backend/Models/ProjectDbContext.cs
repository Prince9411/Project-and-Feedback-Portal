using Microsoft.EntityFrameworkCore;

namespace FinalProject.Models
{
    public class ProjectDbContext : DbContext
    {
        public ProjectDbContext()
        {
        }

        public ProjectDbContext(DbContextOptions<ProjectDbContext> options)
            : base(options)
        {
        }

        // Tables
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; } 

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=Prince\\SQLEXPRESS;Database=ProjectDb;Trusted_Connection=True;TrustServerCertificate=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 🔹 Feedback → Project relation
            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(e => e.FeedbackId);

                entity.Property(e => e.FeedbackDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Project)
                      .WithMany(p => p.Feedbacks)
                      .HasForeignKey(d => d.ProjectId)   // Explicitly link FK
                      .HasConstraintName("FK_Feedbacks_Project");
            });

            // 🔹 Feedback → User relation
            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasOne(d => d.User)
                      .WithMany() // A user can give many feedbacks
                      .HasForeignKey(d => d.UserId) // Explicit FK
                      .HasConstraintName("FK_Feedbacks_User");
            });

            // 🔹 Project table primary key
            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.ProjectId);
            });
        }
    }
}
