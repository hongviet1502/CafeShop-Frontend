import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  @Output() toggleSidebarForme: EventEmitter<any> = new EventEmitter()
  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }

  toggleSidebar(){
    this.toggleSidebarForme.emit()
  }
}
