import { Component } from '@angular/core';
import { faBars, faCalendarAlt, faPlusCircle, faChartBar, faTags, faMoneyBill,faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public isSidebarHidden = false;
  public barIcon = faBars

  public data = [
    {
      path: '/all-months',
      icon: faCalendarAlt,
      name: 'All Months'
    },
    {
      path: '/add-expense',
      icon: faPlusCircle,
      name: 'Add New Expense'
    }
  ];

  constructor() {
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}

