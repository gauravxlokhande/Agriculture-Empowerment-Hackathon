public class TranslateLanguageAgri {

    //HOME, SEEDS & FERTILIZER, MARKET TRENDS
    @AuraEnabled
     public static String GetAllTranslation(String labelName, String language) {
        String result = System.Label.get('', labelName, language);
        System.debug('result Hindi '+result);
        return result;
    }
   
    //NEWS 
    @AuraEnabled
    public static string CropSelection(String label){
        if(label =='hindi'){
            return System.Label.get('', 'CropSelection', 'hi');       
        }
        return 'No Language Found';
    }
    
     @AuraEnabled
    public static string soilprepration(String label){
        if(label =='hindi'){
            return System.Label.get('', 'soilprepration', 'hi');       
        }
        return 'No Language Found';
    }
    
     @AuraEnabled
    public static string seedselection(String label){
        if(label =='hindi'){
            return System.Label.get('', 'seedselection', 'hi');       
        }
        return 'No Language Found';
    }
    
     @AuraEnabled
    public static string seedsowing(String label){
        if(label =='hindi'){
            return System.Label.get('', 'seedsowing', 'hi');       
        }
        return 'No Language Found';
    }
    
    @AuraEnabled
    public static string irrigation(String label){
        if(label =='hindi'){
            return System.Label.get('', 'irrigation', 'hi');       
        }
        return 'No Language Found';
    }
    
    
     @AuraEnabled
    public static string FertilizersandManures(String label){
        if(label =='hindi'){
            return System.Label.get('', 'FertilizersandManures', 'hi');       
        }
        return 'No Language Found';
    }
    
    
     @AuraEnabled
    public static string WeedManagement(String label){
        if(label =='hindi'){
            return System.Label.get('', 'Weed_Management', 'hi');       
        }
        return 'No Language Found';
    }
    
    
     @AuraEnabled
    public static string tipsfordiseases(String label){
        if(label =='hindi'){
            return System.Label.get('', 'Tips_for_Pests_and_Diseases_Management_in_Agriculture', 'hi');       
        }
        return 'No Language Found';
    }
    
    
    @AuraEnabled
    public static string tipsforHarvesting(String label){
        if(label =='hindi'){
            return System.Label.get('', 'Tips_for_Harvesting_Plants', 'hi');       
        }
        return 'No Language Found';
    }
}