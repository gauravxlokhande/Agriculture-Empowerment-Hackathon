import { LightningElement, track } from 'lwc';
import GetAllTranslation from '@salesforce/apex/TranslateLanguageAgri.GetAllTranslation';

export default class Trainingandsupport extends LightningElement { 


    @track mapMarkers;
    @track zoomLevel;
    @track listView;
    connectedCallback() {
      this.mapMarkers = [
        {
          location: {
            City: 'Surat',
            Country: 'India',
            PostalCode: '394101',
            State: 'Gujarat',
            Street: 'Boleward,Surat'
          },
          title: "Boleward,Surat",
          description: "TCS",
          icon: "standard:account"
        },
        {
          location: {
            City: 'Surat',
            Country: 'India',
            PostalCode: '394101',
            State: 'Gujarat',
            Street: 'Goga chauk, Surat',

          },
          title: "Goga chauk, Surat",
          description: "Krishi Kendra,Surat !",
          icon: "standard:account"
        }
      ];
      //Google Maps API supports zoom levels from 1 to 22 in desktop browsers, and from 1 to 20 on mobile.
      this.zoomLevel = 10;
      this.listView = "visible";
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
            GetAllTranslation({labelName:'TNSInformation', language:'hi'})
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