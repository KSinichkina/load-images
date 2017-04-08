import { Component, Input, OnDestroy } from '@angular/core';
import { UploadService } from './new-item.service';

import { ListItemsService } from './../service/edit-item.service.ts';
import { Subscription }   from 'rxjs/Subscription';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'new-item',
  styleUrls: ['./new-item.component.scss'],
  templateUrl: './new-item.component.html',
  providers: [ UploadService, ListItemsService ]
})
export class NewItemComponent {
  private files: File[];
  private tooltip: string;
  private isFileChanged: boolean;
  private isInputChanged: boolean;
  private isRemoveAction: boolean;
  private isEditAction: boolean;
  private removedItems: Array<number>;
  private editableItem: Object;
  private subscription: Subscription;
  private subscriptionRemoved: Subscription;
  private uploader:FileUploader = new FileUploader({url:'http://localhost:3030/upload'});

  constructor(private UploadService:UploadService, private ListItemsService: ListItemsService) {

    this.editableItem = {src: '', tooltip: ''};

    this.subscription = ListItemsService.editItem$.subscribe(
      editableItem => {
        this.isEditAction = true;
        this.editableItem = editableItem;
    });

    this.subscriptionRemoved = ListItemsService.removedAction$.subscribe(
      removedItems => {
        this.isRemoveAction = removedItems.length > 0 || false;
        this.removedItems = removedItems;
      }
    );
  }

  onFileLoadChange(event) {
    let reader = new FileReader();
    let image = <HTMLInputElement>document.querySelector('.image-preview');

    reader.onload = function(event) {
      if (image) {
        image.src = event.srcElement.result;
      }
    };

    reader.readAsDataURL(event.target.files[0]);

    this.files = event.srcElement.files;
    this.isFileChanged =  true;
  }

  onInputChange(event) {
    this.tooltip = event.srcElement.value;
    this.isInputChanged =  true;
  }

  onSave(event) {
    if (!this.isEditAction) {
      this.UploadService.addItem(this.tooltip, this.files);
    } else if (this.isFileChanged) {
      this.UploadService.editItem(this.editableItem, this.tooltip, this.files);
    }
    this.isEditAction = false;
    this.isFileChanged = false;
    this.isInputChanged = false;

    //remove editable marker
    //clear fields
  }

  onSaveAll() {
    //make server remove action
    if (!this.isEditAction) {
      if (this.removedItems) {
        this.UploadService.removeItems(this.removedItems);
        this.isRemoveAction = false;
      }
      if (this.isFileChanged) {
        this.UploadService.addItem(this.tooltip, this.files);
        this.isFileChanged = false;
        this.isInputChanged = false;
      }
    } else {
      this.UploadService.editItem(this.editableItem, this.tooltip, this.files);
      this.isEditAction = false;
    }

    //document.querySelectorAll('.remove')
    //clear fields
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionRemoved.unsubscribe();
  }
}
