import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private cdRef: ChangeDetectorRef) { }

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    const isLoggedInInSessionStorage = sessionStorage.getItem("user");

    if (isLoggedInInSessionStorage !== null && isLoggedInInSessionStorage !== "" && isLoggedInInSessionStorage !== undefined) {
      this.isLoggedIn = true;
    }

    this.cdRef.detectChanges();
  }

  onLogout(){
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }



}
