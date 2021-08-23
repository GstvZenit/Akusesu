import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/course';
import { CourseParams } from 'src/app/_models/courseParams';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { CoursesService } from 'src/app/_services/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  pagination: Pagination;
  courseParams: CourseParams;
  userParams: UserParams;
  user: User;
  course:Course;

  categoryList = [ 
  {value: 'Cultura', display: 'Cultura'},
  {value: 'Cultura2', display: 'Cultura2'},
  {value: 'business', display: 'Negocios'},
  {value: 'art', display: 'Artes'},
  {value: 'engineering', display: 'Ingenieria'}];

  constructor(private coursesService: CoursesService) {
    this.courseParams = this.coursesService.getCourseParams();
   }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(){
    //establcer user params incld filtrs
    this.coursesService.setCourseParams(this.courseParams);

    this.coursesService.getCourses(this.courseParams).subscribe(response => {
      this.courses = response.result;
      this.pagination = response.pagination;
    })
  }
  resetFilters(){
    this.courseParams = this.coursesService.resetCourseParams();
    this.loadCourses();
  }
  pageChanged(event: any) {
    this.courseParams.pageNumber = event.page;
    this.coursesService.setCourseParams(this.courseParams);
    this.loadCourses();
  }

}
