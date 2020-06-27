import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  proveedorId: number;
  title: string = 'Proveedor'
  proveedor: any;

  constructor(
    private activeRouter:ActivatedRoute,
    private api: ApiService
    ) { }

  async ngOnInit() {
    this.proveedorId = this.activeRouter.snapshot.params.id;
    this.proveedor = await this.api.getById(this.proveedorId).toPromise()
    console.log(this.proveedor);
    
  }

}
