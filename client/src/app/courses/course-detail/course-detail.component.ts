import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';
import { Course } from 'src/app/_models/course';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CoursesService } from 'src/app/_services/courses.service';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  
  
  @ViewChild('courseTabs', {static: true}) memberTabs: TabsetComponent; //rerecieando la variable template service #memberTabs
  course: Course;
  courses: Partial<Course[]>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  user: User;
  toastr: any;
  members: Partial<Member[]>;
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;


  constructor(private route: ActivatedRoute, private accountService: AccountService, private coursesService: CoursesService,
    private router: Router,private memberService: MembersService) { 
      //*****
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //**** */
    }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.course=data.course;
    })

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions=[
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages = this.getImages();
    

  }
  
  loadUsersEnrolled() {
    this.coursesService.getUsersEnrolled(this.course.id, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;

    })
  }
  
  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for (const photo of this.course.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }
  
  onTabActivated(data: TabDirective) {
    this.activeTab= data;
    
  }  //implemntar estudiantes temas quizes, a partir de esto(?)


  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

  addCourse(course: Course){
    this.playSuccess();
    this.coursesService.addEnroll(course.name).subscribe(() => {
      this.toastr.success('Te has inscrito al curso');
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadUsersEnrolled();
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
