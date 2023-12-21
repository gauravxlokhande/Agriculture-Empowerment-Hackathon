import { LightningElement,track} from 'lwc';
import HeaderSeedsAndFertilizer from '@salesforce/resourceUrl/SeedsandFertilizers';
import FetchAllFertilizers from '@salesforce/apex/AgricultureEmpowerment.FetchAllFertilizers';
import FetchAllSeeds from '@salesforce/apex/AgricultureEmpowerment.FetchAllSeeds';


export default class Seedsandfertilizer extends LightningElement { 

    connectedCallback() {
        this.FetchAllSeedsData();
        this.FetchAllFertilizerData();
    }


    @track HeaderSeedsAndFertilizer = HeaderSeedsAndFertilizer;
    @track StoreAllSeedsData = [];
    @track StoreAllFertilizersData = [];


    // Fetch All Seeds Data
    FetchAllSeedsData() {
        FetchAllSeeds()
            .then((result) => {
                console.log(result);
                this.StoreAllSeedsData = result;
            }).catch((error) => {
                alert(error.body.message)
            });
    }

    //Fetch All Fertilizers Date
    FetchAllFertilizerData() {
        FetchAllFertilizers()
            .then((result) => {
                console.log(result)
                this.StoreAllFertilizersData = result;
            }).catch((error) => {
                alert(error.body.message)
            });
    }



}