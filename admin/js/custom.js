$(document).ready(function () {
	

	$(document).bind("ajaxSend", function(){
	   $("#ajax-loading").show();
	 }).bind("ajaxComplete", function(){

	   $("#ajax-loading").hide();
	   	
	 });

	 $('.js-product-show').mouseover(function(){
	 	var url = $(this).data().url;
	 	
	 })

	 var searchData = {};
	// script for search
	$('.js-search-form').submit(function (e) {
		e.preventDefault();
		searchData = {};
		var condition = false;
		$(this).find('input,select').each(function(){
			if($(this).val().trim().length>0)
				condition = true;
		})
		
		if(condition){
			var data = $(this).serializeArray();
			for(var i in data){
				if(data[i].value.trim().length>0){
					searchData[data[i].name] = data[i].value;
				}
				
			}

			var url = $(this).data().url;			
			var pageLimit = parseInt($('.js-item-per-page').val());
			var sendData = {limit:pageLimit,search:searchData};
			$.ajax({
				type : 'post',
				url : url,
				data : sendData,
				beforeSend: function(){
					$('.loading-div').show();
				},
				success : function (response){
					var totalItems = parseInt(response.totalItems);
					$('.js-pagination').data().items = totalItems;
					$('.js-pagination').attr('data-items',totalItems);
					$('.js-pagination-input').val(1);
					var totalPage = Math.ceil(totalItems/pageLimit);
					var offsetU = pageLimit> totalItems ? totalItems : pageLimit;
					if(totalPage==1){
						$('.js-prev-next').addClass('disabled');
					}else{
						$('.js-prev-next.prev').addClass('disabled');
					}	
					$('.js-total-item').html(totalItems);					
					$('.loading-div').hide();
					$('.js-item-desc').html('1-'+ offsetU);
					$('.js-data-table-content').html(response.data);
				}
			})
		}

		return false;
	});
	
    $(document).on('click', '.js-btn-select-img', function (e) {
        e.preventDefault();
        $(this).parent().find('input[type="file"]').click();
    })

    //select image and display it
    $(document).on('change', '.js-select-img', function () {
        var thisParent = $(this).parent();
        var file = this.files[0];

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            alert('Invalid Image');
            return false;
        }

        thisParent.removeClass('no-border');
        thisParent.find('.js-btn-select-img').removeClass('show').addClass('hide');
        thisParent.find('.js-btn-delete-selected-img').removeClass('hide').addClass('show');

        var reader = new FileReader();
        reader.onload = function (e) {
            thisParent.find('img').removeClass('hide').attr('src', e.target.result);

        }
        reader.readAsDataURL(file);
    })



    //delete selected image
    $(document).on('click', '.js-btn-delete-selected-img', function (e) {
        e.preventDefault();
        $(this).parent().addClass('no-border').find('img').attr('src', '');
        $(this).parent().find('input[type="file"]').val('');
        $(this).parent().find('.js-btn-select-img').removeClass('hide').addClass('show');
        $(this).removeClass('show').addClass('hide');
    })
	// script for  image upload delete change
	var count =1;
	$('.js-add-new-img').click(function (e){
		e.preventDefault();
		var html = $('.js-add-img-html').html();
		var newHtml = $('<div class="col-xs-4 hidden img-div">'+html+'</div>').insertBefore($(this).parent());
		
		var newFile = newHtml.find('input[type="file"]');
		newFile.attr('name','images[product_img_'+count+']');
		newFile.click();
		newFile.change(function (e){
			var file= this.files[0].name;
			file = file.split('.');
			var ext = file[file.length-1]
			if(ext=='jpg' || ext=='png' || ext=='gif' || ext=='jpeg'){
				var reader = new FileReader();
				reader.onload = function(e) { 
					newHtml.find('img').attr('src',e.target.result);
				};
				reader.readAsDataURL(this.files[0]);
				newHtml.removeClass('hidden');
			}
			else{
				alert('Invalid Image');
				newHtml.remove();
				return false;
			}
		})

		// if(newFile.val ==''){
		// 	newHtml.remove();
		// }
		// count++;
	});

	$(document).on('click','.js-delete-img',function (e) {
		e.preventDefault();
		$(this).closest('.img-div').remove();
	})

	$(document).on('click','.js-change-img',function (e){
		$(this).closest('.img-div').find('input[type="file"]').click();
	})

	$(document).on('click','.js-delete-ext-img',function (e) {
		e.preventDefault();
		var id = $(this).data().id;
		var url = $(this).data().url;
		var thisButton = $(this);
		$.ajax({
			type:'post',
			url : url,
			data:{id:id,type:'image'},
			
			success:function (response){
				
				if(response.status==true){
					
					thisButton.closest('.img-div').remove();
				}
			}
		})
	})
	$(document).on('click','.js-change-ext-img',function (e) {
		e.preventDefault(); 
		$(this).closest('.img-div').find('input[type="file"]').click();

		var id = $(this).data().id;
		var url = $(this).data().url;
		var thisButton = $(this);
		$(this).closest('.thumbnail').find('input[type="file"]').change(function (e){
			var file= this.files[0].name;

			file = file.split('.');
			var ext = file[file.length-1]
			if(ext=='jpg' || ext=='png' || ext=='gif' || ext=='jpeg'){
				var fd = new FormData();
				fd.append('id',id);
				fd.append('image',this.files[0]);
				fd.append('type','image');
				$.ajax({
					type:'post',
					url : url,
					data:fd,
					processData:false,
					contentType:false,
					success:function (response){
						thisButton.closest('.img-div').find('img').attr('src',response.url);
					}
				})
			}else{
				alert('Invalid Format');
				return false;
			}
			
		})
		
	});
	$('.js-add-ext-img').click(function (e) {
		e.preventDefault(); 
		var productId = $(this).data().productid;
		var url = $(this).data().url;
		var html = $('.js-add-img-html').html();
		var newHtml = $('<div class="col-xs-4 hidden img-div">'+html+'</div>').insertBefore($(this).parent());
		
		newHtml.find('input[type="file"]').click().change(function (e){
			$(this).attr('name','image[product_img_'+count+']');
			var file= this.files[0].name;
			file = file.split('.');
			var ext = file[file.length-1]
			if(ext=='jpg' || ext=='png' || ext=='gif' || ext=='jpeg'){
						
				var fd = new FormData();
				fd.append('foreign_id',productId);
				fd.append('image',this.files[0]);
				fd.append('type','image');
				$.ajax({
					type:'post',
					url : url,
					data:fd,
					processData:false,
					contentType:false,					
					success:function (response){
						newHtml.find('img').attr('src',response.img);
						newHtml.find('.js-set-featured').attr('data-id',response.id)
						newHtml.removeClass('hidden');
					}
				})
				
			}
			else{
				alert('Invalid Image');
				newHtml.remove();
				return false;
			}
		})
		
	});

	$(document).on('click','.js-set-featured',function (e) {
		e.preventDefault();
		var id = $(this).data().id;
		
		var thisButton = $(this);
		var url = $(this).data().url;
		$.ajax({
			type:'post',
			url:url,
			data:{id:id},
			
			success:function(response) {
				
				
				if(response.status==true){
					thisButton.closest('.js-product-img').find('.js-is-featured').removeClass('show').addClass('hidden');
					thisButton.closest('.js-product-img').find('.js-set-featured').removeClass('hidden').addClass('show');
					thisButton.closest('.thumbnail').find('.js-is-featured').removeClass('hidden').addClass('show');
					thisButton.closest('.thumbnail').find('.js-set-featured').removeClass('show').addClass('hidden');
				}
			}
		})
	})


	//script for delete item

	$(document).on('click','.js-delete-btn',function(e){
		e.preventDefault();
		var delUrl = $(this).data().url;
		

		var modal = $('#delete-modal-notification');
		modal.modal('show');
		var thisButton = $(this);
		modal.find('.ans-btn').click(function(e){
			e.preventDefault();
			modal.modal('hide');
			var ans = $(this).data().ans;
			if(ans==true){
				$.ajax({
					type : 'post',
					data : {},
					url : delUrl,					
					success : function (response){
						if(response.status){
							thisButton.closest('tr').remove();
							$.notify('Item Deleted',{postion:'right bottom',className:'success'})
							
						}else{
							$.notify('Sorry Some Error Occured Please Try Again');
						}
					}
				})
			}else{
				return false;
			}
		})
	})


	//script to add product to the campaign

	$(document).on('click','.js-add-to-campaign',function (e){
		e.preventDefault();
		if($(this).hasClass('not'))
			return false;
		$(this).addClass('not');
		var url = $(this).data().url;
		var cid = $(this).data().campaignid;
		var pid = $(this).data().productid;
		var thisButton = $(this);
		$.ajax({
			type : 'post',
			url : url,
			data : {productid:pid,campaignid:cid},
			success : function (response){
				if(response.status==true){
					thisButton.closest('tr').hide(500);
					setTimeout(function (){
						thisButton.closest('tr').remove();
					},100)
				}
			}
		})
	})

	//script to add product to the campaign
	$(document).on('click','.js-remove-campaign-product',function (e){
		e.preventDefault();
		if($(this).hasClass('not'))
			return false;
		$(this).addClass('not');
		var url = $(this).data().url;
		
		var thisButton = $(this);
		$.ajax({
			type : 'post',
			url : url,
			data : {},
			success : function (response){
				if(response.status==true){
					thisButton.closest('tr').hide(500);
					setTimeout(function (){
						thisButton.closest('tr').remove();
					},1000)
				}
			}
		})
	})

	//script for pagination


	//call pagination function to initialize pagination
	//pagination(1);

	$('.js-prev-next').click(function(e){
		e.preventDefault();
		if($(this).hasClass('disabled'))
			return false;

		var pageDiv = $('.js-pagination-input');
		var currentPage = parseInt(pageDiv.val());
		var factor = $(this).data().factor;
		var totalItems = parseInt($('.js-pagination').data().items);
		var pageLimit = parseInt($('.js-item-per-page').val());
		var totalPage = Math.ceil(totalItems/pageLimit);
		
		var nextPage = currentPage+factor;
		if(nextPage==totalPage)
			$('.js-prev-next.next').addClass('disabled');
		else
			$('.js-prev-next.next').removeClass('disabled');

		if(nextPage>1)
			$('.js-prev-next.prev').removeClass('disabled');
		else
			$('.js-prev-next.prev').addClass('disabled');

		pagination(nextPage);
	})


	function pagination (page) {
		var page = parseInt(page);
		$('.js-pagination-input').val(page);
		var url = $('.js-pagination').data().url;
		var totalItems = parseInt($('.js-pagination').data().items);
		var pageLimit = parseInt($('.js-item-per-page').val());
		var offsetL = ((page-1)*pageLimit)+1;
		var offsetU = page*pageLimit;
		offsetU = offsetU>totalItems ? totalItems : offsetU;
		var data = {page:page,limit:pageLimit,search:searchData};
		$.ajax({
			type : 'post',
			url : url,
			data : data,
			beforeSend: function(){
				$('.loading-div').show();
			},
			success : function (response){
				$('.loading-div').hide();
				$('.js-item-desc').html(offsetL+'-'+ offsetU);
				$('.js-data-table-content').html(response.data);
			}
		})
	}

	$('.js-pagination-input').change(function(){
		var page = parseInt($(this).val());
		var totalItems = parseInt($('.js-pagination').data().items);
		var pageLimit = parseInt($('.js-item-per-page').val());
		var totalPage = Math.ceil(totalItems/pageLimit);
		if(page>totalPage){
			$(this).val(totalPage);
			return false;
		}

		if(page<1){
			$(this).val(1);
			return false;
		}

		pagination (page)

	});

	$('.js-item-per-page').change(function (){
		var limit = parseInt($(this).val());
		var totalItems = parseInt($('.js-pagination').data().items);
		var totalPage = Math.ceil(totalItems/limit);
		
		if(totalPage==1)
			$('.js-prev-next.next').addClass('disabled');
		else
			$('.js-prev-next.next').removeClass('disabled');
		pagination(1);
	})
	

	$('.js-update-stock').blur(function(e){
		var url = $(this).data().url;
		var stock = $(this).val();
		$.ajax({
			type : 'post',
			url : url,
			data : {stock:stock},
			success : function(response){
				console.log(response);
			}
		})
	})
	


	//script to load child catgories

	$('.js-sub-child-cat').click(function(){
		if($(this).hasClass('loaded'))
			return;
		var thisButton = $(this);
		var id = this.hash;
	
		var url = $(this).data().url;
		$.ajax({
			type : 'post',
			url : url,
			data : {},
			success : function (response){
				thisButton.addClass('loaded');
				$(id).find('.well').html(response.html);
			}
		})
	})

	$(document).on('click','.js-print-order',function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			type : 'post',
			url : url,
			success : function(response){
				$('#print-modal').modal('show');
				$('#print-modal').find('.modal-body').html(response.data);
			}
		})
	});

	$('.js-print-it').click(function(e){
			e.preventDefault();
		$('.print').print();
	});

	$('.js-genqr-code').click(function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			type : 'post',
			url : url,
			success : function(response){
				$('#print-modal').modal('show');
				$('#print-modal').find('.modal-body').html(response.data);
			}
		})

	});


    $(document).on('click','.js-add-purchase',function(e){
        e.preventDefault();
        var url = $(this).data('url');
        var type = $(this).data('type');
        var returnUrl = $(this).data().return;

        var title = 'Vendor Purchase Form';
        if(type==2)
            title = 'Vendor Return Form'
        else if(type==3)
            title = 'Damage Purchase Form';
        $.ajax({
            type : 'get',
            url:url,
            data:{}
        }).success(function(response){
            if(response.view){
                $('#purchase-modal').modal('show');
                $('#purchase-modal').find('.title').html(title);
                $('#purchase-modal').find('.modal-body').html(response.view);
                if(returnUrl)
                	$('#purchase-modal').find('.modal-body').find('form').append('<input type="hidden" name="url" value="'+returnUrl+'">')
                $('.datepicker').datepicker({maxDate:0});
            }
        });
    })
    $(document).on('keyup','.js-quantity,.js-rate',function(){
        var quantity = $('.js-quantity').val();
        var rate = $('.js-rate').val();
        var totalAmount = quantity*rate;
        $('.js-total').val(totalAmount);
        $('.js-paid').val(0);
        $('.js-credit').val(totalAmount);
    });

    $(document).on('keyup','.js-paid',function(){
        var totalAmount = $('.js-total').val();
        var paid = $('.js-paid').val();
        $('.js-credit').val(totalAmount-paid);
    })
	
})


