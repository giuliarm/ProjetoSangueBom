import { Component, OnInit, OnDestroy, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})

@Injectable()
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;
  public isLogged: boolean

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private authService: AuthService) { }

  ngOnInit() {
    this.isLogged = this.authService.getIsLogged();

    var html = this.document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = this.document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

  }
  ngOnDestroy() {
    var html = this.document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = this.document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
