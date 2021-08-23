import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../_models/course";
import { CoursesService } from "../_services/courses.service";

@Injectable({
    providedIn: 'root'
})

export class CourseDetailedResolver implements Resolve<Course>{
    //utilizamos resolver para obtener data antes de construir del template

    constructor(private courseService: CoursesService){}
    resolve(route: ActivatedRouteSnapshot): Observable<Course>{
        return this.courseService.getCourse(route.paramMap.get('name'));
    }

}