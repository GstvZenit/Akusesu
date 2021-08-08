namespace API.Entities
{
    public class CourseCategory
    {
        public int Id { get; set; }
        
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}