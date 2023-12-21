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



}