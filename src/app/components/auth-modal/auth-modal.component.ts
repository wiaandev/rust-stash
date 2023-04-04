import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  answerForm = new FormGroup({
    answer: new FormControl('', Validators.required),
  });

  user: any;

  isSubmitted = false;
  foundUser: boolean = false;
  data:any;
  userStored:any;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.getUsers();
  }

  onSubmit() {
    // this.isSubmitted = true;
    let email = this.authForm.controls.email.value
    // console.log(email);
    this.authService.checkEmail(email).subscribe({
      next: data => {
        this.foundUser = true;
        this.data = data;
      },
      error: err => {
        console.log(err);
      }
    });
    console.log('Click event')
    return this.data;
  }

  // TODO: Update the model to set their isAuth key to true
  onLogin(){
    let answer = this.answerForm.controls.answer.value;
    if(answer === this.data.auth[0].answer){
      this.router.navigate(['/stash']);
      console.log('correct');
      this.user = this.data['_id'];
      console.log(this.user);
      this.userStored = sessionStorage.setItem('user', this.user);
    }
    console.log('onNext started')
  }
}
