import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Course } from 'src/app/_models/course';
import { CoursesService } from 'src/app/_services/courses.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses: Partial<Course[]>;
  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getCoursesNofilters();
  }
  
  getCoursesNofilters(){
    this.coursesService.getCoursesNoFilter().subscribe(courses => {
      this.courses = courses;
    })
  }
}
