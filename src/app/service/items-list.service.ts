import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable }        from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class ListService {

  private itemListUrl = 'http://localhost:3030/load-list';
  private itemRemoveURL = 'http://localhost:3030/remove';
  private itemUploadURL = 'http://localhost:3030/upload-image-data';
  private itemEditURL = 'http://localhost:3030/edit';

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

  removeItems(items: Array<number>):any {
    return this.http.post(this.itemRemoveURL, items);
  }

  addItem(tooltip: string, files: any):any {
    if (files && files.length !== 0) {
      let file = files.item(0);
      let fileData = {
        modified: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type
      };

      return this.http.post(this.itemUploadURL, {fileData, tooltip});
    } else {

      return this.http.post(this.itemUploadURL, {tooltip});
    }
  }

  editItem(editableItemId: Object, tooltip: string, files: any):any {
    if (files && files.length !== 0) {
      let file = files.item(0);
      let fileData = {
        modified: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type
      };

      return this.http.post(this.itemEditURL, {editableItemId, fileData, tooltip});
    } else {

      return this.http.post(this.itemEditURL, {editableItemId, tooltip});
    }
  }
}
