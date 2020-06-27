import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  subscription: Subscription;
  request: any;
  currentPage: number;
  title: string = 'Proveedores'
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.api.getAll().subscribe(
      (resp) => {
        console.log(resp);
        this.request = resp.data;
        this.currentPage = resp.data['current_page']
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show(id: number) {
    this.router.navigate(['show',id]);
  }

  loadData(e) {
    
    this.currentPage++
    
    if (this.request['next_page_url']) {
      this.subscription = this.api.getAll(this.currentPage).subscribe(
        (resp) => {
        
          console.log(resp.data);
          
          const currentData: Array<any> =  this.request.data
          const newData: Array<any> = resp.data.data
          let dataJoin: Array<any> = []
          dataJoin=dataJoin.concat(currentData, newData)
          this.request = resp.data;
          this.request.data = dataJoin;
          console.log(this.request);
          
          this.currentPage = resp.data['current_page']
        },
        (error) => console.log(error),
        () => e.target.complete()
      );
    } else {
      this.infiniteScroll.complete()
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
