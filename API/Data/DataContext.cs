using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext( DbContextOptions options) : base(options)
        {
        }
        //table names
        public DbSet<AppUser> Users { get; set; }
        public DbSet <UserLike> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            //migration option
            base.OnModelCreating(builder);
            //custom merged Id of UserLike entidad
            builder.Entity<UserLike>()
                .HasKey(k => new{k.SourceUserId, k.LikedUserId});
            //relaciones enter tabls
            builder.Entity<UserLike>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
            .HasOne(s => s.LikedUser)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.LikedUserId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}