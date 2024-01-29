import { LightningElement, track } from 'lwc';
import GetAllTranslation from '@salesforce/apex/TranslateLanguageAgri.GetAllTranslation';

export default class Trainingandsupport extends LightningElement {

  @track zoomLevel = 5;
  @track listView = "visible";
  @track Storelatitude;
  @track Storelongitude;
  @track mapMarkers = [];

  connectedCallback() {
    this.handleCurrentLocation();
  }

  handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };

          this.Storelatitude = currentLocation.latitude;
          this.Storelongitude = currentLocation.longitude;

          console.log('Current Location:', this.Storelatitude);
          console.log('Current Location:', this.Storelongitude);

          // Update mapMarkers after obtaining current location
          this.mapMarkers = [
            {
              location: {
                Latitude: this.Storelatitude,
                Longitude: this.Storelongitude
              }
            }
          ];
        },
        (error) => {
          console.error('Error getting current position:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }




  
  //select language

  get options() {
    return [
      { label: 'English', value: 'english' },
      { label: 'Hindi', value: 'hi' },
    ];
  }


  @track storetrainingandsinfo;
  @track CustomeTemplate = false;
  @track DefaultTemplate = true;

  handleChangeofLanguage(event) {
    this.DefaultTemplate = false;
    this.CustomeTemplate = true;

    const SelectLanguage = event.target.value;

    if (SelectLanguage == 'hi') {
      GetAllTranslation({ labelName: 'TNSInformation', language: 'hi' })
        .then((result) => {
          this.storetrainingandsinfo = result;
        }).catch((error) => {

        });
    } else {
      this.DefaultTemplate = true;
      this.CustomeTemplate = false;
    }
  }


}