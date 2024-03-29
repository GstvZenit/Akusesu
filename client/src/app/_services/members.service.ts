import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, reduce, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  //service para guardar data
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;  

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
   }

   getUserParams() {
     return this.userParams;
   }
   setUserParams(params: UserParams) {
     this.userParams = params;
   }
   resetUserParams() {
     this.userParams = new UserParams(this.user);
     return this.userParams
   }

  getMembers(userParams: UserParams){
    //llave para mem cache
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response) {
      return of (response);
    }
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize)
    //filtros rollback(?) reimplemnt
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    //
    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
      //guardar array de miembros en cache si existe nueva query
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  

  getMember(username: string){
    //obtienendo miembro unico de map Member cache
    const member = [...this.memberCache.values()]
    //reducir array de miembros
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((member: Member) => member.username === username);
    
    if(member) {
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }


  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
  

    // services para los likes
  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }
  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
  }


  getUsersEnrolled(id:number, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Partial<User[]>>(this.baseUrl + 'enroll/course-users/' +id, params, this.http);
  }
  
  
}
