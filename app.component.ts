import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Deers', url: '/deers/#', icon: 'cellular' },
    { title: 'Deer Logs', url: '/d_logs/#', icon: 'hand-left' },
    { title: 'Add a deer', url: '/adddeer/#', icon: 'alert-circle' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
