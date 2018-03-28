import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lesson} from '../model/lesson';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class LessonsService {

  constructor(private http: HttpClient) {

  }

  loadAllLessons(): Observable<Lesson[]> {
    return this.http.get<any>('https://localhost:9000/api/lessons')
      .map(res => res.lessons);
  }

  findLessonById(id: number) {
    return this.http.get<Lesson>('https://localhost:9000/api/lessons/' + id);
  }

}

