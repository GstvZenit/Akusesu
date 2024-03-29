using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, 
    AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext( DbContextOptions options) : base(options)
        {
        }
        //table names
        //IdentityDbContext nos provee las tablas entonces no necesitamos DbSet Users
        //public DbSet<AppUser> Users { get; set; }
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Course> Course {get; set;} //debe estar como esta en la base de datos
        public DbSet<Group> Groups { get; set; }
        public DbSet<AppUserCourse> Enroll { get; set; }
        public DbSet<Connection> Connections {get; set;}

        protected override void OnModelCreating(ModelBuilder builder){
            //migration option
            base.OnModelCreating(builder);
            
            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            //relation UserCourse
            builder.Entity<AppUser>()
                .HasMany(uc => uc.UserCourses)
                .WithOne(u => u.User)
                .HasForeignKey(uc => uc.UserId)
                .IsRequired();

            builder.Entity<Course>()
                .HasMany(uc => uc.UserCourses)
                .WithOne(u => u.Course)
                .HasForeignKey(uc => uc.CourseId)
                .IsRequired();
                
            

            //custom merged Id of UserLike entidad
            builder.Entity<UserLike>()
                .HasKey(k => new{k.SourceUserId, k.LikedUserId});

                builder.Entity<AppUserCourse>()
                .HasKey(k => new{k.sourceUserId, k.CourseId});
            //relaciones enter tabls

            builder.Entity<AppUserCourse>()
            .HasOne(s => s.User)
            .WithMany(l => l.UserCourses)
            .HasForeignKey(s => s.sourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUserCourse>()
                .HasOne(z => z.Course)
                .WithMany(l => l.UserCourses)
                .HasForeignKey(s => s.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
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
            //relaciones tblas mensajes
            builder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(m => m.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
            .HasOne(u => u.Sender)
            .WithMany(m => m.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);

            builder.ApplyUtcDateTimeConverter();

        }
    }
    public static class UtcDateAnnotation
{
  private const String IsUtcAnnotation = "IsUtc";
  private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
    new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

  private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
    new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

  public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
    builder.HasAnnotation(IsUtcAnnotation, isUtc);

  public static Boolean IsUtc(this IMutableProperty property) =>
    ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

  /// <summary>
  /// Make sure this is called after configuring all your entities.
  /// </summary>
  public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
  {
    foreach (var entityType in builder.Model.GetEntityTypes())
    {
      foreach (var property in entityType.GetProperties())
      {
        if (!property.IsUtc())
        {
          continue;
        }

        if (property.ClrType == typeof(DateTime))
        {
          property.SetValueConverter(UtcConverter);
        }

        if (property.ClrType == typeof(DateTime?))
        {
          property.SetValueConverter(UtcNullableConverter);
        }
      }
    }
  }
}
}