@isTest
public class InstallHelperTest {
static testMethod void installPostScriptTest()
   {
    InstallHelper installHelper = new InstallHelper();
    Test.testInstall(installHelper, null);
    List<Sobject> viewSet = ccsp__SPM_Configration__c.getAll().values();
    System.assert(viewSet != null, 'Post Installation Script Failed'); 
   }
}