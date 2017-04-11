import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable }        from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class ListService {

  private itemListUrl = 'http://localhost:3030/';

  constructor(private http:Http) {
  }

  getList():Observable<any> {
    return this.http.get(this.itemListUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
