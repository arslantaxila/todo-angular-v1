import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TodoComponent } from './pages/todo/todo.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    DashboardComponent,
    TodoComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ScrollPanelModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    PasswordModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    HttpClientModule,
    InputNumberModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class UserModule {}
