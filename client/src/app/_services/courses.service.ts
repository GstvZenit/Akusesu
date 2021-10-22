import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { Course } from '../_models/course';
import { CourseParams } from '../_models/courseParams';
import { AccountService } from './account.service';
import { map, reduce, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  baseUrl = environment.apiUrl;

  //service para guardar data
  courses: Course[] = [];
  courseCache = new Map();
  course: Course;
  courseParams: CourseParams;
  user: User;
  userParams: UserParams; 

  constructor(private http: HttpClient, private accountService: AccountService) { 
    /*this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })*/
    this.courseParams = new CourseParams();

    
  }

  getCourseParams() {
    return this.courseParams;
  }
  setCourseParams(params: CourseParams) {
    this.courseParams = params;
  }
  resetCourseParams() {
    this.courseParams = new CourseParams();
    return this.courseParams
  }

















  getCourses(courseParams: CourseParams){
    //llave para mem cache
    var response = this.courseCache.get(Object.values(courseParams).join('-'));
    if(response) {
      return of (response);
    }
    
    let params = getPaginationHeaders(courseParams.pageNumber, courseParams.pageSize)
    //filtros rollback(?) reimplemnt
    
    params = params.append('category', courseParams.category);
    params = params.append('orderBy', courseParams.orderBy);
    //
    return getPaginatedResult<Course[]>(this.baseUrl + 'course', params, this.http)
      //guardar array de miembros en cache si existe nueva query
      
      .pipe(map(response => {
        this.courseCache.set(Object.values(courseParams).join('-'), response);
        return response;
      }))
  }


  getCourse(name: string){
    //obtienendo miembro unico de map Member cache
    const course = [...this.courseCache.values()]
    //reducir array de miembros
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((course: Course) => course.name === name);
    
    if(course) {
      return of(course);
    }

    return this.http.get<Course>(this.baseUrl + 'course/' + name);
  }
  
  getCoursesNoFilter() {
    return this.http.get<Partial<Course[]>>(this.baseUrl + 'course/courses');
  }


  addCourse(course: Course){
    return this.http.post(this.baseUrl + 'course/add-course', course);
  }
  addEnroll(name: string){
    return this.http.post(this.baseUrl + 'enroll/' + name, {})
  }

  getEnrolls(pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Partial<Course[]>>(this.baseUrl + 'enroll', params, this.http);
  }

  updateCourse(id: number, course: Course){
    return this.http.patch(this.baseUrl + 'course/update-course/' + id, course);
  }

  deleteCourse(id: number) {
    return this.http.delete(this.baseUrl + 'course/delete-course/' + id);
  }



  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'course/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'course/delete-photo/' + photoId);
  }
    // services para los likes
    //implementar enrollments relacion appUser-Course a partir de esto(?)
    /*
  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }
  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
  }*/
}
