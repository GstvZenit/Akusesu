using System.Collections.Generic;

namespace API.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CourseCategory> CourseCategories { get; set; }
        
    }
}