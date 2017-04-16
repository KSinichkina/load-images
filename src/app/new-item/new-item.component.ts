import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormsModule }   from '@angular/forms';

import { ListService } from './../service/items-list.service.ts';
import { ItemsCommunictionService } from './../service/item.communication.service';
import { Subscription }   from 'rxjs/Subscription';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'new-item',
  styleUrls: ['./new-item.component.scss'],
  templateUrl: './new-item.component.html'
})
export class NewItemComponent implements OnDestroy {
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

  constructor(private ItemsCommunictionService: ItemsCommunictionService, private ListService: ListService) {

    this.editableItem = {src: '', tooltip: ''};

    this.subscription = ItemsCommunictionService.editItem$.subscribe(
      editableItem => {
        this.isEditAction = true;
        this.isFileChanged = true;
        this.editableItem = editableItem;
    });

    this.subscriptionRemoved = ItemsCommunictionService.removedAction$.subscribe(
      removedItems => {
        this.isRemoveAction = removedItems.length > 0 || false;
        this.removedItems = removedItems;
      }
    );
  }

  private onFileLoadChange(event) {
    let reader = new FileReader();
    let image = <HTMLInputElement>document.querySelector('.image-preview');

    reader.onload = function(event: any) {
      if (image) {
        image.src = event.srcElement.result;
      }
    };

    reader.readAsDataURL(event.target.files[0]);

    this.files = event.srcElement.files;
    this.isFileChanged =  true;
  }

  private onInputChange(event) {
    this.tooltip = event.srcElement.value;
    this.isInputChanged =  true;
  }

  private onSave(event) {
    this.handleRequest();
  }

  private onSaveAll() {
    this.handleRequest();
  }

  private handleRequest() {
    if (!this.isEditAction) {
      if (this.removedItems) {
        this.ListService.removeItems(this.removedItems).subscribe(items => {
          this.ItemsCommunictionService.getItems(items);

          this.isRemoveAction = false;
        });
      }
      if (this.isFileChanged) {
        this.ListService.addItem(this.tooltip, this.files).subscribe(items => {
          this.ItemsCommunictionService.getItems(items);

          this.isFileChanged = false;
          this.isInputChanged = false;
        });
      }
    } else {
      this.ListService.editItem(this.editableItem, this.tooltip, this.files).subscribe(items => {
        this.ItemsCommunictionService.getItems(items);

        this.isEditAction = false;
      });
    }
    this.resetForm();
  }

  private resetForm() {
    this.editableItem = {src: '', tooltip: ''};
    this.isFileChanged = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionRemoved.unsubscribe();
  }
}
