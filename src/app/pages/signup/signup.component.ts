import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') signUpForm: NgForm;
  user = {
    email: '',
    emailCon: ''
  }

  isSubmitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.user.email = this.signUpForm.value.email;
    this.user.emailCon = this.signUpForm.value.emailCon;
    console.log(this.signUpForm);
  }

}
