import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 isloggedIn:boolean=false;
  constructor(private router: Router) { }
  username:any='';
  password:any='';
  ngOnInit() {
  }
  login(){
  	this.isloggedIn=true;
    if(this.username == "admin"){
      this.router.navigate(['/admin']);
    }else{
      this.router.navigate(['/meta-data']);
    }
  	
  }

}
