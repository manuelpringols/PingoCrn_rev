import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private syncSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sync$ = this.syncSubject.asObservable();

  constructor() {}

  setSync(sync: boolean) {
    this.syncSubject.next(sync);
  }
}