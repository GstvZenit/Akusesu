import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Akusesu';
  users:any;

  constructor(private accountService: AccountService, private presence: PresenceService){}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User =JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
    
  }

  playError(){
    //console.log("Playing Sound");
    let audio = new Audio();
    //Can externalize the variables
    audio.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/error.mp3";
    audio.load();
    return audio.play() ;
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
