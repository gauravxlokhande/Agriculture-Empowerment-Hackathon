import { LightningElement, track } from 'lwc';
import insertFeedback from '@salesforce/apex/AgricultureEmpowerment.insertFeedback';
import feedbackimage from '@salesforce/resourceUrl/feedbackimage';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Feedback extends LightningElement {
    feedbackimage = feedbackimage;
    @track queryValue;
    handleQueryChange(event){
        this.queryValue = event.target.value;
    }
    handleSubmitClick() {
        if (this.queryValue ==null) {
            this.dispatchEvent(new ShowToastEvent({
                title: "please enter the text",
                variant: "error"
            }));
        } else {
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
}