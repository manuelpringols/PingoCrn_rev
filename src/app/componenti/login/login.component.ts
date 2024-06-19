import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../../servizi/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private firebase:FirebaseService){}


ngOnInit(){
  
}

accediForm(form: NgForm) {
  const email = form.value.email
  const password = form.value.password

  
  this.firebase.signInBasic(email,password)
}

accediFormGoogle(){
  this.firebase.signInGoogle()

}

}
