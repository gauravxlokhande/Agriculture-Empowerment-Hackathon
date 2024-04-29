import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import InstaLogoPng from '@salesforce/resourceUrl/InstaLogoPng';
import linkedinLogoPng from '@salesforce/resourceUrl/linkedinLogoPng';

export default class Aboutus extends NavigationMixin(LightningElement) {


    @track InstaLogoPng = InstaLogoPng;
    @track linkedinLogoPng = linkedinLogoPng;


    onclickofinsta() {
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "https://github.com/gauravxlokhande"
            }
        });
    }

    onclickoflinkedin() {
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "https://www.salesforce.com/trailblazer/gauravlokhande"
            }
        });
    }
}
