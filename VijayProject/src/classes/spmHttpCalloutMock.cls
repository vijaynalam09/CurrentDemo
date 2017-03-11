@isTest
global  class spmHttpCalloutMock implements HttpCalloutMock{

	global HTTPResponse respond(HTTPRequest req) {
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('[{"ObjectiveId":"412c69a9-fcd4-4681-9e1a-58ea8d32b3a0","UserId":"b4427558-67c1-472b-ae9a-222cdff22bee","UserName":"","CriteriaName":"Engagement","CategoryName":"BREAKAWAY","ObjectiveDescription":"Testingh","ObjectiveDateEntered":"2016-08-22T00:00:00","ObjectiveStatus":"8741efe7-5349-4136-abc6-46bee0fbb0aa","AssignedCriteria":"e013ff9c-688a-4eda-9a11-dce62254679d","ObjectiveDueDate":null,"ObjectiveComment":"","ObjectiveRepComment":"","FCRCompleted":true,"ObjectiveAssignedTo":"Bagli_TRN, James","FCRAuthor":"56a4b374-5cb0-4e82-b8a5-2edd88cf3890","ObjectiveIsPIP":false,"ObjectiveStatusDescription":"Agreed on Action Step","PersonalCommentId":"","CommentAuthorId":"","AuthorId":"","ObjectiveAuthor":"Halpin_TRN, Patrick","IsCompleted":false}]');
        res.setStatusCode(200);
        return res;
	}
}