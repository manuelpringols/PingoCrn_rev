import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../../../servizi/http.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;

  firebase_id_token = '7dKnIkD28mNyVP5NFmZFULgjmlB3';

  ping: any = {
    id_ping: "",
    descrizione: "",
    data_creazione: "",
    latitudine: "",
    longitudine: "",
    immagine: "",
    idPingType: ""
  };
  pingList: any[] = [];
  markers: google.maps.LatLngLiteral[] = [];

  bottoneStateGestione!: boolean;
  bottoneStateEditor!: boolean;
  firebaseInit: any;

  center: google.maps.LatLngLiteral = {
    lat: 40.8522,
    lng: 14.2681,
  };
  zoom = 6;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    // Carica i dati e chiama aggiungiMarker quando i dati sono disponibili
    this.caricaDatiPing();

    // Esegui caricaDatiPing ogni 10 secondi
    setInterval(() => {
      this.caricaDatiPing();
    }, 10000);
  }

  caricaDatiPing() {
    // Simula il caricamento dei dati ping e aggiorna solo se ci sono nuovi ping
    // Sostituisci con il tuo metodo per ottenere i dati reali
    this.http.getData().subscribe((datiPing:any) => {
      // Salva una copia della lista ping attuale
      const pingListBefore = [...this.pingList];

      // Aggiorna la lista ping con i nuovi dati
      this.pingList = datiPing;

      // Esegui aggiungiMarker solo se ci sono nuovi ping o ping cancellati
      if (this.isDiffBetweenArrays(pingListBefore, this.pingList)) {
        this.aggiungiMarker();
      }
    });
  }

  isDiffBetweenArrays(arr1: any[], arr2: any[]): boolean {
    // Verifica se ci sono differenze tra due array di oggetti
    if (arr1.length !== arr2.length) {
      return true;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].id_ping !== arr2[i].id_ping) {
        return true;
      }
    }
    return false;
  }

  aggiungiMarker() {
    // Pulisci i marker esistenti
    this.markers = [];

    // Crea nuovi marker per ogni ping nella lista attuale
    this.pingList.forEach((ping) => {
      const markerPosition: google.maps.LatLngLiteral = {
        lat: parseFloat(ping.latitudine),
        lng: parseFloat(ping.longitudine),
      };

      this.markers.push(markerPosition);
    });
  }

  mostraGestore() {
    this.bottoneStateGestione = !this.bottoneStateGestione;
    console.log('Mimmo');
  }

  mostraEditor() {
    this.bottoneStateEditor = !this.bottoneStateEditor;
  }

  maxBounds = {
    east: -0.1,
    north: 51.55,
    west: -0.2,
    south: 51.45,
  }; // Esempio di limiti della mappa

  display: any;

  moveMap(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (latLng && this.isInBounds(latLng)) {
      this.center = latLng.toJSON(); // Converte LatLng in LatLngLiteral
    }
  }

  isInBounds(latLng: google.maps.LatLng): boolean {
    // Verifica se la posizione è all'interno dei limiti
    return (
      latLng.lat() >= this.maxBounds.south &&
      latLng.lat() <= this.maxBounds.north &&
      latLng.lng() >= this.maxBounds.west &&
      latLng.lng() <= this.maxBounds.east
    );
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
