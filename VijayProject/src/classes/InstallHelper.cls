public class InstallHelper implements InstallHandler {
    public void onInstall(InstallContext context) {
        if(context.previousVersion() == null) { 
            
            /* Insert Custom Settings */
              insertWebServiceConfig();      
        } 
    }
	private void insertWebServiceConfig()
	 {
	   List<ccsp__SPM_Configration__c> webServiceList = new List<ccsp__SPM_Configration__c>();
	   webServiceList.add(new ccsp__SPM_Configration__c(
                 Name = 'urlforAccesstoken',
                 Value__c = 'http://qaapis.sfoptimizer.com/Authenticate/Token'
            ));
	  webServiceList.add(new ccsp__SPM_Configration__c(
                 Name = 'Username',
                 Value__c = 'akaravad+9@calliduscloud.com'
            ));
	  webServiceList.add(new ccsp__SPM_Configration__c(
                 Name = 'Password',
                 Value__c = 'Coaching@2017'
            ));
      webServiceList.add(new ccsp__SPM_Configration__c(
                 Name = 'ObjectiveEndpoint',
                 Value__c = 'http://qaapis.sfoptimizer.com/objectives'
            ));
			insert webServiceList;
	 }
	}