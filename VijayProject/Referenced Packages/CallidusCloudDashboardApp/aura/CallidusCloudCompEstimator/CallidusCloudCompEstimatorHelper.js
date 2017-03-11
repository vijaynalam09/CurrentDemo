({
	init: function(component, oppid){
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        $(component.find('spin').getElement()).show();
        var opaction = component.get("c.getOpportunity");
        opaction.setParams({
            "oppid": oppid
        });
        opaction.setCallback(this, function(actionResult) {
            component.set("v.opportunity", actionResult.getReturnValue());
            var opp = component.get("v.opportunity");
            var lastRun = opp.ccsfDashboardAp__Commission_Last_Run__c;
        });
        $A.enqueueAction(opaction);
        
        var action = component.get("c.getPositions");
        var self = this;
        var defaultPosition;
        var positions;
        action.setCallback(this, function(actionResult) {
            component.set("v.positions", actionResult.getReturnValue());  
            positions = component.get("v.positions");//Getting Map and Its value
        });        
        $A.enqueueAction(action);
        
        var selPosAction = component.get("c.getselPosition");
        selPosAction.setCallback(this, function(actionResult) {
            var selPos = actionResult.getReturnValue();//Getting Map and Its value
            if(selPos != null){
                defaultPosition = selPos;
            }
            else if(positions.length > 0){
                defaultPosition = positions[0];
                $(component.find('estBlock').getElement()).show();
                $(component.find('position').getElement()).show();
                
            }
            if(positions.length == 1){
                $(component.find('estBlock').getElement()).hide();
                $(component.find('position').getElement()).hide();
            }
            setTimeout(function(){
                $(component.find('soPosition').getElement()).val(defaultPosition);
            },200);
            
        });        
        $A.enqueueAction(selPosAction);
        
        var msgAction = component.get("c.getservError");
        msgAction.setCallback(this, function(actionResult) {
            component.set("v.servError", actionResult.getReturnValue());
            var ErrorMsg = component.get("v.servError");//Getting Map and Its value
            if(ErrorMsg != ""){
                $(component.find('estBlock').getElement()).show();
                $(component.find('position').getElement()).hide();
            }
        });
        $A.enqueueAction(msgAction);
        
        var userCurncyAction = component.get("c.getUserCurrency");
        userCurncyAction.setCallback(this, function(actionResult) {
            component.set("v.currencySymbl", actionResult.getReturnValue());  
        });        
        $A.enqueueAction(userCurncyAction);
        
        var userTimeZoneAction = component.get("c.getUserTimeZone");
        userTimeZoneAction.setCallback(this, function(actionResult) {
            component.set("v.timeZoneSymbl", actionResult.getReturnValue());  
        });        
        $A.enqueueAction(userTimeZoneAction);
        
        var oppaction = component.get("c.getOpportunityEstimates");
        oppaction.setParams({
            "oppid": oppid
        });
        oppaction.setCallback(this, function(actionResult) {
            component.set("v.estimates", actionResult.getReturnValue());
            var estimates = component.get("v.estimates");//Getting Map and Its value
            
            if(estimates.length > 0){
                $('#result-block, #highchart-block').show();
                var categorySource = [];
                var cvdata = [];
                var fvdata = [];
                var totalEstimate;
                
                for(var i=0; i<estimates.length; i++){
                    categorySource[i] = estimates[i].bonusComponent;
                    var s = estimates[i].currentValue+'';
                    var d = estimates[i].forecastedValue+'';
                    cvdata[i] = estimates[i].currentValue;
                    fvdata.push({ y: Math.round(estimates[i].forecastedValue), color: '#4B8A08' });// = estimates[i].forecastedValue;
                    
                    totalEstimate = estimates[i].totalValue;     
                    console.log('Estimate '+Math.round(totalEstimate));
                    totalEstimate = component.get("v.currencySymbl")+' '+Math.round(totalEstimate).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                }       
                
                var chart = $(component.find('highchart').getElement()).highcharts({
                    chart: {
                        type: 'bar'                                               
                    },
                    title: {
                        text: 'TOTAL ESTIMATED COMMISSION',
                        color:'#4B8A08',
                        y: 20
                    },
                    subtitle: {
                        text: totalEstimate,
                        y: 55
                    },
                    xAxis: {
                        categories: categorySource,
                        crosshair: true,
                        lineWidth: 0,
						gridLineWidth: 0,
						minorGridLineWidth: 0,
						tickWidth: 0,
                        labels: {                            
                            style: {
                                fontFamily: 'Arial',
                                fontSize: '14px',                                                                 
                            },
                            align: 'left',
                            x: 0
                        },
                        offset: 100
                    },
                    yAxis: {
                        min: 0,
                        title: {                           
                            text: 'Amount'
                        },
                        labels: {
                            overflow: 'justify',
                            style: {
                                fontFamily: 'Arial',
                                fontSize: '14px'                                
                            }
                        }
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0;padding-right:15px;">{series.name}: </td>' +
                        '<td style="padding:0; text-align:right;"><b>$ <span class="currency">{point.y:.0f}</span></b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                        lang: {
                            thousandsSep: ','
                        }
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'CURRENT VALUE',
                        data: cvdata
            
                    }, {
                        name: 'FORECASTED VALUE',
                        data: fvdata,
            			color: '#4B8A08'
                    }]
                });
                $('#focusss').focus();
            }
            
            setTimeout(function(){
                $('.currency').each(function(){
                    var amount = $(this).text();
                    amount = Math.round(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); 
                    $(this).text(' '+amount);
                    $('#focusss').focus();
                });
            },1000);
        });        
        $A.enqueueAction(oppaction);
        
        setTimeout(function(){
            $(component.find('spin').getElement()).hide();
        },200);
        
        var LoadEstimatesComp = component.get("c.getLoadEstimates");
        LoadEstimatesComp.setCallback(this, function(actionResult) {
            component.set("v.isLoadEstimates", actionResult.getReturnValue()); 
            var isLoadEstimates = component.get("v.isLoadEstimates");
            if(isLoadEstimates == true && defaultPosition != null){
                this.getEstimatedCalculations(component, defaultPosition, oppid);
            }
        });
        $A.enqueueAction(LoadEstimatesComp);
    },
    getEstimatedCalculations: function(component, positionName, oppId) {
		setTimeout(function(){
            $(component.find('spin').getElement()).show();
        },200);
        
        
        var actionEst = component.get("c.getEstimate");
        actionEst.setParams({
            "positionName": positionName,
            "oppid": oppId
        });
        var self = this;
        actionEst.setCallback(this, function(actionResult) {
            component.set("v.estimates", actionResult.getReturnValue());
            var estimates = component.get("v.estimates");//Getting Map and Its value
            if(estimates.length > 0){
            	$('#result-block, #highchart-block').show();
            	var categorySource = [];
                var cvdata = [];
                var fvdata = [];
                var totalEstimate;
                
                for(var i=0; i<estimates.length; i++){
                    categorySource[i] = estimates[i].bonusComponent;
                    cvdata[i] = estimates[i].currentValue;
                    fvdata.push({ y: parseInt(estimates[i].forecastedValue), color: '#4B8A08' });
                    
                    totalEstimate = estimates[i].totalValue;
                    totalEstimate = component.get("v.currencySymbl")+' '+Math.round(totalEstimate).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                }
                $(component.find('highchart').getElement()).highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'TOTAL ESTIMATED COMMISSION',
                        color:'#4B8A08',
                        y: 20
                    },
                    subtitle: {
                        text: totalEstimate,
                        y: 55
                    },
                    xAxis: {
                        categories: categorySource,
                        crosshair: true,
                        lineWidth: 0,
						gridLineWidth: 0,
						minorGridLineWidth: 0,
						tickWidth: 0,
                        labels: {
                            style: {
                                fontFamily: 'Arial',
                                fontSize: '14px'
                            },
                            align: 'left',
                            x: -5
                        },
                        offset: 100
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Amount'
                        },
                        labels: {
                            style: {
                                fontFamily: 'Arial',
                                fontSize: '14px'
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>$ {point.y:.0f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'CURRENT VALUE',
                        data: cvdata
            
                    }, {
                        name: 'FORECASTED VALUE',
                        data: fvdata,
            			color: '#4B8A08'
                    }]
                });    
            }
            
            setTimeout(function(){
                $(component.find('spin').getElement()).hide();
            },200);
            
            setTimeout(function(){
                $('.currency').each(function(){
                    var amount = $(this).text();
                    amount = Math.round(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                    
                    $(this).text(' '+amount);
                });
            },1000);
        });        
        $A.enqueueAction(actionEst);
        
        var msgAction2 = component.get("c.getservError");
        msgAction2.setCallback(this, function(actionResult) {
            component.set("v.servError", actionResult.getReturnValue());
            var ErrorMsg = component.get("v.servError");//Getting Map and Its value
            if(ErrorMsg != ""){
                setTimeout(function(){
                    $('#result-block, #highchart-block').hide();
                },100);
            }
        });
        $A.enqueueAction(msgAction2);
    }
})