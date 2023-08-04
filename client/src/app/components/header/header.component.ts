import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router:Router){
    const token = localStorage.getItem("jwtToken")
    if(!token){
      this.router.navigate(['/login'])
    }
    
  }
  onLogout(){
      localStorage.removeItem("jwtToken")
      window.alert("You are Loggedout")
      this.router.navigate(['/login'])
  }
}
