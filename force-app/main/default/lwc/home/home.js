import { LightningElement, track } from 'lwc';
import getApexData from '@salesforce/apex/AgricultureEmpowerment.ImportantLinks';


export default class Home extends LightningElement {

    connectedCallback() {
        this.handleCurrentLocation();
        this.fetchlinksdata();
    }


    //Spinner
    @track Spinner = false;
    @track StoreAgricultureDataTemplate = false;


    //latitude langitude
    @track Storelatitude;
    @track Storelongitude;

    // Weather
    @track result = '';
    @track imageURL;
    @track date;



    //Agriculture
    @track StoreAgricultureData;
    @track selectedLocation = '';

    //no data template 
    @track DataNotfoundTemplate = false;  // check it later


    // Get Current User Location
    handleCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    this.Storelatitude = currentLocation.latitude.toString();
                    this.Storelongitude = currentLocation.longitude.toString();


                    console.log('Current Location:', this.Storelatitude);
                    console.log('Current Location:', this.Storelongitude);
                    this.callReverseGeocodeAPI(this.Storelatitude, this.Storelongitude);

                    let endPoint = `https://api.weatherapi.com/v1/current.json?key=6388b321ff7a4f239de125943230612&q=${currentLocation.latitude},${currentLocation.longitude}`;

                    fetch(endPoint, {
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            //console.log('Weather data:', data);
                            this.result = data;
                            this.imageURL = this.result.current.condition.icon;
                            this.date = this.result.location.localtime;
                            // const windspeed = this.result.current.wind_speed;

                            // console.log('fff',JSON.parse(typeof(this.result.current.wind_speed)) );
                        })
                        .catch((error) => {
                            console.error('Error fetching weather data:', error);
                        });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }


    @track StoreCurrentCityOfUser = [];

    callReverseGeocodeAPI(latitude, longitude) {
        const apiKey = 'VX6oGXMy9DXqliejI9vJ9g==W1qQt9Xmw5IOIoAE';
        const apiEndpoint = 'https://api.api-ninjas.com/v1/reversegeocoding';

        const apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                // console.log('API Response:', JSON.parse(JSON.stringify(data.name)));
                const response = JSON.parse(data);
                 this.StoreCurrentCityOfUser = response[0].name;
                console.log('City Name:', this.StoreCurrentCityOfUser);
                this.FetchAgricultureData();
            })
            .catch(error => {
                console.error('Error calling API:', error.message);
            });
    }



    @track MarketDataCount =15;
  

    // To Fetch The Agriculture Data 
    FetchAgricultureData() {

        // To get The Current Formatted Date
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        // console.log(formattedDate);


        let endPoint = `https://api.data.gov.in/catalog/6141ea17-a69d-4713-b600-0a43c8fd9a6c?api-key=579b464db66ec23bdd000001be46e8b8b04c4b746f8c908419d2c4e3&format=json&limit=${this.MarketDataCount}&filters%5Bdistrict%5D=${this.StoreCurrentCityOfUser}&filters%5Barrival_date%5D=${formattedDate}`;
        fetch(endPoint, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                this.StoreAgricultureData = data.records;
                if (data.records.length == 0 || data.records.length <=0) {
                    this.StoreAgricultureDataTemplate = true;
                } else {
                    this.StoreAgricultureDataTemplate = false;
                }
            }).catch(error => {
                console.error('Error fetching data:', error.body.message);
            });

    }



    clickoncity(event) {
        this.StoreCurrentCityOfUser = event.currentTarget.dataset.name;
        this.FetchAgricultureData();
        console.log(this.StoreCurrentCityOfUser);
    }

    handleClickOfShowPrevios() {
        if (this.MarketDataCount>20) {
            this.MarketDataCount = this.MarketDataCount - 15;
            this.FetchAgricultureData();
        }
    }

    handleClickOfShowMore() {
        if (this.MarketDataCount) {
            this.MarketDataCount = this.MarketDataCount + 15;
            this.FetchAgricultureData();
        }
    }


    // connectedCallback() {
    //     this.fetchlinksdata();
    // }


    @track linksdata;
    
    fetchlinksdata() {
        getApexData()
        .then((result) => {
            this.linksdata = result;
        }).catch((error) => {
            
        });
    }
    


}