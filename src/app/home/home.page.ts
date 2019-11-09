import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {} from 'jasmine';
import { Observable } from 'rxjs';
//import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
//import { resolve } from 'dns';
import { AppModule } from '../app.module';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: Array<any>;
  stations: Array<string>;
  USstates: Array<any>;
  private snapshotChangesSubscription: any;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    public afs: AngularFirestore,

  ) { 
    this.initializeItems();
    this.initializeStates();

  }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.stations = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

initializeItems() {
     this.items = [
      'Atlanta',
      'Austin',
      'Baltimore',
      'Boston',
      'Charlotte',
      'Chicago',
      'Dallas',
      'Houston',
      'Las Vegas',
      'Los Angeles',
      'Miami',
      'New York City',
      'Philadelphia',
      'San Diego',
      'San Francisco',
      'Seattle',
      'Washington',
    ] 
    }

/*   initializeStates(){
    return new Promise<any>((resolve, reject) => {
      this.stations = this.afs.collection('States').snapshotChanges();
      resolve(this.stations);

    })
  } */

  initializeStates(){
    
    this.firebaseService.getStates()
    .then(states => {
      this.USstates = states;
      //alert(this.USstates); ---> says [object Object]

    })
    
      //this.afs.collection<any>('States',ref=>ref.where(, '==', 1)); 
      //.snapshotChanges();
      //resolve(this.stations);

/*       return firebase.database().ref('States').once('value').then(function(snapshot){
        this.states = (snapshot.val());
        alert((snapshot.val())); 
      }); */

/*       return firebase.database().ref('States').once('value').then(snapshot => snapshot.val());{
        this.states
      }
 */
/*          let citiesRef = firebase.database.collection('States');
        this.states = citiesRef.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          }); */

          /* db.collection("States").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                //this.states
            }); */
 

      };



 /*  getStates(ev: any){
    this.firebaseService.getStationCategories();
  } */

  getStations(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();
    this.initializeStates();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
     if (val && val.trim() != '') {
      this.USstates = this.USstates.filter((USstates) => {
        return (USstates.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }) 
    }
  }


getItems(ev: any) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.items = this.items.filter((item) => {
      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}
}