//script for print html 

$.fn.print = function () {

    if (this.size() > 1) {
        this.eq(0).print();
        return;
    } else if (!this.size()) {
        return;
    }

    var strFrameName = ("printer-" + (new Date()).getTime());
    var jFrame = $("<iframe name='" + strFrameName + "'>");

    jFrame
        .css("width", "1px")
        .css("height", "1px")
        .css("position", "absolute")
        .css("left", "-9999px")
        .appendTo($("body:first"));

    var objFrame = window.frames[strFrameName];
    var objDoc = objFrame.document;


    var jStyleDiv = $("<div>").append(
        $("style").clone()
        );


    objDoc.open();
    objDoc.write("<!DOCTYPE html>");
    objDoc.write("<html  moznomarginboxes mozdisallowselectionprint>");
    objDoc.write("<body>");
    objDoc.write("<head>");
    objDoc.write("<title>");
    objDoc.write(document.title);
    objDoc.write("</title>");
    objDoc.write(jStyleDiv.html());
    objDoc.write("</head>");
    objDoc.write(this.html());
    objDoc.write("</body>");
    objDoc.write("</html>");
    objDoc.close();

    // Print the document.
    objFrame.focus();
    objFrame.print();

    setTimeout(
        function () {
            jFrame.remove();
        },
        (60 * 1000)
        );
}

function tableToExcel(id) {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

    var table = document.getElementById(id)
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))

}