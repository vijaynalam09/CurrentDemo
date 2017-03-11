public class SPMAPICall {
 public static HttpResponse getBasicAuthCallout()
 {
       //This is the prevoius approach to mentain user Mangement in SFDC
        //string urlforAccesstoken='http://qaapis.sfoptimizer.com/Authenticate/Token';
        ccsp__SPM_Configration__c objSett = ccsp__SPM_Configration__c.getInstance('urlforAccesstoken');
        string urlforAccesstoken = objSett.value__c;
        string username='patrick.halpin@novartis.com.test';
        //ccsp__SPM_Configration__c objSetU = ccsp__SPM_Configration__c.getInstance('Username');
        //string username = objSetU.value__c;
        //string username = UserInfo.getUsername();
        string password='Coaching@2018';
        ccsp__SPM_Configration__c objSetP = ccsp__SPM_Configration__c.getInstance('Password');
        //string password = objSetP.value__c;
 /*
     //This is current Approach
     List<user> userL=[select id,name,ccsp__SPM_Username__c,ccsp__Password__c,ccsp__SPM_url_for_access_token__c,ccsp__SPM_objective_end_point__c from user WHERE Id=:UserInfo.getUserId() LIMIT 1];
        string urlforAccesstoken=userL[0].ccsp__SPM_url_for_access_token__c;
         string username=userL[0].ccsp__SPM_Username__c;
        //string username = UserInfo.getUsername();
        string password= userL[0].ccsp__Password__c;*/
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(urlforAccesstoken);
        req.setMethod('POST');
        Blob headerValue = Blob.valueOf(username + ':' + password);
        String authorizationHeader = 'Basic '+EncodingUtil.base64Encode(headerValue);
        req.setHeader('Authorization', authorizationHeader);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Content-LENGTH', '4096');
        req.setBody('');
        HTTPResponse res = http.send(req);
        //system.debug('Response Token: '+res.getHeader('Token'));
        return res;
    }
    @AuraEnabled
    public static List<SPMWrapper> spmResponse()
    {
    //List<Task> taskList=[Select id,Subject,Description,Author__c,Category_Name__c,Criteria_Name__c,Spm_status__c from Task];
    List<user> userList=[select id,name,ccsp__SPM_Username__c,ccsp__Password__c,ccsp__SPM_url_for_access_token__c,ccsp__SPM_objective_end_point__c from user WHERE Id=:UserInfo.getUserId() LIMIT 1];
     string ur=userList[0].ccsp__SPM_objective_end_point__c;
     HTTPResponse rsp= getBasicAuthCallout();
        //system.debug('Token: '+rsp.getHeader('Token'));
        string s=rsp.getHeader('Token');
        //string ur='http://qaapis.sfoptimizer.com/objectives';
        /*ccsp__SPM_Configration__c objSet = ccsp__SPM_Configration__c.getInstance('ObjectiveEndpoint');
        string ur = objSet.value__c;*/
        HTTPRequest reqest = new HTTPRequest();
        HTTP h = new HTTP();
        reqest.setEndpoint(ur);
        reqest.setMethod('GET');
        if(rsp != null && rsp.getHeader('Token') != null)
            reqest.setHeader('Token',rsp.getHeader('Token'));
        HTTPResponse resp=h.send(reqest);
        //system.debug('Json Response: '+resp.getBody());
        //string jsonString=resp.getBody();
        string jsonString= resp.getbody().replaceAll('\n','').replaceAll('\r','');
       // system.debug('Json Response: '+jsonString);
        List<SPMWrapper> myObjectList=(List<SPMWrapper>)JSON.deserialize(jsonString,List<SPMWrapper>.class);
        List<Task> taskList=[Select Subject,Description,ActivityDate,ccsp__Author__c,ccsp__Category_Name__c,ccsp__Criteria_Name__c,ccsp__ObjectiveId__c,Spm_status__c from Task];
        List<Task> tList= new List<Task>();
        List<Task> updateTaskList = new List<Task>();
        //system.debug('Objective due date--->: '+myObjectList[1].ObjectiveDueDate);
        system.debug('Activity date: '+taskList); 
        if(myObjectList!=null && taskList!=null)
        {
        Boolean taskExists = false;
        for(SPMWrapper sp:myObjectList)
        {
         taskExists = false;
          for(Task task: taskList) {
                if(task.ccsp__ObjectiveId__c == sp.ObjectiveId) {
                    taskExists = true;
                    //System.debug('Task are available :'+ taskExists);
                    task.Subject=sp.ObjectiveDescription;
                    //System.debug('date and time :'+ sp.ObjectiveDueDate);
                    //task.ActivityDate=sp.ObjectiveDueDate;
                    if(sp.ObjectiveDueDate!=NULL)
                    {
                        task.ActivityDate=date.ValueOf(sp.ObjectiveDueDate);
                    }
                    //task.ActivityDate=date.parse(sp.ObjectiveDueDate); 
                    //task.ActivityDate=date.ValueOf(myObjectList[0].ObjectiveDueDate);
                    task.ObjectiveId__c=sp.ObjectiveId;
                    task.Description=sp.ObjectiveComment;
                    task.Category_Name__c=sp.CategoryName;
                    task.Criteria_Name__c=sp.CriteriaName;
                    if(sp.ObjectiveAuthor!=NULL)
                    {
                     task.Author__c=sp.ObjectiveAuthor;
                    }
                    if(sp.ObjectiveStatus=='412c69e9-fcd4-4680-9e1a-58ea8d32b3a0')
                    {
                     task.Status='Closed By Manager'; 
                    }
                    else if(sp.ObjectiveStatus=='8741efe7-5349-4136-abc6-46bee0fbb0aa')
                     {
                      task.Status='Agreed on Action Step';  
                     }
                    else if(sp.ObjectiveStatus=='775f901d-0bc5-49a8-b060-6bd82966d46b')
                     {
                      task.Status='Completed By Associate';  
                     }
                    else if(sp.ObjectiveStatus=='ab4e72ab-756c-46fc-8bea-856a4b391df5')
                     {
                      task.Status='In Progress';  
                     }
                    else if(sp.ObjectiveStatus=='ce8d1c61-8acd-4fe1-9ba1-f65ce4746ec9')
                     {
                      task.Status='Completed';  
                     }
                    //task.Spm_status__c=sp.ObjectiveStatus;                    
                    updateTaskList.add(task);
                    //System.debug('Update Task List :'+ updateTaskList);
                    break;
                }
            }
            if(!taskExists) {
                Task tsk=new Task();
                tsk.Subject=sp.ObjectiveDescription;
                System.debug('date and time :'+ sp.ObjectiveDueDate);
                if(sp.ObjectiveDueDate!=NULL)
                {
                tsk.ActivityDate=date.ValueOf(sp.ObjectiveDueDate);
                }
                tsk.ObjectiveId__c=sp.ObjectiveId;
                tsk.Description=sp.ObjectiveComment;
                tsk.Category_Name__c=sp.CategoryName;
                tsk.Criteria_Name__c=sp.CriteriaName;
                if(sp.ObjectiveAuthor!=NULL)
                {
                tsk.Author__c=sp.ObjectiveAuthor;
                }
                if(sp.ObjectiveStatus=='412c69e9-fcd4-4680-9e1a-58ea8d32b3a0')
                {
                 tsk.Status='Closed By Manager';  
                }
                else if(sp.ObjectiveStatus=='8741efe7-5349-4136-abc6-46bee0fbb0aa')
                {
                 tsk.Status='Agreed on Action Step';  
                }
                else if(sp.ObjectiveStatus=='775f901d-0bc5-49a8-b060-6bd82966d46b')
                     {
                      tsk.Status='Completed By Associate';  
                     }
                    else if(sp.ObjectiveStatus=='ab4e72ab-756c-46fc-8bea-856a4b391df5')
                     {
                      tsk.Status='In Progress';  
                     }
                    else if(sp.ObjectiveStatus=='ce8d1c61-8acd-4fe1-9ba1-f65ce4746ec9')
                     {
                      tsk.Status='Completed';  
                     }
                //tsk.Spm_status__c=sp.ObjectiveStatus;
                //if(tsk.ObjectiveId__c!=sp.ObjectiveId)
                  tList.add(tsk);
               // System.debug('Comment:'+ tsk.Description);
                }
            }
         }
        if(myObjectList!=null && !tList.isEmpty())
            //System.debug('Insert Task List :'+ tList);
            Database.insert(tList);
        if(!updateTaskList.isEmpty())
         Database.update(updateTaskList);
       // SPMAPICall.getComments();
        return myObjectList;
    }
    /*  <<<<This method is to render objectives on Chatter pane which is from SPM response>>>> */
 /* @AuraEnabled
  public static List<SPMWrapper> getComments()
  {
      HTTPResponse rsp= getBasicAuthCallout();
        system.debug('Token: '+rsp.getHeader('Token'));
        string s=rsp.getHeader('Token');
        ccsp__SPM_Configration__c objSet = ccsp__SPM_Configration__c.getInstance('ObjectiveEndpoint');
        string ur = objSet.value__c;
        HTTPRequest reqest = new HTTPRequest();
        HTTP h = new HTTP();
        reqest.setEndpoint(ur);
        reqest.setMethod('GET');
        if(rsp != null && rsp.getHeader('Token') != null)
            reqest.setHeader('Token',rsp.getHeader('Token'));
        HTTPResponse resp=h.send(reqest);
        system.debug('Json Response: '+resp.getBody());
        string jsonString= resp.getbody().replaceAll('\n','').replaceAll('\r','');
        List<SPMWrapper> ObjectList=(List<SPMWrapper>)JSON.deserialize(jsonString,List<SPMWrapper>.class);
        //List<FeedItem> fList=[select Body,ParentId from FeedItem];
        List<FeedItem> fList =new List<FeedItem>();
        for(SPMWrapper sp:ObjectList)
        {
            FeedItem fdm=new FeedItem();
            fdm.ParentId= userinfo.getuserid();
            string author=sp.ObjectiveAuthor;
            string objectiveassiged=sp.ObjectiveAssignedTo;
            //if(objectiveassiged==UserInfo.getName());
            fdm.body=author+' has created Task ' + '"'+sp.ObjectiveDescription + '"' + ' for you';
            //fdm.LinkUrl =URL.getSalesforceBaseUrl().toExternalForm()+'/one/one.app#/sObject/Task/home?t=1478842016724';
            fList.add(fdm);
        }
        //if(ObjectList!=null && fList!=null)
            Database.insert(fList);
        return ObjectList;
  }*/
    public class SPMWrapper {
        public String ObjectiveRepComment{get;set;}
        public String ObjectiveComment{get;set;}
        public Boolean FCRCompleted{get;set;}
        public String ObjectiveDueDate{get;set;}
        public String ObjectiveAssignedTo{get;set;}
        public String AssignedCriteria{get;set;}
        public String FCRAuthor{get;set;}
        public String ObjectiveStatus{get;set;}
        public Boolean ObjectiveIsPIP{get;set;}
        public String ObjectiveDateEntered{get;set;}
        public String ObjectiveStatusDescription{get;set;}
        public String ObjectiveDescription{get;set;}
        public String PersonalCommentId{get;set;}
        public String CategoryName{get;set;}
        public String CommentAuthorId{get;set;}
        public String CriteriaName{get;set;}
        public String AuthorId{get;set;}
        public String UserName{get;set;}
        public String ObjectiveAuthor{get;set;}
        public String UserId{get;set;}
        public Boolean IsCompleted{get;set;}
        public String ObjectiveId{get;set;}  
}
}