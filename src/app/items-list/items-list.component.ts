import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { ListService } from './../service/items-list.service.ts';
import { ItemsCommunictionService }     from './../service/item.communication.service';

@Component({
  selector: 'items-list',
  styleUrls: ['./items-list.component.scss'],
  templateUrl: './items-list.component.html'
})
export class ItemsListComponent implements OnInit, OnDestroy {
  private items: Array<{id: number, src: string, tooltip: string, isInEditItem?: boolean}>;
  private editItems: Array<number>;
  private subscription: Subscription;

  constructor(private listService: ListService, private ItemsCommunictionService: ItemsCommunictionService) {
    this.editItems = [];

    this.subscription = ItemsCommunictionService.getItems$.subscribe(items => this.items = items.json());
  }

  ngOnInit(): void {
    this.listService
      .getList()
      .subscribe(items => this.items = items);
  }

  private itemEdit(event, item) {
    this.items.map(val => val.isInEditItem = false);
    item.isInEditItem = true;
    this.ItemsCommunictionService.editItem(item);
  }

  private itemRemove(event, item) {
    if (!this.editItems[item.id]) {
      item.isRemovedItem = true;
      this.editItems.push(item.id);
      this.ItemsCommunictionService.removedAction(this.editItems);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
