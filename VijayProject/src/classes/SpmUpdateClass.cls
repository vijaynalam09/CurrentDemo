public class SpmUpdateClass
{
  @future (callout=true)
  public static void spmUpdateMethod(string objectiveid,string description,string status,string objectivecomment)
  {
    SPMAPICall spm=new SPMAPICall();
    HTTPResponse rsp=SPMAPICall.getBasicAuthCallout();  
    //system.debug('Token: '+rsp.getHeader('Token'));
    string token=rsp.getHeader('Token');
      ccsp__SPM_Configration__c objSet = ccsp__SPM_Configration__c.getInstance('ObjectiveEndpoint');
       string url = objSet.value__c;
       HTTPRequest reqest = new HTTPRequest();
       HTTP h = new HTTP();
       reqest.setEndpoint(url);
       
       // Testing
       //reqest.setMethod('PATCH');
       //Newly added code
      //reqest.setHeader('X-HTTP-Method-Override','PATCH');
        reqest.setMethod('POST');
      if(rsp != null && rsp.getHeader('Token') != null)
      reqest.setHeader('Token',rsp.getHeader('Token'));
      reqest.setHeader('Content-Type','application/json');
      //system.debug('The objective id is' + objectiveid);
      string js='[{"ObjectiveId":"'+objectiveid+'","ObjectiveDescription":"'+description+'","ObjectiveStatus":"'+status+'","ObjectiveComment":"'+objectivecomment+'"}]';
      //system.debug('Request body from SFDC' + js);
      reqest.setBody(js);
      HTTPResponse res=h.send(reqest);
      string spmResponse= res.getbody();
      //system.debug('Response from SPM'+spmResponse);
  }
}