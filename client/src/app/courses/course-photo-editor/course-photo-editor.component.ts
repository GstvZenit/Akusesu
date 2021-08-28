import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Course } from 'src/app/_models/course';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { CoursesService } from 'src/app/_services/courses.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-photo-editor',
  templateUrl: './course-photo-editor.component.html',
  styleUrls: ['./course-photo-editor.component.css']
})
export class CoursePhotoEditorComponent implements OnInit {
  //@Input() member: Member;
  @Input() course: Course;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private coursesService: CoursesService, private router: Router) { 
    this.router.getCurrentNavigation().extras.state;
    this.router.getCurrentNavigation().extras.state as Course;
  }

  ngOnInit(): void {
    this.course=history.state;
    this.initializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }


  setMainPhoto(photo: Photo){
    this.coursesService.setMainPhoto(photo.id).subscribe(() => {
      this.course.coursePhotourl = photo.url;
      this.coursesService.getCourse(this.course.name);
      this.course.coursePhotourl = photo.url;
      this.course.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: number){
    this.coursesService.deletePhoto(photoId).subscribe(() => {
      this.course.photos = this.course.photos.filter(x => x.id !== photoId);
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'course/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.course.photos.push(photo);
        //actualizar la foto como principal si es la primera)
        if (photo.isMain){
          this.course.coursePhotourl = photo.url;
          //this.course.coursePhotourl = photo.url;
          //this.coursesService.setCurrentUser(this.user);
        }
      }
    }
  }

}