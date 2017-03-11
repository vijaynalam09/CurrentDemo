@isTest
public class SPMAPICallTest {
    @isTest 
    public static void testGetCalloutWithOutTask() 
     { 
    ccsp__SPM_Configration__c urlinfo = new ccsp__SPM_Configration__c();
    urlinfo.Name = 'urlforAccesstoken';
    urlinfo.Value__c = 'http://qaapis.sfoptimizer.com/Authenticate/Token';
   insert urlinfo;
    ccsp__SPM_Configration__c objSetturl = ccsp__SPM_Configration__c.getInstance('urlforAccesstoken');
    system.assert(objSetturl!=null);
       ccsp__SPM_Configration__c userinfo = new ccsp__SPM_Configration__c();
    userinfo.Name = 'Username';
    userinfo.Value__c = 'akaravad+9@calliduscloud.com';
    insert userinfo;
    ccsp__SPM_Configration__c objSettuser = ccsp__SPM_Configration__c.getInstance('Username');
    system.assert(objSettuser!=null);
       ccsp__SPM_Configration__c pinfo = new ccsp__SPM_Configration__c();
    pinfo.Name = 'Password';
    pinfo.Value__c = 'Coaching@2017';
    insert pinfo;
    ccsp__SPM_Configration__c objSettp = ccsp__SPM_Configration__c.getInstance('Password');
    system.assert(objSettp!=null);
       ccsp__SPM_Configration__c tinfo = new ccsp__SPM_Configration__c();
    tinfo.Name = 'ObjectiveEndpoint';
    tinfo.Value__c = 'http://qaapis.sfoptimizer.com/objectives';
    insert tinfo;
    ccsp__SPM_Configration__c objSettt = ccsp__SPM_Configration__c.getInstance('ObjectiveEndpoint');
    system.assert(objSettt!=null);
       //HttpResponse resp=SPMAPICall.getBasicAuthCallout();
       //System.assert(resp!=null); 
       Test.startTest();
       Test.setMock(HttpCalloutMock.class , new spmHttpCalloutMock());
       Test.stopTest();
       List<SPMAPICall.SPMWrapper> respons=SPMAPICall.spmResponse();
       System.assert(respons!=null); 
      // HttpResponse res=HttpCalloutMock.respond(HttpRequest req); 
   } 
   @isTest 
   public static void testSpmMethod()
   {
   List<Task> tasklist = [Select id,Subject,Description,Category_Name__c,Criteria_Name__c,Author__c from Task];
       SPMAPICall.SPMWrapper w=new SPMAPICall.SPMWrapper();
       //List<SPMAPICall.SPMWrapper> w=new SPMAPICall.spmResponse();
       Task t =new Task();
         t.Description='';
         t.Category_Name__c='';
         t.Criteria_Name__c='';
         t.Author__c='Test';
         t.ActivityDate=null;
         t.ObjectiveId__c='TestObjectiveid';
         //t.Status='';
         tasklist.add(t);
          //if(tasklist==NULL)
         insert taskList;
         //database.insert(tasklist);
         //system.assert(t.id!=null);
         //system.assert(t.Author__c!=null);
         w.ObjectiveDescription='test';
         w.ObjectiveRepComment='';
         w.ObjectiveComment='';
         w.FCRCompleted=false;
         w.ObjectiveDueDate='';
         w.ObjectiveAssignedTo='';
         w.AssignedCriteria='';
         w.FCRAuthor='';
         w.ObjectiveStatus='';
         w.ObjectiveIsPIP=false;
         w.ObjectiveDateEntered='';
         w.ObjectiveStatusDescription='';
         w.ObjectiveDescription='';
         w.PersonalCommentId='';
         w.CategoryName='';
         w.CommentAuthorId='';
         w.CriteriaName='';
         w.AuthorId='';
         w.UserName='';
         w.ObjectiveAuthor='';
         w.UserId='';
         w.IsCompleted=false;
         w.ObjectiveId='TestObjectiveid';
       system.assertEquals(w.ObjectiveId,t.ObjectiveId__c);
         
   }
public class SpmHttpCalloutMock implements HttpCalloutMock
{
// Implement this interface method
    public HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('[{"ObjectiveId":"0e8df901-2351-4c74-89bb-33bb226432bb","UserId":"b4427558-67c1-472b-ae9a-222cdff22bee","UserName":"","CriteriaName":"FEgherghert","CategoryName":"","ObjectiveDescription":"Fshrggsrg","ObjectiveDateEntered":"","ObjectiveStatus":"","AssignedCriteria":"","ObjectiveDueDate":null,"ObjectiveComment":"Rep : Trying to do it.._Sep 13 2016\rRep : Started on 13th_Sep 13 2016\r","ObjectiveRepComment":"","FCRCompleted":false,"ObjectiveAssignedTo":"","FCRAuthor":"","ObjectiveIsPIP":false,"ObjectiveStatusDescription":"Agreed on Action Step","PersonalCommentId":"","CommentAuthorId":"","AuthorId":"","ObjectiveAuthor":"Halpin_TRN, Patrick","IsCompleted":false}]');
        response.setStatusCode(200);
        response.getHeader('Token');
        return response;
}
}   
     }