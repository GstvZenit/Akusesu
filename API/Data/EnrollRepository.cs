

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EnrollRepository : IEnrollRepository
    {
        private readonly DataContext _context;
        public EnrollRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<AppUserCourse> GetAppUserCourse(int CourseId, int sourceUserId)
        {
            return await _context.Enroll.FindAsync(CourseId, sourceUserId);
        }

        public async Task<PagedList<UserCoursesDto>> GetUserCourses(EnrollParams enrollParams)
        {
            //list conditions and staments
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var courses = _context.Course.OrderBy(u => u.Name).AsQueryable();
            var enrolls = _context.Enroll.AsQueryable();
            //cursos a los que el usuario se ha inscrito
            
                enrolls = enrolls.Where(enroll => enroll.sourceUserId == enrollParams.UserId);
                courses = enrolls.Select(enroll => enroll.Course);
            

            
            var userCourses = courses.Select(course => new UserCoursesDto
            {
                //optional configurar autoMapper
                Name = course.Name,
                Category = course.Category,
                Institution = course.Institution,
                PhotoUrl = course.CoursePhotos.FirstOrDefault(p => p.IsMain).Url,
                Duration = course.Duration,
                Id = course.Id
            });
            return await PagedList<UserCoursesDto>.CreateAsync(userCourses, 
            enrollParams.PageNumber, enrollParams.PageSize);
        }

         public async Task<PagedList<CourseUsersDto>> GetCourseUsers(EnrollParams enrollParams)
        {
            //list conditions and staments
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var courses = _context.Course.OrderBy(u => u.Name).AsQueryable();
            var enrolls = _context.Enroll.AsQueryable();
            //usuarios que estan inscritos a un curso
            
                enrolls = enrolls.Where(enroll => enroll.CourseId == enrollParams.CourseId);
                users = enrolls.Select(enroll => enroll.User);
            

            
            var courseUsers = users.Select(user => new CourseUsersDto
            {
                //optional configurar autoMapper
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
                Id = user.Id
            });
            return await PagedList<CourseUsersDto>.CreateAsync(courseUsers, 
            enrollParams.PageNumber, enrollParams.PageSize);
        }

        public async Task<AppUser> GetUserEnrolled(int userId)
        {
            return await _context.Users
            .Include(x => x.UserCourses)
            .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }



}