using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CourseAddDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        //[Required]
        //public int InstructorId { get; set; }
        //[Required]
        //public string InstructorUsername { get; set; }
        [Required]
        public string Category { get; set; }

        [Required]
        public string Institution { get; set; }
        [Required]
        public string Duration { get; set; }
        

    }
}