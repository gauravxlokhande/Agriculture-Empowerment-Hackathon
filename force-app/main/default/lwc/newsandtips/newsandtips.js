import { LightningElement ,track} from 'lwc';
import FetchAllNewsData from '@salesforce/apex/AgricultureEmpowerment.FetchAllNewsData';

export default class Newsandtips extends LightningElement { 


    connectedCallback() {
        this.FetchNewsTipsData();
    }


    @track StoreNewsTipsData;



    // Fetch News And Tips Data
    FetchNewsTipsData() {
        FetchAllNewsData()
            .then((result) => {
                this.StoreNewsTipsData = result;
            }).catch((error) => {

            });
    }
    

}