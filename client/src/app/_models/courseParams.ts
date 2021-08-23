import { Course } from "./course";

export class CourseParams {
    category: string;
    pageNumber = 1;
    pageSize =5;
    orderBy = 'dateCreated';

    /*constructor(course: Course) {
        this.category = course.category === 'technology' ? 'cultural' : 'technology'
    }*/
}