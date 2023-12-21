import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SunnyWeather from '@salesforce/resourceUrl/WeatherApiSunny';
import FetchWeatherData from '@salesforce/apex/AgricultureEmpowerment.GetWeatherData';



export default class Home extends LightningElement {

    connectedCallback() {
        this.getLocation();
    }

    // Weather image
    @track SunnyWeather = SunnyWeather;


    // Weather
    @track weatherData = '';
    @track weatherImage;
    @track weatherDescription;

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
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log('latitude' + latitude)
                    console.log('longitude' + longitude)

                    // Fetch Data According To Current user City
                    FetchWeatherData({ latitude: latitude, longitude: longitude })
                        .then((result) => {
                            this.weatherData = JSON.parse(result);
                            this.weatherDescription = this.weatherData.current.weather_descriptions[0];
                            this.weatherImage = this.weatherData.current.weather_icons[0];
                        })
                        .catch((error) => {
                            this.dispatchEvent(new ShowToastEvent({
                                title: 'Weather Data Error',
                                message: error.body.message,
                                variant: 'error'
                            }));
                        });
                },
                (error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Location Error',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                }
            );
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Location Error',
                    message: 'Geolocation is not supported by this browser.',
                    variant: 'error',
                })
            );
        }
    }




    handleChangeofSelectedCity(event) {
        this.selectedLocation = event.detail.value;
        this.FetchAgricultureData();
    }





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
                this.StoreAgricultureData = data.records
                this.SpinnerTemplate = false;
                console.log(this.StoreAgricultureData)
            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }




}