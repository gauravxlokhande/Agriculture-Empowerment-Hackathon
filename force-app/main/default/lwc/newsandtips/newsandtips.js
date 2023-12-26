import { LightningElement ,track} from 'lwc';
import FetchAllNewsData from '@salesforce/apex/AgricultureEmpowerment.FetchAllNewsData';
import schemelist from '@salesforce/apex/AgricultureEmpowerment.schemelist';
export default class Newsandtips extends LightningElement { 


    connectedCallback() {
        this.FetchNewsTipsData();
        this.fetchschemsdata();
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
    
    


    // all Schems

    @track Storeschems;


    fetchschemsdata() {
        schemelist()
        .then((result) => {
            this.Storeschems = result;
        }).catch((error) => {
            alert(error.body.message);
        });
        
    }


}