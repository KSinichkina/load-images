import { Component } from '@angular/core';
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

  constructor(private listService: ListService, private ListItemsService: ListItemsService) {
    this.editItems = [];
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.listService
      .getList()
      .subscribe(items => this.items = items);
  }

  itemEdit(event, item) {
    this.items.map(val => val.isInEditItem = false);
    item.isInEditItem = true;
    this.ListItemsService.editItem(item);
  }

  itemRemove(event, item) {
    if (!this.editItems[item.id]) {
      item.isRemovedItem = true;
      this.editItems.push(item.id);
      this.ListItemsService.removedAction(this.editItems);
    }
  }
}
