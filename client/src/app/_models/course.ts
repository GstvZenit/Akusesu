import { Photo } from './photo';
import { Member } from './member';

export interface Course {
    id: number;
    name: string;
    coursePhotourl: string;
    description: string;
    dateCreated: Date;
    instructorId: number;
    instructorUsername: string;
    instructorPhotoUrl: string;
    category: string;
    institution: string;
    duration: string;
    photos: Photo[];
    students: Member[];
}
