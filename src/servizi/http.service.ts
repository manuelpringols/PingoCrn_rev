import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  httpOptionsPost = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept, X-Custom-Header, Upgrade-Insecure-Requests',
    })
  };
  constructor(private http:HttpClient, ) { }

  urlApi:any="https://api-dev.p-ingo.it:8443/api/ping"

  getData(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/getPing`);
  }

  // Metodo per fare una richiesta POST
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/deletePings/${id}`);
  }

  inviaRichiesta() {
    const api_key = 'AIzaSyCdS2m3WFzM035RMljjn0mW6N2xcq0_8Ug';
    const firebase_id_token = '7dKnIkD28mNyVP5NFmZFULgjmlB3';

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`;
    

     
  }

  


}
