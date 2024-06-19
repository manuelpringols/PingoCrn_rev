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


onSubmitForm(_t8: NgForm) {
  this.firebase.signInGoogle()
}

}
