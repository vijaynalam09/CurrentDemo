trigger InsertFeedItem on Task(after insert) 
{
 List<FeedItem> FeedList=new List<FeedItem>();
  List<Task> taskList=[Select id,Subject,Description,ActivityDate,ccsp__Author__c,ccsp__ObjectiveId__c,Spm_status__c from Task];
  for(Task t:trigger.new)
    {
     FeedItem fdm=new FeedItem();
     if(fdm.ParentId!=t.id)
     {
     fdm.ParentId=t.id;
     string Auther=t.ccsp__Author__c;
     fdm.body=Auther+'has created the above task for you.'; 
     FeedList.add(fdm); 
     }
    }
insert FeedList;
}