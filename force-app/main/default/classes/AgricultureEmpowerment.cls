public without sharing class AgricultureEmpowerment {

    // Weather Api to get weather data
    @AuraEnabled
    public static String GetWeatherData(String latitude, String longitude) {

        Weather_API__mdt weatherapi = [Select Api_Key__c, Endpoint__c FROM Weather_API__mdt LIMIT 1];

        Http http = new Http();
        HttpRequest request = new HttpRequest();

        String endpoint = weatherapi.Endpoint__c + '/current?access_key=' + weatherapi.Api_Key__c + '&query=' + latitude + ',' + longitude;
        request.setEndpoint(endpoint);
        request.setMethod('GET');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            System.debug(response.getBody());
            return response.getBody();
        }
        return '';
    }


      @AuraEnabled
      public static List<Seeds__c> FetchAllSeeds() {
        List<Seeds__c> AllSeeds = [
        Select Id, Read_More__c, Show_Image__c, Name, Recommanded_Season__c,
        Information_del1__c, Image_Url__c FROM Seeds__c
        ];
       System.debug(AllSeeds);
      return AllSeeds;
     }

      @AuraEnabled
      public static List<Fertilizers__c> FetchAllFertilizers() {
      List<Fertilizers__c> AllFertilizers = [
      Select Id, Read_More__c, Information__c, Name,
      Image_Url__c FROM Fertilizers__c
      ];
      System.debug(AllFertilizers);
      return AllFertilizers;
      }
    
      @AuraEnabled
       public static List<Market_Trend__c> showViews(){
        List<Market_Trend__c> viewList = [Select View__c,Submission_Date__c From Market_Trend__c];
        return viewList;
    }
    
    

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
    public static List<Seasonal_Calendar__c>FetchSeasonalCalendarData(){
        List<Seasonal_Calendar__c> seasonalCalendar = [Select Id, Start_Date__c,End_Date__c,Information__c,Seeds__r.Name From Seasonal_Calendar__c ];
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


      
    @AuraEnabled 
    Public Static List<News_Tips__c> FetchAllNewsData(){
        List<News_Tips__c> NewsNTips =[Select Id,Headline__c,Description__c,Image_Url__c,Website_url__c,Date__c FROM News_Tips__c];
        return NewsNTips;
    }
    

}