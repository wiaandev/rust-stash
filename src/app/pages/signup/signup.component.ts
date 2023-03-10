import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signUpForm: NgForm;
  user = {
    email: '',
    emailCon: '',
  };

  isSubmitted = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.user.email = this.signUpForm.value.email;
    this.user.emailCon = this.signUpForm.value.emailCon;
    console.log(this.signUpForm);
    if(this.user.email !== this.user.emailCon){
      console.log("Hierdie ding werk nie");
    }else {
      this.router.navigate(['/stash', {relativeTo: this.router}]);
      console.log("navigating")
    }
  }
}
