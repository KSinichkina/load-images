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

  addItem(tooltip: string, files: File[]):any {

    return this.http.post(this.itemUploadURL, {files, tooltip});
  }

  editItem(editableItemId: Object, tooltip: string, files: File[]):any {

    return this.http.post(this.itemEditURL, {editableItemId, files, tooltip});
  }
}
