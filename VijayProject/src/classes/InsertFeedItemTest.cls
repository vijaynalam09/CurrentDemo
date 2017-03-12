@isTest
public class InsertFeedItemTest
{
	//This method is to test many records from feeditem object
static testMethod void testfeed() {
    Task t=new Task(Subject='test_S',Description='test_D',ActivityDate=NULL,ccsp__Author__c='test_A',ccsp__ObjectiveId__c='Test_oId',Spm_status__c='test_S');
    insert t;
    System.assert(t.Id!=NULL);
    FeedItem fdm=new FeedItem();
    fdm.ParentId=t.id;
    fdm.body='Test Body';
    insert fdm;
    Task ts=[Select id,Subject,Description,ActivityDate,ccsp__Author__c,ccsp__ObjectiveId__c,Spm_status__c from Task WHERE Id =:t.Id];
    System.assertEquals('test_S', ts.Subject);
    System.assertEquals(ts.id, fdm.ParentId);
    System.assert(ts.id!=NULL);
    System.assert(fdm.id!=NULL);
    }
}