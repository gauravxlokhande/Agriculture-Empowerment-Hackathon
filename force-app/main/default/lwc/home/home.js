import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SunnyWeather from '@salesforce/resourceUrl/WeatherApiSunny';
import FetchWeatherData from '@salesforce/apex/AgricultureEmpowerment.GetWeatherData';



export default class Home extends LightningElement {

    connectedCallback() {
        this.handleCurrentLocation();
    }

    // Weather image
    @track SunnyWeather = SunnyWeather;


    // Weather
    @track result = '';
    @track imageURL;
    @track date;

    //Agriculture
    @track StoreAgricultureDataTemplate = true;
    @track StoreAgricultureData;
    @track selectedLocation = '';



    @track locationOptions = [
        { label: 'Pune', value: 'Pune' },
        { label: 'Surat', value: 'Surat' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Ahmedabad', value: 'Ahmedabad' },
        { label: 'Jaipur', value: 'Jaipur' },
        { label: 'Lucknow', value: 'Lucknow' },
    ];






    // Get Current User Location
    handleCurrentLocation() {
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    console.log('Current Location:', currentLocation);

                    let endPoint = `https://api.weatherapi.com/v1/current.json?key=6388b321ff7a4f239de125943230612&q=${currentLocation.latitude},${currentLocation.longitude}`;

                    fetch(endPoint, {
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Weather data:', data);
                            this.result = data;
                            this.imageURL = this.result.current.condition.icon;
                            this.date = this.result.location.localtime;
                            console.log('image',this.imageURL);

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




    handleChangeofSelectedCity(event) {
        this.selectedLocation = event.detail.value;
        this.FetchAgricultureData();
    }




    @track DataNotfoundTemplate = false;

    // To Fetch The Agriculture Data 
    FetchAgricultureData() {

        // To get The Current Formatted Date
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        console.log(formattedDate);


        let endPoint = `https://api.data.gov.in/catalog/6141ea17-a69d-4713-b600-0a43c8fd9a6c?api-key=579b464db66ec23bdd000001be46e8b8b04c4b746f8c908419d2c4e3&format=json&limit=1000&filters%5Bdistrict%5D=${this.selectedLocation}&filters%5Barrival_date%5D=${formattedDate}`;
        fetch(endPoint, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                this.StoreAgricultureData = data.records;
                if (data.records.length == 0) {
                    this.DataNotfoundTemplate = true;
                } else {
                    this.DataNotfoundTemplate = false;
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }




}