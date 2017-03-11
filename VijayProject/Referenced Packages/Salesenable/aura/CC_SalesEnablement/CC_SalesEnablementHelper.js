({
	initiate : function(component) {
        $(component.find('spinner').getElement()).show();        
		var opaction = component.get("c.getInit");
        opaction.setParams({
            "objId": component.get("v.recordId")
        });
        opaction.setCallback(this, function(actionResult) {
            
        });
        $A.enqueueAction(opaction);
        component.set("v.showRecommendations", false);
        var RecDocsAction = component.get("c.getRecommendedDocs");
        var RecDocRes;
        RecDocsAction.setCallback(this, function(actionResult) {
            component.set("v.recommendDocs", actionResult.getReturnValue());
            RecDocRes = component.get("v.recommendDocs");
        });
        $A.enqueueAction(RecDocsAction);     
        
        var RecBinsAction = component.get("c.getRecommendedBinds");
        RecBinsAction.setCallback(this, function(actionResult) {
            component.set("v.recommendBinds", actionResult.getReturnValue());
            var result = component.get("v.recommendBinds");
            
            if((RecDocRes != null && RecDocRes.length > 0) || (result != null && result.length > 0)){
                component.set("v.showRecommendations", true);
            }else{
                $(component.find('msgDiv').getElement()).show();
            }
        });
        $A.enqueueAction(RecBinsAction);
        
        var ChecklistAction = component.get("c.getSnippetInfo");
        ChecklistAction.setCallback(this, function(actionResult) {
            component.set("v.checklistItems", actionResult.getReturnValue());
            var result = component.get("v.checklistItems");
            if(result != null && result.length > 0)
                component.set("v.showChecklists", true);
            else
                component.set("v.showChecklists", false);
        });
        $A.enqueueAction(ChecklistAction);
        
        var SMEsAction = component.get("c.getSMEsInfo");
        SMEsAction.setCallback(this, function(actionResult) {
            component.set("v.SMEs", actionResult.getReturnValue());
            var result = component.get("v.SMEs");
            
            if(result != null && result.length > 0){
                for(var i=0;i<result.length;i++){
                    if(result[i].IsToShow == true){
                        component.set("v.showSMEs", true);
                        break;
                    }
                }
            }
        });
        $A.enqueueAction(SMEsAction);
        
        //getPortalOptions
        var PortalOptsAction = component.get("c.getPortalOptions");
        PortalOptsAction.setCallback(this, function(actionResult) {
            component.set("v.portalOptions", actionResult.getReturnValue());
            var result = component.get("v.portalOptions");
        });
        $A.enqueueAction(PortalOptsAction);
        
        //portalTemplateOptions
        var PortalTempOptsAction = component.get("c.getportalTemplateOptions");
        PortalTempOptsAction.setCallback(this, function(actionResult) {
            component.set("v.portalTemplateOptions", actionResult.getReturnValue());
            var result = component.get("v.portalTemplateOptions");
        });
        $A.enqueueAction(PortalTempOptsAction);
        
        //portalManagerRoleOptions
        var PortalMgrRoleOptsAction = component.get("c.getportalManagerRoleOptions");
        PortalMgrRoleOptsAction.setCallback(this, function(actionResult) {
            component.set("v.portalManagerRoleOptions", actionResult.getReturnValue());
            var result = component.get("v.portalManagerRoleOptions");
        });
        $A.enqueueAction(PortalMgrRoleOptsAction);
        
        //industryOptions
        var industryOptsAction = component.get("c.getindustryOptions");
        industryOptsAction.setCallback(this, function(actionResult) {
            component.set("v.industryOptions", actionResult.getReturnValue());
            var result = component.get("v.industryOptions");
            $(component.find('spinner').getElement()).hide();
            $(component.find('mainDiv').getElement()).show();
        });
        $A.enqueueAction(industryOptsAction);
        
	},
    previewRecommendedBinder : function(component, event){
        var selectedItem = event.currentTarget;
        var BinderId = selectedItem.dataset.record;
        $(component.find('dialogBackground').getElement()).show();
        $(component.find('popDiv').getElement()).show();
        $(component.find('previewBinder').getElement()).show();
		$('html, body').animate({
            scrollTop: eval($("#popDiv").offset().top - 120)
        }, 1000);
        var Binders = component.get("v.recommendBinds");
        for(var i=0;i<Binders.length;i++){

            if(BinderId==Binders[i].BinderID){
                component.set("v.selBinder", Binders[i]); 
                break;
            }
        }
        $(component.find('spinner2').getElement()).hide();
        
    },
    popUpDocDetails : function(component, event){
        var selectedItem = event.currentTarget;
        var Index = selectedItem.dataset.record;
        $(component.find('dialogBackground').getElement()).show();
        $(component.find('popDiv').getElement()).show();
        $(component.find('docDetails').getElement()).show();
		$('html, body').animate({
            scrollTop: eval($("#popDiv").offset().top - 120)
        }, 1000);
        $(component.find('spinner2').getElement()).show();
        var docs = component.get("v.recommendDocs");
        for(var i=0;i<docs.length;i++){

            if(Index==docs[i].Index){
                component.set("v.selDoc", docs[i].doc); 

                break;
            }
        }
        $(component.find('spinner2').getElement()).hide();
    },
    AddOpptoPortalView : function(component, event){
        $(component.find('dialogBackground').getElement()).show();
        $(component.find('popDiv').getElement()).show();
        $(component.find('AddOpptoPortal').getElement()).show();
        $(component.find('spinner2').getElement()).show();
        $('html, body').animate({
            scrollTop: eval($("#popDiv").offset().top - 120)
        }, 1000);
        $(component.find('spinner2').getElement()).hide();
    },
    CreateDealReportView : function(component, event){
        $(component.find('dialogBackground').getElement()).show();
        $(component.find('popDiv').getElement()).show();
        $(component.find('spinner2').getElement()).show();
        $('html, body').animate({
            scrollTop: eval($("#popDiv").offset().top - 120)
        }, 1000);
        $(component.find('CreateDealReport').getElement()).show();
        
        var fetchDealReportAction = component.get("c.getfetchDealReportParameters");
        fetchDealReportAction.setParams({
            "objId": component.get("v.recordId")
        });
        fetchDealReportAction.setCallback(this, function(actionResult) {
            //alert(actionResult.getReturnValue());
        });
        $A.enqueueAction(fetchDealReportAction);
        
        //fiscalYearOptions
        var fiscalYearOptionsAction = component.get("c.getfiscalYearOptions");
        fiscalYearOptionsAction.setCallback(this, function(actionResult) {
            component.set("v.fiscalYearOptions", actionResult.getReturnValue());
        });
        $A.enqueueAction(fiscalYearOptionsAction);
        //dealSizeOptions
        var dealSizeOptionsAction = component.get("c.getdealSizeOptions");
        dealSizeOptionsAction.setCallback(this, function(actionResult) {
            component.set("v.dealSizeOptions", actionResult.getReturnValue());
        });
        $A.enqueueAction(dealSizeOptionsAction);
        //regionOptions
        var regionOptionsAction = component.get("c.getregionOptions");
        regionOptionsAction.setCallback(this, function(actionResult) {
            component.set("v.regionOptions", actionResult.getReturnValue());
        });
        $A.enqueueAction(regionOptionsAction);
        //businessPartnerOptions
        var businessPartnerOptionsAction = component.get("c.getbusinessPartnerOptions");
        businessPartnerOptionsAction.setCallback(this, function(actionResult) {
            component.set("v.businessPartnerOptions", actionResult.getReturnValue());
        });
        $A.enqueueAction(businessPartnerOptionsAction);
        //productOptions
        var productOptionsAction = component.get("c.getproductOptions");
        productOptionsAction.setCallback(this, function(actionResult) {
            component.set("v.productOptions", actionResult.getReturnValue());
        });
        $A.enqueueAction(productOptionsAction);
        //competitorOptions
        var competitorOptionsAction = component.get("c.getcompetitorOptions");
        competitorOptionsAction.setCallback(this, function(actionResult) {
            component.set("v.competitorOptions", actionResult.getReturnValue());
        });
        $A.enqueueAction(competitorOptionsAction);
        //DealReportDefinitions
        var DealReportDefinitionsAction = component.get("c.getDealReportDefinitionsOpt");
        DealReportDefinitionsAction.setCallback(this, function(actionResult) {
            component.set("v.DealReportDefinitions", actionResult.getReturnValue());
        });
        $A.enqueueAction(DealReportDefinitionsAction);
        //dealReport
        var dealReportAction = component.get("c.getdealReport");
        dealReportAction.setCallback(this, function(actionResult) {
            component.set("v.dealReport", actionResult.getReturnValue());
            $(component.find('spinner2').getElement()).hide();
        });
        $A.enqueueAction(dealReportAction);
        
    },
    linkOppToPortal : function(component, event){
        var linkOppToPortalaction = component.get("c.getlinkToPortal");
        //alert(component.get("v.selectedPortalId"));
        $(component.find('spinner2').getElement()).show();
        linkOppToPortalaction.setParams({
            "objId": component.get("v.recordId"),
            "selPortalId": component.get("v.selectedPortalId")
        });
        linkOppToPortalaction.setCallback(this, function(actionResult) {
            $(component.find('spinner2').getElement()).hide();
            alert(actionResult.getReturnValue());
        });
        $A.enqueueAction(linkOppToPortalaction);
    },
    linkOppToNewPortal : function(component, event){
        var linkOppToNewPortalaction = component.get("c.getlinkToNewPortal");
        $(component.find('spinner2').getElement()).show();
        linkOppToNewPortalaction.setParams({
            "objId": component.get("v.recordId"),
            "portalName" : component.get("v.newPortalName"),
            "selMgrRoleId" : component.get("v.selectedPortalTemplateId"),
            "selTempId" : component.get("v.selectedPortalManagerRoleId"),
            "selIndId" : component.get("v.selectedIndustryId")
        });
        linkOppToNewPortalaction.setCallback(this, function(actionResult) {
			$(component.find('spinner2').getElement()).hide();
            alert(actionResult.getReturnValue());
        });
        $A.enqueueAction(linkOppToNewPortalaction);
    },
    createDealReportFinal : function(component, event){
        var CreateDealReportaction = component.get("c.getcreateDealReport");
        var dealreport = component.get("v.dealReport");
        $(component.find('spinner2').getElement()).show();
        CreateDealReportaction.setParams({
            "objId": component.get("v.recordId"),
            "obj" : $A.util.json.encode(dealreport)
        });
        CreateDealReportaction.setCallback(this, function(actionResult) {
			$(component.find('spinner2').getElement()).hide();
            alert(actionResult.getReturnValue());
        });
        $A.enqueueAction(CreateDealReportaction);
    },
    emailDocument : function(component, event){
    	var emailDocumentaction = component.get("c.getemailDocument");
        var doc = component.get("v.selDoc");
        $(component.find('spinner2').getElement()).show();
        emailDocumentaction.setParams({
            "objId": component.get("v.recordId"),
            "docToDownload" : $A.util.json.encode(doc)
        });
        emailDocumentaction.setCallback(this, function(actionResult) {
			$(component.find('spinner2').getElement()).hide();
            alert(actionResult.getReturnValue());
        });
        $A.enqueueAction(emailDocumentaction);
    },
    addDocToPortal : function(component, event){
    	var addDocToPortalaction = component.get("c.getAddDocToPortal");
        var doc = component.get("v.selDoc");
        $(component.find('spinner2').getElement()).show();
        addDocToPortalaction.setParams({
            "objId": component.get("v.recordId"),
            "docId" : doc.Id
        });
        addDocToPortalaction.setCallback(this, function(actionResult) {
            $(component.find('spinner2').getElement()).hide();
			alert(actionResult.getReturnValue());
        });
        $A.enqueueAction(addDocToPortalaction);
    },
    SaveSnippet : function(component, event){
    	var SaveSnippetaction = component.get("c.getsaveSnippets");
        var selectedItem = event.currentTarget;
        var docId = selectedItem.dataset.record;
        var selDoc = event.target;
        var isSelected = selDoc.checked;
        var parentNode = selDoc.parentNode;
        //alert('docId'+docId+'objId'+component.get("v.recordId")+'isSelected'+isSelected);
        
        $(component.find('spinner2').getElement()).show();
        SaveSnippetaction.setParams({
            "objId": component.get("v.recordId"),
            "docId" : docId,
            "isInsertOrDelete" : isSelected
        });
        SaveSnippetaction.setCallback(this, function(actionResult) {
            $(component.find('spinner2').getElement()).hide();
			//alert(actionResult.getReturnValue());
            if(actionResult.getReturnValue() == 'success'){
                if(isSelected == true){
                    parentNode.style.fontWeight = 'bold';
                	parentNode.style.color = 'grey';
                }else{
                    parentNode.style.fontWeight = 'normal';
                	parentNode.style.color = 'black';
                }
            }
        });
        $A.enqueueAction(SaveSnippetaction);
    }
})