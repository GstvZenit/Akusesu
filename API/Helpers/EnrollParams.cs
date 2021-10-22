namespace API.Helpers
{
    public class EnrollParams : PaginationParams
    {
        public int UserId { get; set; }
        public int CourseId { get; set; }
        
    }
}