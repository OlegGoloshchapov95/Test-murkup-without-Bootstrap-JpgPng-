 var rangePicker = document.querySelector(".range-picker");
 var div1 = document.createElement("div"); 
 div1.className = "box";
 rangePicker.appendChild(div1);
 div1.style.zIndex = 40;
 div1.style.left = "30px";
 var boxWidth = div1.offsetWidth;
 var div2 = div1.cloneNode(false); 
 rangePicker.appendChild(div2);
 div2.style.zIndex = 15;
 div2.style.left="100px";  

 var bridge = document.createElement("div");
 bridge.className = "bridge"; 
 rangePicker.appendChild(bridge); 
 function posBridge(){
     bridge.style.left =  parseInt(div1.style.left)+6+"px";
     bridge.style.width = parseInt(div2.style.left)-parseInt(div1.style.left)+"px";
 } 
 posBridge();
 priceValues();
 function moveAt(e,thisDiv,secondDiv){ 
   var rangePickerPosition = rangePicker.getBoundingClientRect();  
   var relativePos = true;
   if(parseInt(thisDiv.style.left)<parseInt(secondDiv.style.left)){
     relativePos = false;
   }   
   var left = e.pageX - thisDiv.offsetWidth / 2 - rangePickerPosition.left;
 
   var newRelPos = true;
   if(left<parseInt(secondDiv.style.left)){
     newRelPos = false;
   }    
   if((left>=0) && (left<=rangePicker.offsetWidth+1) && (newRelPos==relativePos)){
     thisDiv.style.left = left+"px";
   }    
   posBridge();
   priceValues();
 }  
 function priceValues(){
   var prFrom = rangePicker.querySelector('#from');
   var prTo = rangePicker.querySelector('#to');
   var width = parseInt(rangePicker.offsetWidth);
   var startPr = 1500;
   var endPr = 50000000;
   prFrom.innerHTML = value(parseInt(div1.style.left));
   prTo.innerHTML = value(parseInt(div2.style.left));
   function value(elLeft){
     return toCommaSeparatedString(Math.ceil((endPr-startPr)*(elLeft/width)+startPr));
   }
   function toCommaSeparatedString(n){
    if(n>0){
       var str= String(n);
       var arr=str.split('');
       //arr.splice(2, 0, ",");
       for(var i=arr.length-3; i>0; i=i-3){
        arr.splice(i,0,","); 
       } 
       var str=arr.join('');
       return str;
     }else{
      return String(n);
     }
   } 
 }
 window.onresize = function(e) {
    if(parseInt(rangePicker.offsetWidth)<parseInt(div2.style.left)){
      div1.style.left = "30px";
      div2.style.left="100px";
      posBridge();  
      priceValues(); 
    } 
 };          
 div1.onmousedown = function(e){
     moveAt(e,div1,div2);          
     document.onmousemove = function(e){
        moveAt(e,div1,div2); 
     } 
     document.onmouseup = function(){
        document.onmousemove = null;
     }  
 } 
 div2.onmousedown = function(e){
    moveAt(e,div2,div1);
                 
    document.onmousemove = function(e){
       moveAt(e,div2,div1); 
    } 
    document.onmouseup = function(){
       document.onmousemove = null;     
    }  
 } 