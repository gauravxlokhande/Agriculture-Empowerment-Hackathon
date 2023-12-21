import { LightningElement, track } from 'lwc';
import insertFeedback from '@salesforce/apex/AEInsertViews.insertFeedback';
import SeedsandFertilizersss from '@salesforce/resourceUrl/SeedsandFertilizersss';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Feedback extends LightningElement {
    SeedsandFertilizersss = SeedsandFertilizersss;
    @track queryValue;
    handleQueryChange(event){
        this.queryValue = event.target.value;
    }
    handleSubmitClick(){
        insertFeedback({queryValue:this.queryValue})
        .then(result=>{
            console.log('result',result);
            this.dispatchEvent(new ShowToastEvent({
                title: "Record Submitted Succesfully...",
                variant: "success"
            }));
            this.queryValue = '';
        })
        .catch(error=>{
            console.log('error',error);
        })


    }
}