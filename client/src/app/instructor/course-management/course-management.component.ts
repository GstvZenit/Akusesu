import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Course } from 'src/app/_models/course';
import { CoursesService } from 'src/app/_services/courses.service';

import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/_services/confirm.service';
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses: Partial<Course[]>;
  constructor(private coursesService: CoursesService, private router: Router, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.getCoursesNofilters();
    
  }
  
  getCoursesNofilters(){
    this.coursesService.getCoursesNoFilter().subscribe(courses => {
      this.courses = courses;
    })
  }

  

  deleteCourse(id: number) {
    this.confirmService.confirm('Confirmacion de eliminar el curso', 'Esto no se puede revertir').subscribe(result => {
      if (result) {
        this.coursesService.deleteCourse(id).subscribe(() => {
          this.courses.splice(this.courses.findIndex(c => c.id === id), 1)
        })
      }
    })
    
  }
}
