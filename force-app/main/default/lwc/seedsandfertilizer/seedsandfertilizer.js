import { LightningElement,track} from 'lwc';
import HeaderSeedsAndFertilizer from '@salesforce/resourceUrl/SeedsandFertilizers';
import FetchAllFertilizers from '@salesforce/apex/AgricultureEmpowerment.FetchAllFertilizers';
import FetchAllSeeds from '@salesforce/apex/AgricultureEmpowerment.FetchAllSeeds';
import GetAllTranslation from '@salesforce/apex/TranslateLanguageAgri.GetAllTranslation';


export default class Seedsandfertilizer extends LightningElement { 

    connectedCallback() {
        this.FetchAllSeedsData();
        this.FetchAllFertilizerData();
    }

    @track DefaultTemplate = true;

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


    // change language

     get options() {
        return [
            { label: 'English', value: 'english' },
            { label: 'Hindi', value: 'hi' },
        ];
    }


    @track storeseedsinfo;
    @track CustomeTemplate = false;


    handleChangeofLanguage(event) {
        this.DefaultTemplate = false;
        this.CustomeTemplate = true;

        const SelectLanguage = event.target.value;
        
        if (SelectLanguage == 'hi') {
            GetAllTranslation({labelName:'S_FInformation', language:'hi'})
                .then((result) => {
                    this.storeseedsinfo = result;   
            }).catch((error) => {
                
            });
        } else {
            this.DefaultTemplate = true;
            this.CustomeTemplate = false;
        }
    }

}