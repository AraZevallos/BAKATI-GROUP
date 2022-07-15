import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '@frontend/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrdersService } from '../../../../../../../libs/orders/src/lib/services/orders.service';
import { ORDER_STATUS } from '../order.constants';



@Component({
  selector: 'frontend-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  constructor(private ordersService: OrdersService, private router: Router,private confirmationService: ConfirmationService, 
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this._getOrders()
  }

  private _getOrders(){
    this.ordersService.getOrders().subscribe(cats =>{
      this.orders=cats;
    })
  }

  showOrder(orderId){
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId){
    this.confirmationService.confirm({
      message: '¿Quiere eliminar este pedido?',
      header: 'Eliminar Pedido',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(response=>{
          this._getOrders();
          this.messageService.add({severity:'success', summary:'Success', detail:'Pedido eliminado'});
        },
        (error)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Pedido no eliminado'});
        })
      },
  });
  }
}
