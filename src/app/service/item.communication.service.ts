import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ItemsCommunictionService {
  private editItemSource = new Subject<any>();
  private getItemsSource = new Subject<any>();
  private removedActionSource = new Subject<any>();

  removedAction$ = this.removedActionSource.asObservable();
  editItem$ = this.editItemSource.asObservable();
  getItems$ = this.getItemsSource.asObservable();

  editItem(item: any) {
    this.editItemSource.next(item);
  }
  removedAction(removedItem: Array<number>) {
    this.removedActionSource.next(removedItem);
  }
  getItems(item: any) {
    this.getItemsSource.next(item);
  }
}
