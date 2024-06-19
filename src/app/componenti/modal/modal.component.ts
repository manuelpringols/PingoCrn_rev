import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../servizi/http.service';
import { SyncService } from '../../../servizi/sync.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input()  displayedItems: any = []; // Elementi da visualizzare sulla pagina corrente

  constructor(private http:HttpService, private syncService: SyncService){}
  
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  
  @Input() idPingToDelete!:any; // Proprietà di input per l'ID da eliminare


  ngOnInit(): void {
  }
  
  onCloseModal() {
    this.isVisible = false;
    this.idPingToDelete = null; // Azzera l'ID del ping da eliminare quando la finestra modale viene chiusa
    this.closeModal.emit();
  }
  
  cambiaValoreSync() {
    this.syncService.setSync(true)
  }

  confirmDeletePing() {
    console.log(this.idPingToDelete)

    if (this.idPingToDelete) {
        this.http.deleteData(this.idPingToDelete).subscribe((dati:any)=>{
         
   })
   console.log("Conferma eliminazione di:", this.idPingToDelete);
   this.cambiaValoreSync();

    }
    
    this.onCloseModal(); // Chiudi la finestra modale dopo aver confermato l'eliminazione

  }
}
