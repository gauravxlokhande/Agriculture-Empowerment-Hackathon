import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertViews from '@salesforce/apex/AgricultureEmpowerment.insertViews';
import showViews from '@salesforce/apex/AgricultureEmpowerment.showViews';
import FetchSeasonalCalendarData from '@salesforce/apex/AgricultureEmpowerment.FetchSeasonalCalendarData';
import GetAllTranslation from '@salesforce/apex/TranslateLanguageAgri.GetAllTranslation';

const columns = [
    { label: 'Crop Name', fieldName: 'cropName' },
    { label: 'Start Date', fieldName: 'Start_Date__c', type: 'date' },
    { label: 'End Date', fieldName: 'End_Date__c', type: 'date' },
    { label: 'Information', fieldName: 'Information__c', type: 'text' }
];

export default class MarketTrends extends LightningElement {


    @track options = [
        { label: '---', value: '---' },
        { label: 'Pune', value: 'Pune' },
        { label: 'Surat', value: 'Surat' },
        { label: 'Ahmednagar', value: 'Ahmednagar' },
        { label: 'Chandrapur', value: 'Chandrapur' },
        { label: 'Banaskanth', value: 'Banaskanth' },
        { label: 'Bikaner', value: 'Bikaner' },
        { label: 'Ganganagar', value: 'Ganganagar' },
        { label: 'Fatehgarh', value: 'Fatehgarh' },
        { label: 'Bhatinda', value: 'Bhatinda' },
        { label: 'Bankura', value: 'Bankura' },
        { label: 'Birbhum', value: 'Birbhum' },
        { label: 'Darjeeling', value: 'Darjeeling' },
        { label: 'Indore', value: 'Indore' },
        { label: 'Harda', value: 'Harda' },
        { label: 'Dewas', value: 'Dewas' },
        { label: 'Adilabad', value: 'Adilabad' },
        { label: 'Hyderabad', value: 'Hyderabad' },
        { label: 'Erode', value: 'Erode' },
    ];

    @track commodity = [
        { label: '---', value: '---' },
        { label: 'Maize', value: 'Maize' },
        { label: 'Beans', value: 'Beans' },
        { label: 'Beetroot', value: 'Beetroot' },
        { label: 'Drumstick', value: 'Drumstick' },
        { label: 'Soyabean', value: 'Soyabean' },
        { label: 'Methi(Leaves)', value: 'Methi(Leaves)' },
        { label: 'Mint(Pudina)', value: 'Mint(Pudina)' },
        { label: 'Rajgir', value: 'Rajgir' },
        { label: 'Onion', value: 'Onion' },
        { label: 'Guar', value: 'Guar' },
        { label: 'Bottle gourd', value: 'Bottle gourd' },
        { label: 'Tomato', value: 'Tomato' },
        { label: 'Raddish', value: 'Raddish' },
        { label: 'Brinjal', value: 'Brinjal' },
    ];

    @track searchValue;
    @track agriData;
    @track showMarketData = false;
    handleCityChange(event) {
        this.searchValue = event.detail.value;
        console.log('searchValue', this.searchValue);
        this.fetchMarketDataCityWise();
        this.showMarketData = true;
    }

    @track commodityValue;
    handleCommodityChange(event) {
        this.commodityValue = event.detail.value;
        console.log('commodityValue', this.commodityValue);
        this.fetchMarketData();
        this.showMarketData = true;

    }
    
    @track Recordlimitter = 9;

    //to fetch city wise data
    fetchMarketDataCityWise() {
        let endPoint = `https://api.data.gov.in/catalog/6141ea17-a69d-4713-b600-0a43c8fd9a6c?api-key=579b464db66ec23bdd000001be46e8b8b04c4b746f8c908419d2c4e3&format=json&limit=${this.Recordlimitter}&filters%5Bdistrict%5D=${this.searchValue}`;
        fetch(endPoint, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                this.agriData = data.records;
            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    fetchMarketData() {
        let endPoint = `https://api.data.gov.in/catalog/6141ea17-a69d-4713-b600-0a43c8fd9a6c?api-key=579b464db66ec23bdd000001be46e8b8b04c4b746f8c908419d2c4e3&format=json&limit=1000&filters%5Bdistrict%5D=${this.searchValue}&filters%5Bcommodity%5D=${this.commodityValue}`
        fetch(endPoint, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                this.agriData = data.records;
            }).catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    //to insert View
    @track viewValue;
    handleViewChange(event) {
        this.viewValue = event.target.value;
    }
    handleSubmitClick() {
        if (this.viewValue == null) {
            this.dispatchEvent(new ShowToastEvent({
                title: "You cannot submit the empty text",
                variant: "warning"
            }));
        } else {
            insertViews({ view: this.viewValue })
                .then(result => {
                    console.log(result)
                    this.showViews();
                    this.viewValue = '';
                    this.dispatchEvent(new ShowToastEvent({
                        title: "Your Openion submited successfully",
                        variant: "success"
                    }));

                }).catch(error => {

                })
        }

    }

    //to Show Views
    @track viewsData;

    connectedCallback() {
        this.showViews();
        this.fetchseasondata();
    }

    showViews() {
        showViews()
            .then(result => {
                this.viewsData = JSON.parse(JSON.stringify(result));
                // console.log('View Shownnnn', this.viewsData);
            })
    }

    //For Seasonal Calendar
    @track seasonalItems = '';
    @track columns = columns;
    sortDirection = 'asc';
    sortedBy;

    async fetchseasondata() {
        await FetchSeasonalCalendarData()
            .then((result) => {
                this.seasonalItems = result.map(item => ({
                    ...item,
                    cropName: item.Seeds__r.Name,
                }));
            })
            .catch((error) => {

                this.dispatchEvent(new ShowToastEvent({
                    title: "Error In Showing Data",
                    variant: "error"
                }));
            });

    }


    //change language

    get optionss() {
        return [
            { label: 'English', value: 'english' },
            { label: 'Hindi', value: 'hi' },
        ];
    }


    @track storemarketdescription;
    @track CustomeTemplate = false;
    @track DefaultTemplate = true;

    handleChangeofLanguage(event) {
        this.DefaultTemplate = false;
        this.CustomeTemplate = true;

        const SelectLanguage = event.target.value;

        if (SelectLanguage == 'hi') {
            GetAllTranslation({ labelName: 'MntDescription', language: 'hi' })
                .then((result) => {
                    this.storemarketdescription = result;
                }).catch((error) => {

                });
        } else {
            this.DefaultTemplate = true;
            this.CustomeTemplate = false;
        }
    }


    handleClickSeeMore() {
        if (this.Recordlimitter) {
            this.Recordlimitter = this.Recordlimitter + 9;
            this.fetchMarketDataCityWise();
            // this.fetchMarketData();
        }
    }
    handleClickPrevious() {
    if (this.Recordlimitter>9) {
        this.Recordlimitter = this.Recordlimitter - 9;
        this.fetchMarketDataCityWise();
        // this.fetchMarketData();
    }
    }

}