import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class Header extends NavigationMixin (LightningElement) {


    toggleMenu(event) {
        console.log('toggleMenu called');
        const menuItems = this.template.querySelector('.menu-items');
        if (menuItems) {
            menuItems.classList.toggle('show');
        }
    }

    //For active button
    @track homeClass = '';
    @track seedsClass = '';
    @track marketClass = '';
    @track newsClass = '';
    @track trainingClass = '';
    @track feedbackClass = '';

    connectedCallback() {
        this.setActiveTab();
    }

    setActiveTab() {
        const path = window.location.pathname;
        console.log('Current Path:', path);

        this.resetClasses();

        if (path.includes('home')) {
            this.homeClass = 'home';
        } else if (path.includes('AgricultureEmpowerment/s/seeds-and-fertilizers')) {
            this.seedsClass = 'seeds';
        } else if (path.includes('market')) {
            this.marketClass = 'market';
        } else if (path.includes('AgricultureEmpowerment/s/newsandtipspage')) {
            this.newsClass = 'news';
        } else if (path.includes('training')) {
            this.trainingClass = 'training';
        } else if (path.includes('AgricultureEmpowerment/s/feedback')) {
            this.feedbackClass = 'feedback';
        }
    }

    resetClasses() {
        this.homeClass = '';
        this.seedsClass = '';
        this.marketClass = '';
        this.newsClass = '';
        this.trainingClass = '';
        this.feedbackClass = '';
    }

    handleHomeClick(){
        this.resetClasses();
        this.homeClass = 'home';

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/AgricultureEmpowerment/s/"
            }
        });
    }

    handleTraingSupportClick(){
        this.resetClasses();
        this.trainingClass = 'training';

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "	https://gauravlokhande-dev-ed.develop.my.site.com/AgricultureEmpowerment/s/trainingandsupportpage"
            }
        });
 
    }

    handleMarketTrendsClick(){
        this.resetClasses();
        this.marketClass = 'market';

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/AgricultureEmpowerment/s/markettrendspage"
            }
        });
 
    }
    handleSeedsAndFertilizerClick(){
        this.resetClasses();
        this.seedsClass = 'seeds';

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/AgricultureEmpowerment/s/seeds-and-fertilizers"
            }
        });
 
     }

     handleFeedbackClick(){
        this.resetClasses();
        this.feedbackClass = 'feedback';

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/AgricultureEmpowerment/s/feedback"
            }
        });
 
     }
     handleNewAndTipsClick(){
        this.resetClasses();
        this.newsClass = 'news';

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
               url: "https://gauravlokhande-dev-ed.develop.my.site.com/AgricultureEmpowerment/s/newsandtipspage"
            }
        });
     }

}