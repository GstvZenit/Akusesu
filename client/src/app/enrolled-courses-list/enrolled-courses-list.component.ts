import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Course } from '../_models/course';
import { Pagination } from '../_models/pagination';
import { CoursesService } from '../_services/courses.service';

@Component({
  selector: 'app-enrolled-courses-list',
  templateUrl: './enrolled-courses-list.component.html',
  styleUrls: ['./enrolled-courses-list.component.css']
})
export class EnrolledCoursesListComponent implements OnInit {
  courses: Partial<Course[]>;
  pageNumber=1;
  pageSize =5;
  pagination: Pagination;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.loadEnrolls();
  }
  loadEnrolls() {
    this.coursesService.getEnrolls(this.pageNumber, this.pageSize).subscribe(response => {
      this.courses = response.result;
      this.pagination = response.pagination;

    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadEnrolls();
  }
}
