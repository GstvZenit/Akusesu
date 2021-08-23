using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CourseRepository : ICourseRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CourseRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        //
        public void AddCourse(Course course)
        {
            _context.Course.Add(course);
        }

        public void DeleteCourse(Course course)
        {
            _context.Course.Remove(course);
        }
        //
        public async Task<CourseDto> GetCourseAsync(string name)
        {
            return await _context.Course
            .Where(x => x.Name == name)
            .ProjectTo<CourseDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }
        public async Task<PagedList<CourseDto>> GetCoursesAsync(CourseParams courseParams)
        {
            var query= _context.Course.AsQueryable();
            query = query.Where(c => c.Category == courseParams.Category);


            query = courseParams.OrderBy switch
            {
                "dateCreated" => query.OrderByDescending(c => c.DateCreated),
                _ => query.OrderByDescending(c => c.DateCreated)
            };

            return await PagedList<CourseDto>.CreateAsync(query.ProjectTo<CourseDto>(_mapper
            .ConfigurationProvider).AsNoTracking(), 
            courseParams.PageNumber, courseParams.PageSize);
        }

        public async Task<Course> GetCourseByIdAsync(int id)
        {
            return await _context.Course.FindAsync(id);
        }

        public async Task<Course> GetCourseByNameAsync(string name)
        {
            return await _context.Course
            .Include(p => p.CoursePhotos)
            .SingleOrDefaultAsync(c => c.Name == name);
        }

        public async Task<string> GetCourseCategory(string name)
        {
            return await _context.Course.Where(c => c.Name == name)
                .Select(c => c.Category).FirstOrDefaultAsync();
        }

       
        

        public async Task<IEnumerable<Course>> GetCoursesAsyncc()
        {
            return await _context.Course
            .Include(p => p.CoursePhotos)
            .ToListAsync();
        }

        public void Update(Course course)
        {
            _context.Entry(course).State = EntityState.Modified;
        }
    }
}