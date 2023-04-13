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
  }

  onSubmit() {
    let email = this.authForm.controls.email.value
    this.authService.checkEmail(email).subscribe({
      next: data => {
        this.foundUser = true;
        this.data = data;
      },
      error: err => {
      }
    });
    return this.data;
  }

  onLogin(){
    let answer = this.answerForm.controls.answer.value;
    if(answer === this.data.auth[0].answer){
      this.router.navigate(['/stash']);
      this.user = this.data['_id'];
      this.userStored = sessionStorage.setItem('user', this.user);
    }
  }
}
