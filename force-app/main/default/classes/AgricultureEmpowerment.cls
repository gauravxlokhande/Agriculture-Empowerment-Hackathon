public without Sharing class AgricultureEmpowerment {
    @AuraEnabled
    public static String insertViews(String view){
        List<Market_Trend__c> marketList = [Select Id,View__c From Market_Trend__c];

            Market_Trend__c market  = new Market_Trend__c();
            market.View__c = view;
            market.Submission_Date__c = System.Today();
            insert market;
            return 'View Added Succesfully';
    }
    
    @AuraEnabled
    public static List<Market_Trend__c> showViews(){
        List<Market_Trend__c> viewList = [Select View__c,Submission_Date__c From Market_Trend__c];
        return viewList;
    }
    
    //   @AuraEnabled
    // public static List<Seeds__c> FetchAllSeeds(){
    //     List<Seeds__c> AllSeeds =[Select Id, Name,Recommended_Season__c,Image_Url__c,Information__c,Image__c,(Select Id, Name FROM Fertilizers__r) FROM Seeds__c];
    //     return AllSeeds;
    // }
    
    
    //   @AuraEnabled
    //  public static List<Fertilizers__c> FetchAllFertilizers(){
    //     List<Fertilizers__c> AllFertilizers =[Select Id, Name,Image_Url__c,Information__c,Image__c,Seeds__r.Name FROM Fertilizers__c];
    //     return AllFertilizers;
    // }
    
    // @AuraEnabled
    // Public Static List<News_Tips__c> FetchAllNewsData(){
    //     List<News_Tips__c> NewsNTips =[Select Id,Headline__c,Description__c,Image__c,Website_url__c,Date__c FROM News_Tips__c];
    //     return NewsNTips;
    // }
    
    @AuraEnabled
    public static List<Seasonal_Calendar__c>FetchSeasonalCalendarData(){
        List<Seasonal_Calendar__c> seasonalCalendar = [Select Id, Start_Date__c,End_Date__c,Information__c,Types_of_Seasons__c,Crop__r.Name From Seasonal_Calendar__c ];
        return seasonalCalendar;
    }
    
    @AuraEnabled
    public static String insertFeedback(String queryValue){
        Feedback__c feedbackList = [Select Id, Description__c From Feedback__c];
        Feedback__c feedback = new Feedback__c();
        feedback.Description__c = queryValue;
        feedback.Submission_Date__c = System.Today();
        insert feedback;
        return 'Query Inserted Succesfully!';
        
    }
}