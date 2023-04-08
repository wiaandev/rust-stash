import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  isLoggedIn: boolean = true;

  ngOnInit(): void {
    if(sessionStorage.getItem === null){
      this.isLoggedIn = false
    }
  }

  onLogout(){
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }



}
