using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class EnrollController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public EnrollController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{name}")]
        public async Task<ActionResult> AddEnroll(string name)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.EnrollRepository.GetUserEnrolled(userId);
            var course = await _unitOfWork.CourseRepository.GetCourseByNameAsync(name);

            if (course == null) return NotFound();

            var userCOurse = await _unitOfWork.EnrollRepository.GetAppUserCourse(userId, course.Id);

            if (userCOurse != null) return BadRequest("Ya Estas inscrito en este curso");

            //

            userCOurse = new AppUserCourse
            {
                sourceUserId = userId,
                CourseId = course.Id
            };
            user.UserCourses.Add(userCOurse);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Fallo al inscribirse al curso");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserCoursesDto>>> GetUserCourses([FromQuery] EnrollParams enrollParams)
        {
            enrollParams.UserId = User.GetUserId();
            var courses = await _unitOfWork.EnrollRepository.GetUserCourses(enrollParams);

            Response.AddPaginationHeader(courses.CurrentPage,
            courses.PageSize, courses.TotalCount, courses.TotalPages);
            return Ok(courses);
        }

        [HttpGet("course-users/{Id}")]
        public async Task<ActionResult<IEnumerable<CourseUsersDto>>> GetCourseUsers([FromQuery] EnrollParams enrollParams, int id)
        {
            
            enrollParams.CourseId = id;
            var users = await _unitOfWork.EnrollRepository.GetCourseUsers(enrollParams);

            Response.AddPaginationHeader(users.CurrentPage,
            users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}