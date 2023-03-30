import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isLoggedIn: boolean = false;
  authMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickHandler(){
    console.log('clicked');
  }

  images = [
    "../../../assets/wood.png",
    "../../../assets/image 2.png",
    "../../../assets/image 3.png",
    "../../../assets/image 4.png",
    "../../../assets/image 5.png",
    "../../../assets/image 6.png",
    "../../../assets/image 7.png",
    "../../../assets/image 8.png",
    "../../../assets/image 9.png",
    "../../../assets/image 10.png",
    "../../../assets/image 11.png",
    "../../../assets/image 12.png",
    "../../../assets/image 13.png",
    "../../../assets/image 14.png",
    "../../../assets/image 15.png",
    "../../../assets/image 16.png",
    "../../../assets/image 17.png",
    "../../../assets/image 18.png",
    "../../../assets/image 19.png",
    "../../../assets/image 20.png",
    "../../../assets/image 21.png",
  ]

  checkUser(){
    this.authMode = true;
    if(sessionStorage.getItem('user') !== ''){
      this.isLoggedIn = true;
    } else{
      this.isLoggedIn = false;
    }
  }

}
