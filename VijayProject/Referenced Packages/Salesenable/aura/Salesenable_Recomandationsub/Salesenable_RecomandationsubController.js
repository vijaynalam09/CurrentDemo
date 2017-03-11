({
	ToggleCollapse : function(component, event, helper) { 

        var curElement = event.srcElement;
        var parElement = event.srcElement.parentElement.parentElement.parentElement; 
		
        for (var i = 0; i < parElement.childNodes.length; i++) {
            if (parElement.childNodes[i].className && parElement.childNodes[i].className.indexOf("container") > -1) {
               	
                if(curElement.innerText =='❯')
                {
                    parElement.childNodes[i].classList.remove("hide");
                    parElement.childNodes[i].classList.add("show");
               		curElement.innerText = '﹀';
                }else if(curElement.innerText == '﹀')
                {
                    parElement.childNodes[i].classList.remove("show");
                    parElement.childNodes[i].classList.add("hide");
               		curElement.innerText = '❯';
                }

              break;
            }
        }
	}
})