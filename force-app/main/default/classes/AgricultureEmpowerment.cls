public without sharing class AgricultureEmpowerment {

    // To Fetch Seeds data
    @AuraEnabled
    public static List<Seeds__c> FetchAllSeeds() {
      List<Seeds__c> AllSeeds = [
      Select Id, Read_More__c, Show_Image__c, Name, Recommanded_Season__c,
      Information_del1__c, Image_Url__c FROM Seeds__c
      ];
     System.debug(AllSeeds);
    return AllSeeds;
   }

     // To Fertilizers Seeds data
    @AuraEnabled
    public static List<Fertilizers__c> FetchAllFertilizers() {
    List<Fertilizers__c> AllFertilizers = [
    Select Id, Read_More__c, Information__c, Name,
    Image_Url__c FROM Fertilizers__c
    ];
    System.debug(AllFertilizers);
    return AllFertilizers;
    }
  
   
     // To insert views of farmers 
   @AuraEnabled
  public static String insertViews(String view){
      List<Market_Trend__c> marketList = [Select Id,View__c From Market_Trend__c];

          Market_Trend__c market  = new Market_Trend__c();
          market.View__c = view;
          market.Submission_Date__c = System.Today();
          insert market;
          return 'View Added Succesfully';
  }

    // Show views of farmers
    @AuraEnabled
     public static List<Market_Trend__c> showViews(){
      List<Market_Trend__c> viewList = [Select View__c,Submission_Date__c From Market_Trend__c];
      return viewList;
  }
  
  
  //all news data
    @AuraEnabled 
  Public Static List<News_Tips__c> FetchAllNewsData(){
      List<News_Tips__c> NewsNTips =[Select Id,Headline__c,Description__c,Image_Url__c,Website_url__c,Date__c FROM News_Tips__c];
      return NewsNTips;
  }
  
   // Seasonal calender data
  @AuraEnabled
  public static List<Seasonal_Calendar__c>FetchSeasonalCalendarData(){
      List<Seasonal_Calendar__c> seasonalCalendar = [Select Id, Start_Date__c,End_Date__c,Information__c,Seeds__r.Name From Seasonal_Calendar__c ];
      System.debug(seasonalCalendar);
      return seasonalCalendar;
  }
  
  // To insert Feedback
  @AuraEnabled
  public static String insertFeedback(String queryValue){
      Feedbacks__c feedback = new Feedbacks__c();
      feedback.Feedback__c = queryValue;
      feedback.Submission_Date__c = System.Today();
      insert feedback;
      System.debug(feedback);
      return 'Query Inserted Succesfully!';
  }
  
  
  @AuraEnabled
  public static List<Schems__c> schemelist(){    
      List<Schems__c> scheme =[Select Id,Name,Read_More__c,Information__c,Date__c from Schems__c ];
      return  scheme;
  }

  @AuraEnabled
  public static List<Important_Links__c> ImportantLinks(){    
  List<Important_Links__c> implink =[Select Id,Name,Image__c,Url__c from Important_Links__c ];
  return  implink;
}
  
}
