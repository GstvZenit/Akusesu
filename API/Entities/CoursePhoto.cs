using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("CoursePhotos")]
    public class CoursePhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain{ get; set; }
        public string PublicId { get; set; }
        //relacion completa appuser-photo(s)
        public Course Course { get; set; }
        public int CourseId { get; set; }
    }
}