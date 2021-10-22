

using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUserCourse : IdentityUserRole<int>
    {
        public int sourceUserId { get; set; }
        public AppUser User { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
        
    }
}