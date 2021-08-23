using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Course 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public int InstructorId { get; set; }
        public string InstructorUsername { get; set; }
        public AppUser Instructor { get; set; }
        public string Category { get; set; }
        public string Institution { get; set; }
        public string Duration { get; set; }
        public ICollection<CoursePhoto> CoursePhotos { get; set; }
        public ICollection<AppUserCourse> UserCourses { get; set; }

        public ICollection<AppUser> Students { get; set; }
        
    }
}