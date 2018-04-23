	//=============function all validation start===========
	function allValidation(formName,data){

			var url= url ? url: '',
			 form=formName,
			 //variable for password validation
			 passwordValidation=data.passwordValidation,
			 //variable for email validation
			 emailValidation=data.emailValidation,
			 //variable for text field validation
			 textFieldValidation=data.textValidation,
			 //variable for textarea field validation
			 textareaFieldValidation=data.textareaValidation,
			 //variable for radio validation
			 radioValidation=data.radioValidation,
			 //variable fro checkBoxValidation
			 checkBoxValidation=data.checkBoxValidation,
			 //variable for select validation
			 selectValidation=data.selectValidation,
			 //variable for file validation
			 fielValidation=data.fileValitaion,
	 		 emailMatch,
	 		 formData={};


			 if(emailValidation==true){
				emailMatch=/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
			};

			var passwordMatch=new RegExp('','g');

			if(passwordValidation.required==true){
				var rule;
				if((passwordValidation.oneUppercase==true) && (passwordValidation.oneDigit==true) && (passwordValidation.oneSpecialCharacter==true)){
					rule='(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{'+passwordValidation.minLength+','+passwordValidation.maxLength+'}';
				}else{
					rule='[a-zA-Z0-9!@#$%^&*]{'+passwordValidation.minLength  +','+passwordValidation.maxLength+'}';
				}
				passwordMatch=new RegExp(rule , 'g');
			}


			var textMatch=new RegExp('','g');


			if(textFieldValidation.required==true){
				var rule;
				if(textFieldValidation.specialCharacter==true){
					rule='[a-zA-Z0-9!@#$%^&*]{'+textFieldValidation.textMinLength+','+textFieldValidation.textMaxLength+'}';
					textMatch=new RegExp(rule,'g');
				}else{
					rule='[a-zA-Z0-9]{'+textFieldValidation.textMinLength+','+textFieldValidation.textMaxLength+'}';
				}
				
				var textMatch=new RegExp(rule,'g');
				
			}


			var textareaMatch=new RegExp('','g');
			if(textareaFieldValidation.require==true){
				var rule;
				if(textareaFieldValidation.specialCharacter==true){
					rule='[a-zA-Z0-9!@#$%^&*]{'+textareaFieldValidation.minLength+','+textareaFieldValidation.maxLength+'}';
				}else{
					rule='[a-zA-Z0-9]{'+textMinLength+','+textMaxLength+'}';
				}
				var textareaMatch=new RegExp(rule,'g');
			}
			
			form.find('input,textarea').blur(function(){
				
				fieldValidation($(this));
			});

			form.find('select').change(function(){
				fieldValidation($(this));
			})


			//===============================================================
			//function to validate the perticular input fields
			//function fieldValidation start
			function fieldValidation(element){

				if(typeof element.data().required !='undefined'){
					if(element.data().required ==false)
						return true;
				}

				var validCondition=true;
				var value=element.val();
				if(element.is('input')){
					var type=element.attr('type'),
					name=element.attr('name');

					if(value.length <1 && value=='' && type!='file' && type!='hidden'){

						displayError(element,'This Field is Required');
						validCondition=false;
					}else if(value.length > 0 && value!='' && type!='file' && type!='hidden'){
						if(type=='email'){
							if(!(emailMatch.test(value))){
								displayError(element,'Invalid Email');
								validCondition=false;
							}
						}else if(type=='password'){
							if(!(passwordMatch.test(value))){
								displayError(element,'Invalid Password');
								validCondition=false;
							}
						}
						else if(type=='text'){
							if(!(textMatch.test(value))){
							displayError(element,'Invalid Input for this Field');							
								validCondition=false;
							}
						}else if(type=='number'){
							if(isNaN(value)){
								displayError(element,'Please Enter the Number');
								validCondition=false;
							}
						}
					}
					
				}else if(element.is('textarea')){
					if(value.length> 0 && value!=''){

						if(! textareaMatch.test(value)){
							displayError(element,'Invalid Input for this field');
							validCondition=false;
						}
					}else{

						displayError(element,'This Field is Required');
						validCondition=false;
					} 
					
				}else if(element.is('select')){
					if(value.length < 1 && value==''){
						displayError(element,'Please Select One');
						validCondition=false;
					}
				}

				if(validCondition==true && type!=='file' && type !='hidden'){
						
					if(element.hasClass('unique')){
						var table=element.data().table,
						field=element.data().field,
						url=element.data().url+'/checkUnique',
						data={value:value,table:table,field:field};
						editExist=element.data().invalue;
						if(editExist==value){
							setOkMessage(element);
						}else{
							$.ajax({
								type:'post',
								url:url,
								data:data,
								dataType:'json',
								success:function(data){

									if(data.status==true){
										setOkMessage(element);
									}else{
										displayError(element,'This is already taken. Enter Another '+element.attr('placeholder'));
										validCondition=false;
									}
								}
							})
							
						}

					}else{

						setOkMessage(element);
					}
				}

				return validCondition;

			}
			

			function displayError(element,message){
				if(element.parent().hasClass('has-success')){
					element.parent().find('.form-control-feedback').remove();
					element.parent().removeClass('has-success');
				}
				if(element.parent().hasClass('has-error')){
					element.parent().find('.form-control-feedback').remove();
					element.parent().removeClass('has-error');
				}
				element.parent().addClass('has-error').append('<span class="fa fa-times form-control-feedback" aria-hidden="true"></span>');
				if(element.parent().find('span').hasClass('errormessage')){
					element.parent().find('.errormessage').html(message);
				}else{
					element.parent().append('<span class="errormessage">'+message+'</span>');
				}
				
			}

			function setOkMessage(element){
				if(element.parent().hasClass('has-error')){
					element.parents().find('.form-control-feedback').remove();
					element.parent().removeClass('has-error');
				}
				if(element.parent().hasClass('has-success')){
					element.parent().find('.form-control-feedback').remove();
					element.parent().removeClass('has-success');
				}
				element.parent().addClass('has-success').append('<span class="fa fa-check form-control-feedback" aria-hidden="true"></span>');
				if(element.parent().find('span').hasClass('errormessage')){
					element.parent().find('.errormessage').remove();
				}
			}
			//function formValidation end
			//function fieldValidation end
			form.submit(function(e){
				
				var resultArray=[];
				form.find('input,textarea,select').each(function(){
					if($(this).parent().hasClass('has-success')){
						resultArray.push(true);
					}else if($(this).parent().hasClass('has-error')){
						resultArray.push(false)
					}else{
						var result=fieldValidation($(this));
						resultArray.push(result);
					}
					
				})

				if(resultArray.indexOf(false) >=0){
					e.preventDefault();
				}

			});
	}
		
	//=============function all validation end===========
	var formValidationObj={
		passwordValidation: {//parameter for password validation
								required:true,//password validation required:ture no:false
								maxLength:255,//max length of password
								minLength:4,//min length of password
								oneUppercase:false,//one uppercase is must:true else false
								oneDigit:false,//one digit is must:true else false
								oneLowercase:false,//one lowercase is must:true else false
								oneSpecialCharacter:false//one special character is must:true else false
							},
		emailValidation:true,//email validation yes:true,no:false
		textValidation: {
							blank:false,//accept balnk:true no false
							regex:true,//validation required on text field:true no:false
							maxLength:50,//max no or character user can enter on text field
							minLength:2,//min no or character user can enter on text field
							specialCharacter:true//allow special:true don't allow:false
						},
		textareaValidation: {
								blank:true,//accept balnk:true no false
								regex:false,//validation required on textarea field:true no:false
								maxLength:3000,//max no of character user can enter on textarea
								minLength:2,//min no of character user can enter on textarea
								specialCharacter:true//allow special character:true no:false
							},
		checkboxValidation:true,//validation required on checkbox:true no:false
		radioValidation:true,//validation required on radio:true no:false
		selectValidation:true,//validation required on select:true no:false
		fileValitaion:false,//validation required on fileUpload:true no:false
		ajax:false
	};