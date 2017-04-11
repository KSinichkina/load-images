import { Component } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { ListService } from './items-list.service';
import { ListItemsService }     from './../service/edit-item.service.ts';

@Component({
  selector: 'items-list',
  styleUrls: ['./items-list.component.scss'],
  templateUrl: './items-list.component.html',
  providers: [ ListService ]
})
export class ItemsListComponent {
  private items: Array<{id: number, src: string, tooltip: string, isInEditItem?: boolean}>;
  private editItems: Array<number>;
  private subscription: Subscription;

  constructor(private listService: ListService, private ListItemsService: ListItemsService) {
    this.editItems = [];

    this.subscription = ListItemsService.getItems$.subscribe(items => this.items = items.json());
  }

  private ngOnInit(): void {
    this.getList();
  }

  private getList(): void {
    this.listService
      .getList()
      .subscribe(items => this.items = items);
  }

  private itemEdit(event, item) {
    this.items.map(val => val.isInEditItem = false);
    item.isInEditItem = true;
    this.ListItemsService.editItem(item);
  }

  private itemRemove(event, item) {
    if (!this.editItems[item.id]) {
      item.isRemovedItem = true;
      this.editItems.push(item.id);
      this.ListItemsService.removedAction(this.editItems);
    }
  }

  private ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
