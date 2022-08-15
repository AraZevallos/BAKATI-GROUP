import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../../../../../../libs/users/src/lib/models/user';
import { UsersService } from '../../../../../../../libs/users/src/lib/services/users.service';

@Component({
  selector: 'frontend-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users: User[] =[];
  constructor(private usersService: UsersService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string){
    this.confirmationService.confirm({
      message: '¿Quiere eliminar este usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(response=>{
          this._getUsers();
          this.messageService.add({severity:'success', summary:'Success', detail:'Usuario eliminado'});
        },
        (error)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Usuario no eliminado'});
        })
      },
  });
  
  }

  updateUser(userId: string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }
  private _getUsers(){
    this.usersService.getUsers().subscribe(users=>{
      this.users=users;
    })
  }

}
