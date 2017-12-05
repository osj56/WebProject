function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
          
            var fullAddr = ''; 
            var extraAddr = ''; 
            var sido = ''; 

     
            if (data.userSelectedType === 'R') { 
                fullAddr = data.roadAddress;
                sido = data.sido;
            } else { 
                fullAddr = data.jibunAddress;
                sido = data.sido;
            }

            
            if(data.userSelectedType === 'R'){
               
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
               
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
         
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                sido = data.sido;
            }

            document.getElementById('postcode').value = data.zonecode; 
            document.getElementById('address').value = fullAddr;
            document.getElementById('sido').value = sido;
            document.getElementById('address2').focus();
        }
    }).open();
}

