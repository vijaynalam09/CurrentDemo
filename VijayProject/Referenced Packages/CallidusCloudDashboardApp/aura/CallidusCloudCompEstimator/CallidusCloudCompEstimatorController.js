({
	doInit : function(component, event, helper) {
        var oppId = component.get('v.recordId');
        helper.init(component, oppId);
    },
    getCalculations : function(component, event, helper) {
        var positionName = $(component.find('soPosition').getElement()).val();
        var oppId = component.get('v.recordId');
        helper.getEstimatedCalculations(component, positionName, oppId);
    }
})