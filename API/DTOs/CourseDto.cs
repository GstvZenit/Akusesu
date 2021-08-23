using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //propieda CoursePhotoUrl para obtener la foto principal del curso
        public string CoursePhotoUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int InstructorId { get; set; }
        public string InstructorUsername { get; set; }
        //public AppUser Instructor { get; set; }
        //reemplazando AppUser Instructor por una foto del instructor
        public string InstructorPhotoUrl { get; set; }
        public string Category { get; set; }
        public string Institution { get; set; }
        public string Duration { get; set; }

        //public ICollection<CourseCategory> CourseCategories { get; set; }
        public ICollection<PhotoDto> CoursePhotos { get; set; }
        //public ICollection<AppUserCourse> UserCourses { get; set; }

        public ICollection<MemberDto> Students { get; set; }
        
    }
}