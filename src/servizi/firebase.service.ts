import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, User, onAuthStateChanged, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import firebase from 'firebase/compat/app'; // Usa compat per retrocompatibilità
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: any;
  provider = new GoogleAuthProvider();
  auth: any;
  credential:any;
  currentUser: firebase.User | null = null;
  userId: any;
  displayName: any;
  imageUrl: any;
  email: any;
  signedIn!: boolean;
  googleEmail: any;

  constructor(private afAuth:AngularFireAuth,private router:Router) {
    

    const firebaseConfig = {
      apiKey: "AIzaSyAzuLjaC3bH7IkYdcZ4bRHC5UC4dWPKrbM",
      authDomain: "pingo-d4d59.firebaseapp.com",
      projectId: "pingo-d4d59",
      storageBucket: "pingo-d4d59.appspot.com",
      messagingSenderId: "171167079645",
      appId: "1:171167079645:web:90ea118b61fabd382b4f34",
      measurementId: "G-D0TWE6BM9S"
      // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    };
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // L'utente è già autenticato, naviga alla route 'map'
        this.router.navigate(['/map']);
      }
    });
  

    


    

  }


   async getIdTokenByUid(uid: string): Promise<string> {
    try {
      let idToken: string | null = null;
      await this.auth.idToken.subscribe((token: string | null) => {
        idToken = token;
      }).unsubscribe();

      if (!idToken) {
        throw new Error('Utente non autenticato.');
      }
      
      return idToken;
    } catch (error) {
      console.error('Errore durante l\'ottenimento dell\'ID Token:', error);
      throw error;
    }
  }

  signInBasic(email:string,password:string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      this.router.navigate(["/map"])
      this.afAuth.setPersistence('local')
    .then(() => {
      console.log('Persistence set to local');
    })
    .catch((error: any) => {
      console.error('Error setting persistence:', error);
    });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  signInGoogle(){
    signInWithPopup(this.auth, this.provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    // The signed-in user info.
    const user = result.user;
    this.router.navigate(["/map"])
    this.afAuth.setPersistence('local')
    .then(() => {
      console.log('Persistence set to local');
    })
    .catch((error: any) => {
      console.error('Error setting persistence:', error);
    });

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  isPersistenceEnabled(): boolean {
    // Verifica lo stato dell'autenticazione
    const user = this.auth.currentUser;
    return !!user;
  }

  setPersistenceNone() {
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        console.log('Persistenza rimossa');
      })
      .catch((error: any) => {
        console.error('Errore durante la rimozione della persistenza:', error);
      });
  }
  

}


