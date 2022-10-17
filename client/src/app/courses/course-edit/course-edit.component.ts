import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Course } from 'src/app/_models/course';
import { CoursesService} from 'src/app/_services/courses.service';
import { Router } from '@angular/router';

import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courses: Partial<Course[]>;

  //usar edit form en componente ts
  @ViewChild('editForm') editForm: NgForm;
  //@Input() course: Course;
  //
  course: Course;
  //user: User;
  //Acceder a eventos del navedaor

  categoryList = [ 
    {value: 'Administracion', display: 'Administración'},
    {value: 'Idiomas', display: 'Idiomas'},
    {value: 'Medicina', display: 'Medicina'},
    {value: 'Negocios', display: 'Negocios'},
    {value: 'Superacion', display: 'Superación'},
    {value: 'Informatica', display: 'Informática'},
    {value: 'Artes', display: 'Artes'},
    {value: 'Ingenieria', display: 'Ingeniería'}];
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if (this.editForm.dirty){
      $event.returnValue=true;
    }
  }

  constructor(private coursesService: CoursesService, private toastr: ToastrService,private router: Router) { 
    //this.router.getCurrentNavigation().extras.state;
    this.router.getCurrentNavigation().extras.state as Course;
  }

  ngOnInit(): void {
    this.course=history.state;
    this.loadCourse();
    this.getCoursesNofilters();
    
  }

  

  getCoursesNofilters(){
    this.coursesService.getCoursesNoFilter().subscribe(courses => {
      this.courses = courses;
    })
  }
  loadCourse() {
    this.coursesService.getCourse(this.course.name).subscribe(course => {
      this.course = course;
    })

  }

  updateCourse(){
    this.coursesService.updateCourse(this.course.id,this.course).subscribe(() => {
      this.toastr.success('Curso actualizado exitosamente');
      this.editForm.reset(this.course);
    })
    
  }
  
}
