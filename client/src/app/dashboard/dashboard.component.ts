import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model: any = {}
  isDark: boolean | undefined;

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    this.isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme();
  }

  login(){
    this.playSuccess();
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/courses');
    })

  }

  logout(){
    this.accountService.logout();
    this.playError();
    this.router.navigateByUrl('/');

  }
//cambiar tema
  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.setTheme();
  }

  setTheme(): void {
    document.documentElement.classList.toggle('dark-theme', this.isDark);
    this.overlayContainer.getContainerElement().classList.toggle('dark-theme', this.isDark);
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
