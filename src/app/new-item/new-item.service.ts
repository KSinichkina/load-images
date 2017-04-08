import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';


@Injectable()
export class UploadService {
  public progress: any;
  public progressObserver: any;
  private itemRemoveURL = 'http://localhost:3030/remove';  // URL to web api
  private itemUploadURL = 'http://localhost:3030/uploadImageData';
  private itemEditURL = 'http://localhost:3030/edit';

  constructor (private http:Http) {
    this.progress = Observable.create(observer => {
      this.progressObserver = observer
    }).share();
  }

  removeItems(items: Array<number>):any {

    return this.http.post(this.itemRemoveURL, items)
          .subscribe(data => {
              console.log(data);
            }, error => {
              console.log(error.json());
            });

  }

  addItem(tooltip: string, files: File[]):any {

    return this.http.post(this.itemUploadURL, {files, tooltip})
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error.json());
      });

  }

  editItem(editableItemId: Object, tooltip: string, files: File[]):any {

    return this.http.post(this.itemEditURL, {editableItemId, files, tooltip})
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error.json());
      });

  }
}
