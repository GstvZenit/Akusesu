using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.Helpers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class CourseController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public CourseController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService, DataContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _photoService = photoService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            
            
        }
        
        [HttpPost("add-course")]
        public async Task<ActionResult> AddCourse(CourseAddDto courseAddDto)
        {
            var sourceUserId = User.GetUserId();
            var userName = User.GetUsername();
            if (await CourseExists(courseAddDto.Name)) return BadRequest("Nombre de curso no disponible");
            

            //var course = _mapper.Map<Course>(courseAddDto);  

            
            //obteniendo el username e id del creador del curso (que sera el instructor)

             //_mapper.Map(courseAddDto, course);




            //_context.Course.Add(course);   *
           // await _context.SaveChangesAsync();  *




            //await _unitOfWork.Complete();
            //var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());


            //var username = await _unitOfWork.UserRepository.GetUserName(User.GetUsername());
            //int userId = await _unitOfWork.UserRepository.GetUserId(User.GetUsername());

            var username = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            //var userId = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
            //int Id = username.Id;
           
            //int userId=User.GetUserId();
            //int userId = int.Parse(_userManager.GetUserId(HttpContext.User));
            //int userId = User.GetUserId();
            //int userId = int.Parse(_userManager.GetUserId(HttpContext.User));
            //int userId = int.Parse(_userManager.GetUserId(User));
            //int userId = SignInManager
//.AuthenticationManager
//.AuthenticationResponseGrant.Identity.GetUserId();
            //int userId = User.GetUserId();

            //course.Name = courseAddDto.Name;
            
            //_mapper.Map(courseAddDto, course);

            /*
            return new CourseAddDto
            {
                Name = course.Name,
                Description = course.Description,
                //InstructorId = 1,
                //InstructorUsername = "dora",
                Category = course.Category,
                Institution = course.Institution,
                Duration = course.Duration
            };*/

            var course = new Course
            {
                Name = courseAddDto.Name,
                Description = courseAddDto.Description,
                InstructorId = sourceUserId,
                InstructorUsername = userName,
                Category = courseAddDto.Category,
                Institution = courseAddDto.Institution,
                Duration = courseAddDto.Duration
            };
            _context.Course.Add(course);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("No se pudo agregar curso");

        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses([FromQuery] CourseParams courseParams)
        {
            //rollback

            //
            var courses = await _unitOfWork.CourseRepository.GetCoursesAsync(courseParams);

            Response.AddPaginationHeader(courses.CurrentPage, courses.PageSize, courses.TotalCount, courses.TotalPages);

            return Ok(courses);
        }

         [HttpGet("courses")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCoursesNoFilter()
        {
            //rollback

            //
            var courses = await _unitOfWork.CourseRepository.GetCoursesAsyncc();

            

            return Ok(courses);
        }

        [HttpGet("{name}", Name = "GetCourse")]
        public async Task<ActionResult<CourseDto>> GetCourse(string name)
        {
            return await _unitOfWork.CourseRepository.GetCourseAsync(name);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> UpdateCourse(int Id, CourseUpdateDto courseUpdateDto)
        {
            //obteniendo username a traves del token
            //var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            //investigar como obtener el curso que se deasea actualizar
            //usando automapper memberUpdateDto
            var course = _mapper.Map<Course>(courseUpdateDto);
            course.Id = Id;
            //
            _mapper.Map(courseUpdateDto, course);

            _unitOfWork.CourseRepository.Update(course);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("{Id}", Name = "add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, int Id, CourseUpdateDto courseUpdateDto)
        {
            //var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var course = _mapper.Map<Course>(courseUpdateDto);
            course.Id = Id;


            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);
            var photo = new CoursePhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (course.CoursePhotos.Count == 0)
            {
                photo.IsMain = true;
            }
            course.CoursePhotos.Add(photo);
            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetCourse", new { name = course.Name }, _mapper.Map<PhotoDto>(photo));
            }


            return BadRequest("Problem adding photo");
        }

        [HttpPut("{Id}", Name = "set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId, int Id, CourseUpdateDto courseUpdateDto)
        {
            //var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var course = _mapper.Map<Course>(courseUpdateDto);
            course.Id = Id;

            var photo = course.CoursePhotos.FirstOrDefault(x => x.Id == photoId);
            if (photo.IsMain) return BadRequest("Esta ya es la principal del curso");
            var currentMain = course.CoursePhotos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;
            if (await _unitOfWork.Complete()) return NoContent();
            return BadRequest("Fallo al seleccionar foto principal");
        }


        [HttpDelete("{Id}", Name = "delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId, int Id, CourseUpdateDto courseUpdateDto)
        {
            //var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var course = _mapper.Map<Course>(courseUpdateDto);
            course.Id = Id;

            var photo = course.CoursePhotos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("No puedes eliminar la foto principal del curso");
            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }
            course.CoursePhotos.Remove(photo);
            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Error al eliminar foto");

        }

        private async Task<bool> CourseExists(string name)
        {
            return await _context.Course.AnyAsync(x => x.Name == name);
        }
    }
}