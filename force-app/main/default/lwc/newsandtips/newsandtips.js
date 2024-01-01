import { LightningElement, track } from 'lwc';
import FetchAllNewsData from '@salesforce/apex/AgricultureEmpowerment.FetchAllNewsData';
import schemelist from '@salesforce/apex/AgricultureEmpowerment.schemelist';
import GetAllTranslation from '@salesforce/apex/TranslateLanguageAgri.GetAllTranslation';
import CropSelection from '@salesforce/apex/TranslateLanguageAgri.CropSelection';
import soilprepration from '@salesforce/apex/TranslateLanguageAgri.soilprepration';
import seedselection from '@salesforce/apex/TranslateLanguageAgri.seedselection';
import seedsowing from '@salesforce/apex/TranslateLanguageAgri.seedsowing';
import irrigation from '@salesforce/apex/TranslateLanguageAgri.irrigation';
import FertilizersandManures from '@salesforce/apex/TranslateLanguageAgri.FertilizersandManures';
import WeedManagement from '@salesforce/apex/TranslateLanguageAgri.WeedManagement';
import tipsfordiseases from '@salesforce/apex/TranslateLanguageAgri.tipsfordiseases';
import tipsforHarvesting from '@salesforce/apex/TranslateLanguageAgri.tipsforHarvesting';

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


    //Change Language




    get options() {
        return [
            { label: 'English', value: 'english' },
            { label: 'Hindi', value: 'hindi' },
        ];
    }


    @track CropSelectio;
    @track soilprepratio;
    @track seedselectio;
    @track seedsowin;
    @track irrigatio;
    @track FertilizersandManure;
    @track WeedManagemen;
    @track tipsfordisease;
    @track tipsforHarvestin;
    @track storenewsinformation;
    @track CustomeTemplate = false;
    @track DefaultTemplate = true;

    handleChangeofLanguage(event) {
        const SelectedLanguage = event.detail.value;

        this.CustomeTemplate = true;
        this.DefaultTemplate = false;

        if (SelectedLanguage == 'hindi') {


            GetAllTranslation({ labelName: 'newsInformation', language: 'hi' })
                .then((result) => {
                    this.storenewsinformation = result;
                })
            CropSelection({ label: SelectedLanguage })
                .then((result) => {
                    this.CropSelectio = result;
                })
            soilprepration({ label: SelectedLanguage })
                .then((result) => {
                    this.soilprepratio = result;
                })
            seedselection({ label: SelectedLanguage })
                .then((result) => {
                    this.seedselectio = result;
                })
            seedsowing({ label: SelectedLanguage })
                .then((result) => {
                    this.seedsowin = result;
                })
            irrigation({ label: SelectedLanguage })
                .then((result) => {
                    this.irrigatio = result;
                })
            FertilizersandManures({ label: SelectedLanguage })
                .then((result) => {
                    this.FertilizersandManure = result;
                })
            WeedManagement({ label: SelectedLanguage })
                .then((result) => {
                    this.WeedManagemen = result;
                })
            tipsfordiseases({ label: SelectedLanguage })
                .then((result) => {
                    this.tipsfordisease = result;
                })
            tipsforHarvesting({ label: SelectedLanguage })
                .then((result) => {
                    this.tipsforHarvestin = result;
                })
        } else {
            this.CustomeTemplate = false;
            this.DefaultTemplate = true;
        }

    }


}