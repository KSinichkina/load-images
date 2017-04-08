import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ListItemsService {
  private editItemSource = new Subject<any>();
  private removedActionSource = new Subject<any>();

  removedAction$ = this.removedActionSource.asObservable();
  editItem$ = this.editItemSource.asObservable();

  editItem(item: any) {
    this.editItemSource.next(item);
  }
  removedAction(removedItem: Array<number>) {
    this.removedActionSource.next(removedItem);
  }
}
