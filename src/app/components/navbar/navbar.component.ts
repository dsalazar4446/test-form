import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input('title') title: string;
  isNavigate: boolean = false; 
  constructor(
    public _router: Router,
    public location: Location  
  ) { 
    this.isNavigate = this._router.navigated
  }

  ngOnInit() {
    console.log(this._router.routerState.snapshot.url)
  }

  back() {
    this.location.back()
  }

}
