import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: Array<any>;
  stations: Array<string>;
  states: Array<string>;
  private snapshotChangesSubscription: any;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    public afs: AngularFirestore,

  ) { 
    //this.initializeItems();
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
    this.stations = [
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
  initializeStates(){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('States').snapshotChanges();
      resolve(this.snapshotChangesSubscription);
      
    })
  }

  getStates(ev: any){
    this.firebaseService.getStationCategories();
  }

  getStations(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();
    this.initializeStates();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.stations = this.stations.filter((station) => {
        return (station.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

}
}
