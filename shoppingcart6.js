
 //------------Global Functions

 // convert a value to x decimal places
    function ConvertDecimal(v,x)
    {
     var rvalue;
       
       if (isNaN(v)) {
          rvalue = '';
         } else {
           rvalue = v.toFixed(x);
       }
     
     return rvalue;
     }


// compute amount;
 function computeamount()
  {
     var q,p,a;
        q = document.getElementById("qty").value * 1;
        p = document.getElementById("price").value * 1;        

        a = ConvertDecimal(q*p,2);

        document.getElementById("amount").value=a;
  }

  function initcart(){
     cart=[];
     document.getElementById("items").value=0;
     document.getElementById("totalamount").innerHTML='';
   }

    function showcart(){

           var i,l,carttext,totalamount,ln;
            var tbody;

            document.getElementById("tablebody").innerHTML='';
            l = cart.length;

            for (i=0,totalamount=0,carttext="",tbody='';i<l;i++){
            ln=i+1;    
            
            tbody += "<tr>"
                +'<td>'+ln+' </td>'
                +'<td>'+cart[i].item+' </td>'
                +'<td style="text-align:right">'+ConvertDecimal(cart[i].qty*1,0)+'</td>'
                +'<td style="text-align:right">'+ConvertDecimal(cart[i].price*1,2)+'</td>'
                +'<td style="text-align:right">'+ConvertDecimal(cart[i].itemamount()*1,2)+'</td>'                
                +"</tr>";
               
                       
                totalamount=(totalamount*1)+(ConvertDecimal(cart[i].itemamount()*1,2)*1);
            }

            console.log(totalamount);
             totalamount=ConvertDecimal(totalamount*1,2);
     
             document.getElementById("tablebody").innerHTML=tbody;

             document.getElementById("items").value=l;
             
             document.getElementById("totalamount").innerHTML=''+totalamount;                

        }


// this is the main program here--------------------------------- (like main() in c or c++)
(() => {

     initcart();

    const btnCancel = document.getElementById("btnCancel");
    const btnConfirm= document.getElementById("btnConfirm");
    const dlgConfirmCancel = document.getElementById("dlgConfirmCancel");
    dlgConfirmCancel.returnValue = "confirm";


    const btnYes = document.getElementById("btnYes");
    const btnNo= document.getElementById("btnNo");
    const dlgAreYouSure = document.getElementById("dlgAreYouSure");
    dlgAreYouSure.returnValue = "no";

     const input_qty= document.getElementById('qty');
     input_qty.addEventListener('change', e => {
         e.currentTarget.value = parseFloat(e.currentTarget.value).toFixed(0)
    });

     input_qty.addEventListener("keyup", ()=> {
      
            computeamount();
      }
      );     

      const input_price=document.getElementById("price");
      input_price.addEventListener('change', e => {
         e.currentTarget.value = parseFloat(e.currentTarget.value).toFixed(2)
    });


    input_price.addEventListener("keyup",
        ()=>{
        computeamount();
    }
    );

    const itemselect=document.getElementById("itemselect");
    itemselect.addEventListener("change",
        ()=>{
        document.getElementById("qty").value="";
        document.getElementById("price").value="";
        document.getElementById("amount").value="";

    }
    );


   document.getElementById("btndelete").addEventListener("click",
   ()=>{
     var x,l;

     l = cart.length;

     x=document.getElementById("delitem").value*1;

     --x;
    
     if (x>=0 && x<l) { //  && confirm("Delete item "+(x+1)+"?")) {

         document.getElementById("dlgmsg").innerHTML="Delete the item "+(x+1)+" "+cart[x].item+"?"  
         dlgConfirmCancel.showModal();  
     }
   
   });

  document.getElementById("btnaddtocart").addEventListener("click",
    ()=>{
        
        var cartitem = {
             "item": "1",
             "price": 0,
             "qty": 1,
             "itemamount" : function itemamount(){
                 return Math.round(this.price*this.qty*100)/100;  
               }
           };

          cartitem.item=document.getElementById("itemselect").value;
          cartitem.qty=ConvertDecimal(document.getElementById("qty").value*1,2);
          cartitem.price=ConvertDecimal(document.getElementById("price").value*1,2);

         // console.log(cartitem.item);
         // console.log(cartitem.qty);
         // console.log(cartitem.price);

          cart.push(cartitem);
          showcart();
    }
    );
  
    document.getElementById("btnclearcart").addEventListener("click",
   ()=>{
       
         document.getElementById("dlgmsg").innerHTML="Clear the cart?"  
         dlgConfirmCancel.showModal();  

   });

      // Form close button closes the dialog box
    btnConfirm.addEventListener("click", () => {
        dlgConfirmCancel.returnValue="confirm";
      dlgConfirmCancel.close("confirm");
 
    });

       // Form close button closes the dialog box
   btnCancel.addEventListener("click", () => {
         dlgConfirmCancel.returnValue="cancel";
         dlgConfirmCancel.close("cancel");
 
    });

      // Form close button closes the dialog box
    btnYes.addEventListener("click", () => {
        dlgAreYouSure.returnValue="yes";
      dlgConfirmCancel.close("yes");
 
    });

     // Form close button closes the dialog box
    btnNo.addEventListener("click", () => {
        dlgAreYouSure.returnValue="no";
      dlgConfirmCancel.close("no");
 
    });

   
   

    // ---- THIS IS THE FUNCTION THAT DOES CLEARING OF THE CART AND DELETION OF ITEMS
    // ---- USING A MODAL DIALOG

    dlgConfirmCancel.addEventListener("close",(e)=>
    {
        var rst= e.target.returnValue;
        var lblmsg = document.getElementById("dlgmsg").innerHTML;
        if (rst=="confirm") {
            if (lblmsg=="Clear the cart?" ){ 
               dlgAreYouSure.showModal();
              //  initcart();
              // showcart();
            }  else if (lblmsg.substring(0,15)=="Delete the item"){
                var x=document.getElementById("delitem").value*1 - 1;
                cart.splice(x,1);
                showcart();
                document.getElementById("delitem").value='';

            } 
        }
        
    });


    dlgAreYouSure.addEventListener("close",(e)=>
    {
        var rst= e.target.returnValue;
        var lblmsg = document.getElementById("dlgmsg").innerHTML;
        if (rst=="yes" && lblmsg=="Clear the cart?" ){ 
               
                initcart();
               showcart();
            }        
        
    });

    })();  // THE MAIN PROGRAM MUST BE TERMINATED BY THIS!!!!
  
   var cart=[];
