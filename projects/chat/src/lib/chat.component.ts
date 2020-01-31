import { Component, OnInit } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'lib-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  page=TabsComponent
  constructor() { }

  ngOnInit() {
  }


  
  

}
