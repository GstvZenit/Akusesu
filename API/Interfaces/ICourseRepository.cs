using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.DTOs;

namespace API.Interfaces
{
    public interface ICourseRepository
    {
        void AddCourse(Course course);
        void Update(Course course);
        void DeleteCourse(Course course);
        
        Task<IEnumerable<Course>> GetCoursesAsyncc();
        Task<Course> GetCourseByIdAsync(int id);
        Task<Course> GetCourseByNameAsync(string name);

        //Optimizacion metodos
        Task<PagedList<CourseDto>> GetCoursesAsync(CourseParams courseParams);
        Task<CourseDto> GetCourseAsync(string name);
        Task<string> GetCourseCategory(string name);
    }
}