import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items;

  constructor() {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'Atlanta',
      'Austin',
      'Baltimore',
      'Boston',
      'Charlotte',
      'Chicago',
      'Dallas',
      'Houston',
      'Las Vegas',
      'Los Angeles',
      'Miami',
      'New York City',
      'Philadelphia',
      'San Diego',
      'San Francisco',
      'Seattle',
      'Washington',
    ]
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}