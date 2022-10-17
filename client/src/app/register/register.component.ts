import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  

  constructor(private accountService: AccountService, private toaster: ToastrService, 
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate =new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -3);
    

  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    //si la contraseña cambia revisamos el valor de password con confirmPassword(vicevers)
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
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





  register(){
    
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/courses');
      this.playSuccess();
      this.cancel();
    }, error => {
      this.validationErrors =error;
    })
    
  }


  cancel(){
   this.cancelRegister.emit(false);
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
