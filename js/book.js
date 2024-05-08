let a='';
let b='';
let flag=0;
let searchinputbox = document.querySelector('#source_postal_code');
let pickup=document.querySelector("#search-button");
pickup.addEventListener
("click",function(){ 
   
  if(flag==0)
 {    
     a+=searchinputbox.value;
    console.log(`Entered source address is ${a}`);
    searchinputbox.value='';
    searchinputbox.placeholder='';
    searchinputbox.placeholder='Destination Postal Code '; 
       flag=1;                                   
  }
        else{
       b+=searchinputbox.value;
        console.log(`Entered destination address is ${b}`);    
        swal(`Entered source address is ${a} and destination address is ${b}`, ".", "success");
        searchinputbox.value='';
       searchinputbox.placeholder='';
       searchinputbox.placeholder='Source Postal Code';
        
      flag=0;
}
});