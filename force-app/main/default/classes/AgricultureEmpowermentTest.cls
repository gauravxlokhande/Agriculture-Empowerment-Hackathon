@isTest public class AgricultureEmpowermentTest {
    

    
    @isTest
   static void testFetchAllSeeds() {
       Seeds__c seed1 = new Seeds__c(Name = 'Seed1', Recommanded_Season__c = '	Winter', Information_del1__c = 'Info1', Image_Url__c = 'URL1');
       Seeds__c seed2 = new Seeds__c(Name = 'Seed2', Recommanded_Season__c = 'Summer', Information_del1__c = 'Info2', Image_Url__c = 'URL2');
       insert new List<Seeds__c>{seed1, seed2};

       List<Seeds__c> resultSeeds = AgricultureEmpowerment.FetchAllSeeds();
       
       System.assertEquals(2, resultSeeds.size(), 'Expected 2 seeds');
       System.assertEquals('Seed1', resultSeeds[0].Name, 'Unexpected seed name');
       System.assertEquals('Winter', resultSeeds[0].Recommanded_Season__c, 'Unexpected recommended season');
       System.assertEquals('Seed2', resultSeeds[1].Name, 'Unexpected seed name');
       System.assertEquals('Summer', resultSeeds[1].Recommanded_Season__c, 'Unexpected recommended season');
   }

   
    @isTest
   static void testFetchAllFertilizers() {
       Fertilizers__c fertilizer1 = new Fertilizers__c(Name = 'Fertilizer1', Information__c = 'Info1', Image_Url__c = 'URL1');
       Fertilizers__c fertilizer2 = new Fertilizers__c(Name = 'Fertilizer2', Information__c = 'Info2', Image_Url__c = 'URL2');
       insert new List<Fertilizers__c>{fertilizer1, fertilizer2};

       List<Fertilizers__c> resultFertilizers = AgricultureEmpowerment.FetchAllFertilizers();

       System.assertEquals(2, resultFertilizers.size(), 'Expected 2 fertilizers');
       System.assertEquals('Fertilizer1', resultFertilizers[0].Name, 'Unexpected fertilizer name');
       System.assertEquals('Info1', resultFertilizers[0].Information__c, 'Unexpected fertilizer information');
       System.assertEquals('Fertilizer2', resultFertilizers[1].Name, 'Unexpected fertilizer name');
       System.assertEquals('Info2', resultFertilizers[1].Information__c, 'Unexpected fertilizer information');
   }

   @isTest
   static void testInsertViews() {
       String view = 'TestView';
       String result = AgricultureEmpowerment.insertViews(view);

       List<Market_Trend__c> resultViews = [SELECT Id, View__c FROM Market_Trend__c];
       System.assertEquals(1, resultViews.size(), 'Expected 1 view');
       System.assertEquals(view, resultViews[0].View__c, 'Unexpected view value');
   }

   @isTest
   static void testShowViews() {
       Market_Trend__c view1 = new Market_Trend__c(View__c = 'View1');
       Market_Trend__c view2 = new Market_Trend__c(View__c = 'View2');
       insert new List<Market_Trend__c>{view1, view2};

       List<Market_Trend__c> resultViews = AgricultureEmpowerment.showViews();

       System.assertEquals(2, resultViews.size(), 'Expected 2 views');
       System.assertEquals('View1', resultViews[0].View__c, 'Unexpected view value');
       System.assertEquals('View2', resultViews[1].View__c, 'Unexpected view value');
   }

   @isTest
   static void testFetchAllNewsData() {
       News_Tips__c news1 = new News_Tips__c(Headline__c = 'Headline1', Description__c = 'Description1', Image_Url__c = 'URL1', Website_url__c = 'Website1', Date__c = Date.today());
       News_Tips__c news2 = new News_Tips__c(Headline__c = 'Headline2', Description__c = 'Description2', Image_Url__c = 'URL2', Website_url__c = 'Website2', Date__c = Date.today());
       insert new List<News_Tips__c>{news1, news2};

       List<News_Tips__c> resultNews = AgricultureEmpowerment.FetchAllNewsData();

       System.assertEquals(2, resultNews.size(), 'Expected 2 news');
       System.assertEquals('Headline1', resultNews[0].Headline__c, 'Unexpected news headline');
       System.assertEquals('Description1', resultNews[0].Description__c, 'Unexpected news description');
       System.assertEquals('Headline2', resultNews[1].Headline__c, 'Unexpected news headline');
       System.assertEquals('Description2', resultNews[1].Description__c, 'Unexpected news description');
   }

   @isTest
   static void testFetchSeasonalCalendarData() {
       Seasonal_Calendar__c calendar1 = new Seasonal_Calendar__c(Start_Date__c = Date.today(), End_Date__c = Date.today().addDays(7), Information__c = 'Info1');
       Seasonal_Calendar__c calendar2 = new Seasonal_Calendar__c(Start_Date__c = Date.today().addDays(10), End_Date__c = Date.today().addDays(15), Information__c = 'Info2');
       insert new List<Seasonal_Calendar__c>{calendar1, calendar2};

       List<Seasonal_Calendar__c> resultCalendar = AgricultureEmpowerment.FetchSeasonalCalendarData();

       System.assertEquals(2, resultCalendar.size(), 'Expected 2 calendar entries');
       System.assertEquals('Info1', resultCalendar[0].Information__c, 'Unexpected calendar information');
       System.assertEquals('Info2', resultCalendar[1].Information__c, 'Unexpected calendar information');
   }

   @isTest
   static void testInsertFeedback() {
       String queryValue = 'TestFeedback';
       String result = AgricultureEmpowerment.insertFeedback(queryValue);

       List<Feedbacks__c> resultFeedbacks = [SELECT Id, Feedback__c FROM Feedbacks__c];
       System.assertEquals(1, resultFeedbacks.size(), 'Expected 1 feedback entry');
       System.assertEquals(queryValue, resultFeedbacks[0].Feedback__c, 'Unexpected feedback value');
   }

   @isTest
   static void testSchemelist() {
       Schems__c scheme1 = new Schems__c(Name = 'Scheme1', Read_More__c = 'ReadMore1', Information__c = 'Info1', Date__c = Date.today());
       Schems__c scheme2 = new Schems__c(Name = 'Scheme2', Read_More__c = 'ReadMore2', Information__c = 'Info2', Date__c = Date.today());
       insert new List<Schems__c>{scheme1, scheme2};

       List<Schems__c> resultSchemes = AgricultureEmpowerment.schemelist();

       System.assertEquals(2, resultSchemes.size(), 'Expected 2 schemes');
       System.assertEquals('Scheme1', resultSchemes[0].Name, 'Unexpected scheme name');
       System.assertEquals('ReadMore1', resultSchemes[0].Read_More__c, 'Unexpected scheme read more');
       System.assertEquals('Scheme2', resultSchemes[1].Name, 'Unexpected scheme name');
       System.assertEquals('ReadMore2', resultSchemes[1].Read_More__c, 'Unexpected scheme read more');
   }

}