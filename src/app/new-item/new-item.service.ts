import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';

@Injectable()
export class UploadService {
  private itemRemoveURL = 'http://localhost:3030/remove';
  private itemUploadURL = 'http://localhost:3030/uploadImageData';
  private itemEditURL = 'http://localhost:3030/edit';

  constructor (private http:Http) {
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
