 var rangePicker = document.querySelector(".range-picker");
 var div1 = document.createElement("div"); 
 div1.className = "box";
 rangePicker.appendChild(div1);
 div1.style.zIndex = 40;
 div1.style.left = "60px";

 var div2 = div1.cloneNode(false); 
 rangePicker.appendChild(div2);
 div2.style.zIndex = 15;
 div2.style.left="450px";  

 
 function moveAt(e,thisDiv,secondDiv){ 
 var rangePickerPosition = rangePicker.getBoundingClientRect();  
 var relativePos = true;
 if(parseInt(thisDiv.style.left)<parseInt(secondDiv.style.left)){
   relativePos = false;
 }   
 var newPosThis =  e.pageX - thisDiv.offsetWidth / 2 - rangePickerPosition.left-rangePicker.style.marginLeft;  
 var newRelPos = true;
 if(parseInt(newPosThis)<parseInt(secondDiv.style.left)){
   newRelPos = false;
 }     
   
 if((e.pageX>rangePickerPosition.left)&&(e.pageX<rangePickerPosition.right)&&(newRelPos==relativePos)) { 
      thisDiv.style.left = e.pageX - thisDiv.offsetWidth / 2 - rangePickerPosition.left + 'px';
   }
 }  

 window.onresize = function(event) {
     moveAt(e,div1,div2);
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