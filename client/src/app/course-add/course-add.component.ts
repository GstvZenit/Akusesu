import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { CoursesService } from '../_services/courses.service';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  
  addCourseForm: FormGroup;
  //maxDate: Date;
  validationErrors: string[] = [];
  categoryList = [ 
    {value: 'Administracion', display: 'Administración'},
    {value: 'Idiomas', display: 'Idiomas'},
    {value: 'Medicina', display: 'Medicina'},
    {value: 'Negocios', display: 'Negocios'},
    {value: 'Superacion', display: 'Superación'},
    {value: 'Informatica', display: 'Informática'},
    {value: 'Artes', display: 'Artes'},
    {value: 'Ingenieria', display: 'Ingeniería'}];

  constructor(private accountService: AccountService, private coursesService: CoursesService ,private toaster: ToastrService, 
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    //this.maxDate =new Date();
    //this.maxDate.setFullYear(this.maxDate.getFullYear() -3);

  }

  initializeForm(){
    this.addCourseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['art'],
      institution: ['', Validators.required],
      duration: ['', Validators.required]
    })

  }
  /*
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true} //@ts-ignore
    }
  }
  */
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      // return null;
      if (control.parent && control.parent.controls) {
        return control.value ===
          (control.parent.controls as { [key: string]: AbstractControl })[
            matchTo
          ].value
          ? null
          : { isMatching: true };
      }

      return null;
    };
  }





  addCourse(){
    
    this.coursesService.addCourse(this.addCourseForm.value).subscribe(response => {
      this.router.navigateByUrl('/courses');
      this.cancel();
    }, error => {
      this.validationErrors =error;
    })
    
  }


  cancel(){
    this.router.navigateByUrl('/courses');
    this.playError();
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
