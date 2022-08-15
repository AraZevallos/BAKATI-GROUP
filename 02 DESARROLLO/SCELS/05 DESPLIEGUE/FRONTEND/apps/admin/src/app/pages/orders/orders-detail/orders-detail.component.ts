import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../../../../libs/orders/src/lib/services/orders.service';
import { Order } from '../../../../../../../libs/orders/src/lib/models/order';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../../../../../../../libs/orders/src/lib/order.constants';

@Component({
  selector: 'frontend-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;

  constructor(private ordersService: OrdersService,
    private route: ActivatedRoute,private messageService: MessageService,) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus();
  }

  private _mapOrderStatus(){
    this.orderStatuses=Object.keys(ORDER_STATUS).map(key=>{
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    }); 
  }

  private _getOrder(){
      this.route.params.subscribe(params =>{
        if(params.id){
          this.ordersService.getOrder(params.id).subscribe(order =>{
            this.order=order;
          })
        }
      })
    
  }

  onStatusChange(event){
      this.ordersService.updateOrder({status: event.value}, this.order.id).subscribe(order =>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Pedido Actualizado'});
      },(error)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Pedido no Actualizado'});
        
      })
      
  }

}
