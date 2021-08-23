import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/_models/course';
import { CoursesService } from 'src/app/_services/courses.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

@Input() course: Course;
  constructor(private coursesService: CoursesService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
    //funcionalidades Like feuatere
    //implementar enrollment a partir de esto(?)
    /*
  addLike(member: Member){
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('Le has dado like a ' + member.knownAs);
    })
  }*/
}
