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
    {value: 'Administracion', display: 'Administración'},
    {value: 'Idiomas', display: 'Idiomas'},
    {value: 'Medicina', display: 'Medicina'},
    {value: 'Negocios', display: 'Negocios'},
    {value: 'Superacion', display: 'Superación'},
    {value: 'Informatica', display: 'Informática'},
    {value: 'Artes', display: 'Artes'},
    {value: 'Ingenieria', display: 'Ingeniería'}];

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
    this.playError();
    this.loadCourses();
  }
  pageChanged(event: any) {
    this.courseParams.pageNumber = event.page;
    this.coursesService.setCourseParams(this.courseParams);
    this.loadCourses();
  }

  playSuccess(){
    //console.log("Playing Sound");
    let audio = new Audio();
    //Can externalize the variables
    audio.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3";
    audio.load();
    return audio.play() ;
  }
  playError(){
    //console.log("Playing Sound");
    let audio = new Audio();
    //Can externalize the variables
    audio.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/error.mp3";
    audio.load();
    return audio.play() ;
  }

}
