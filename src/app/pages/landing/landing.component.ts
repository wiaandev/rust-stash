import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  isDesktopOrBigger: boolean;
  isLoggedIn: boolean = false;
  authMode: boolean = false;

  constructor(private router: Router, breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => {
        this.isDesktopOrBigger = !result.matches;
      });
  }

  ngOnInit(): void {}

  clickHandler() {}

  images = [
    '../../../assets/wood.png',
    '../../../assets/image 2.png',
    '../../../assets/image 3.png',
    '../../../assets/image 4.png',
    '../../../assets/image 5.png',
    '../../../assets/image 6.png',
    '../../../assets/image 7.png',
    '../../../assets/image 8.png',
    '../../../assets/image 9.png',
    '../../../assets/image 10.png',
    '../../../assets/image 11.png',
    '../../../assets/image 12.png',
    '../../../assets/image 13.png',
    '../../../assets/image 14.png',
    '../../../assets/image 15.png',
    '../../../assets/image 16.png',
    '../../../assets/image 17.png',
    '../../../assets/image 18.png',
    '../../../assets/image 19.png',
    '../../../assets/image 20.png',
    '../../../assets/image 21.png',
  ];

  checkUser() {
    if (sessionStorage.getItem('user') === null) {
      this.authMode = true;
    } else {
      this.router.navigate(['/stash']);
    }
  }
}
