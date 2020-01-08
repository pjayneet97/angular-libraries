import { Component } from '@angular/core';
import { AuthenticationService } from 'authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'authtest';
  mode
  constructor(public auth:AuthenticationService){
    
  }
}
