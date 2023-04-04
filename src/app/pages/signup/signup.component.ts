import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/shared/services/signup.service';
import { UserModel } from 'src/shared/Users.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    emailCon: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  });

  isSubmitted = false;

  constructor(private router: Router, private signupService: SignupService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signupForm);

    const user: UserModel = {
      email: this.signupForm.controls.email.value,
      auth: [
        {
          question: this.signupForm.controls.question.value,
          answer: this.signupForm.controls.answer.value,
        },
      ],
      isAuth: false,
    };

    console.log(user);

    this.signupService.addUser(user).subscribe(res => {
      console.log('user created:', res)
      this.router.navigate(['/'])
    })
  }
}
