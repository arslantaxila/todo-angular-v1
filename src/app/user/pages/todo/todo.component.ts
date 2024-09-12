import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import {
  Status,
  Todo
} from '../../models/user';
import { timer } from 'rxjs';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  display: boolean = false;
  Statusdisplay: boolean = false;
  todos: any[] = []
  clickedTodo: any;

  TodoForm!: FormGroup;
  ChangeForm!: FormGroup;

  priority: any[] = [];
  status: any[] = []

  isSubmitted = false;
  editCasedisplay = false;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this._initTodoForm();
    this.editCasedisplay = false;
    this._getTodos();
    this._initChangeForm();

    this.priority  = [
      { "id": "Low", "name": "Low" },
      { "id": "Medium", "name": "Medium" },
      { "id": "High", "name": "High" },

    ]

    this.status = [
      {
        id: "Pending", name: "Pending"
      },
      {
        id: "Inprocess", name: "Inprocess"
      },
      {
        id: "Complete", name: "Complete"
      }
    ]
  }
  

  private _initChangeForm(){
    this.ChangeForm = this.formBuilder.group({
      status: [
        '',

        Validators.required

      ]
    })
  }

  private _initTodoForm() {
    this.TodoForm = this.formBuilder.group({
      title: [
        '',
        Validators.required

      ],
      due_date: [
        '',
        Validators.required

      ],
      priority: [
        '',
        Validators.required

      ],
    });
  }

  

  showDialog() {
    this.display = true;
    this.editCasedisplay = false;
    this._initTodoForm();
  }

  addTodo() {
    this.isSubmitted = true;
    if (this.TodoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {

      
      let todo: Todo = {
        title: this.TodoForm.value.title,
        due_date: this.datePipe.transform(
          this.TodoForm.value.due_date,
          'yyyy-MM-dd'
        ),
        priority: this.TodoForm.value.priority,
        status: 'Pending'
      } as Todo;

      this.userService.addTodo(todo).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `ToDo created`,
          });
          timer(700)
            .toPromise()
            .then(() => {
              this._getTodos();
              this.display = false;
              this.isSubmitted = false;
              this.TodoForm.reset();
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

  changeStatus(todo: any){
    this.Statusdisplay = true;
    this.clickedTodo = todo
  }

  deleteTranscript(todo: any){
    this.clickedTodo = todo
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the ToDo?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteTranscript(todo.id).subscribe(() => {
          this._getTodos();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `ToDo deleted successfully`,
          });

        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Delete Cancelled!',
        });
      },
    });
  }

  
  changeStatusSubmit() {

    this.isSubmitted = true;
    if (this.ChangeForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {
      let status: Status = { status: this.ChangeForm.value.status, } as Status
      this.userService.updateTranscriptStatus(status, this.clickedTodo.id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Status changed`,
        });
        timer(700)
          .toPromise()
          .then(() => {
            this._getTodos();
            this.Statusdisplay = false;
            this.ChangeForm.reset();
            this.isSubmitted = false
          });
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      })
    }
  }

  private _getTodos() {
    this.userService.getTodo().subscribe((todos) => {
      this.todos = todos;
    });
  }

  get getDatePipe() {
    return this.datePipe;
  }

  get getChangeStatus() {
    return this.ChangeForm.controls;
  }

  get gettodoform() {
    return this.TodoForm.controls;
  }

}
