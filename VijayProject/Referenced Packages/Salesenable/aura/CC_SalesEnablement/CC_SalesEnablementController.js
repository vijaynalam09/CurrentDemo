({
	doInit : function(component, event, helper) {
        helper.initiate(component);
	},
    closePopup : function(component, event, helper){
        $(component.find('dialogBackground').getElement()).hide();
        $(component.find('popDiv').getElement()).hide();
        $(component.find('previewBinder').getElement()).hide();
        $(component.find('docDetails').getElement()).hide();
        $(component.find('AddOpptoPortal').getElement()).hide();
        $(component.find('CreateDealReport').getElement()).hide();
        
    },
    previewBinder : function(component, event, helper){
        helper.previewRecommendedBinder(component, event);
    },
    docDetails : function(component, event, helper){
        helper.popUpDocDetails(component, event);
    },
    AddOppToPortal : function(component, event, helper){
        helper.AddOpptoPortalView(component, event);
    },
    CreateDealReport : function(component, event, helper){
        helper.CreateDealReportView(component, event);
    },
    linkToPortal : function(component, event, helper){
        var portalId = $(component.find('portalID').getElement()).val();
        component.set("v.selectedPortalId", portalId);
        helper.linkOppToPortal(component, event);
    },
    linkToNewPortal : function(component, event, helper){
        var portalName = $(component.find('portalName').getElement()).val();
        component.set("v.newPortalName", portalName);
        var portalTempID = $(component.find('portalTempID').getElement()).val();
        component.set("v.selectedPortalTemplateId", portalTempID);
        var portalMgrID = $(component.find('portalMgrID').getElement()).val();
        component.set("v.selectedPortalManagerRoleId", portalMgrID);
        var portalIndID = $(component.find('portalIndID').getElement()).val();
        component.set("v.selectedIndustryId", portalIndID);
        helper.linkOppToNewPortal(component, event);
    },
    createReport : function(component, event, helper){
        var CompanyName = $(component.find('CompanyName').getElement()).val();
        component.set("v.dealReport.CompanyName", CompanyName);
        var FiscYear = $(component.find('FiscYear').getElement()).val();
        component.set("v.dealReport.FiscalYear", FiscYear);
        var DealSize = $(component.find('DealSize').getElement()).val();
        component.set("v.dealReport.DealSize", DealSize);
        var salesRegion = $(component.find('salesRegion').getElement()).val();
        component.set("v.dealReport.Region", salesRegion);
        var industryOpt = $(component.find('industryOpt').getElement()).val();
        component.set("v.dealReport.Industry", industryOpt);
        var BusPartner = $(component.find('BusPartner').getElement()).val();
        component.set("v.dealReport.BusinessPartner", BusPartner);
        var Product = $(component.find('Product').getElement()).val();
        component.set("v.dealReport.Product", Product);
        var Payees = $(component.find('Payees').getElement()).val();
        component.set("v.dealReport.Payees", Payees);
        var Competitor = $(component.find('Competitor').getElement()).val();
        component.set("v.dealReport.Competitor", Competitor);
        var SalesProcessBackground = $(component.find('SalesProcessBackground').getElement()).val();
        component.set("v.dealReport.SalesProcessBackground", SalesProcessBackground);
        var Problem = $(component.find('Problem').getElement()).val();
        component.set("v.dealReport.Problem", Problem);
        var Cause = $(component.find('Cause').getElement()).val();
        component.set("v.dealReport.Cause", Cause);
        var WinOrLossEle = $('input[name=WinOrLoss]:checked');
        var WinOrLoss;
        if(WinOrLossEle != null){
            WinOrLoss = WinOrLossEle.val();
        }
        var DealTypeEle = $('input[name=DealType]:checked');
        var DealType;
        if(DealTypeEle != null){
            DealType = DealTypeEle.val();
        }
        component.set("v.dealReport.WinOrLoss", 'true');
        component.set("v.dealReport.DealType", 'true');
        if(CompanyName == "" || FiscYear == "" || DealSize == "" || salesRegion == "" || industryOpt == ""
          || BusPartner == "" || Product == "" || Payees == "" || Competitor == "" || SalesProcessBackground == ""
           || Problem == "" || Cause == "" || WinOrLoss == null || DealType == null){
			alert('Please enter all required fields');
        }else{
        	helper.createDealReportFinal(component, event);
        }
    },
    emailFile : function(component, event, helper){
    	helper.emailDocument(component, event);
    },
    downloadFile : function(component, event, helper){
    	var doc = component.get("v.selDoc");
        window.open(doc.URL);
    },
    previewFile : function(component, event, helper){
    	var doc = component.get("v.selDoc");
        if(doc != null && doc.PreviewUrl != null && doc.PreviewUrl != "")
        	window.open(doc.PreviewUrl);
        else
        	alert('Preview not available for this document.');
    },
    addItemToPortal : function(component, event, helper){
    	helper.addDocToPortal(component, event);
    },
    saveSnippet : function(component, event, helper){
    	helper.SaveSnippet(component, event);
    }
})