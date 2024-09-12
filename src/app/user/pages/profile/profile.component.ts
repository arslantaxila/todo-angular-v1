import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import {
  User
} from '../../models/user';
import { timer } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  UserForm!: FormGroup;
  id: any;
  name: any;
  email: any;
  todayDate: any;
  isSubmitted = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private authService: AuthenticationService,

  ) { }

  ngOnInit() {
    this._initUserForm();
    this.id = localStorage.getItem('id');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.todayDate = new Date();
    this.getuserform.name.setValue(this.name);
    this.getuserform.email.setValue(this.email);
  }

  private _initUserForm() {
    this.UserForm = this.formBuilder.group({
      name: [
        '',
        Validators.required

      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],
      email: [
        '', [Validators.required, Validators.email]
      ]
    });
  }

  updateUser() {

    if (this.UserForm.value.password == '') {
      this.getuserform.password.setValidators([]);
      this.getuserform.password.updateValueAndValidity();
    } else {
      this.getuserform.password.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]);
      this.getuserform.password.updateValueAndValidity();
    }

    this.isSubmitted = true;

    if (this.UserForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {

      if(this.UserForm.value.name == this.name && this.UserForm.value.email == this.email && this.UserForm.value.password == ''){
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: `No change found`,
        });
        return;
      }
      let user: User = {
        name: this.UserForm.value.name,
        email: this.UserForm.value.email,
        password: this.UserForm.value.password,
      } as User;

      this.userService.updateUser(user, this.id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User updated`,
          });
          timer(700)
            .toPromise()
            .then(() => {
              this.isSubmitted = false;
              this.UserForm.reset();
              this.authService.logout();

            });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
    }
  }

  get getuserform() {
    return this.UserForm.controls;
  }
}
