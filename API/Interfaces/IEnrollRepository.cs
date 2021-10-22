
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using System.Collections.Generic;
using System.Linq;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace API.Interfaces
{
    public interface IEnrollRepository
    {
        Task<AppUserCourse> GetAppUserCourse(int courseId, int userId);
        Task<AppUser> GetUserEnrolled(int userId);
        Task<PagedList<UserCoursesDto>> GetUserCourses(EnrollParams enrollParams);
        Task<PagedList<CourseUsersDto>> GetCourseUsers(EnrollParams enrollParams);
    }
}