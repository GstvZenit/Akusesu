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

  addCourse(course: Course){
    this.playSuccess();
    this.coursesService.addEnroll(course.name).subscribe(() => {
      this.toastr.success('Te has inscrito al curso' + course.name);
    })
  }

  playSuccess(){
    //console.log("Playing Sound");
    let audio = new Audio();
    //Can externalize the variables
    audio.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3";
    audio.load();
    return audio.play() ;
  }
}
