/* 
 * 공통 스크립트
 * 작성자: 유현상
 * 2018-11-01 : v0.1
 * 수정이력 :  
 */
$(function() {
	$(document).ready(function(){
		_setLogo();
		_setEtc();
		_setShopCd();
		//_setCalendarToggle();`
		//_setArrowToggle();
	});
	$(window).load(function(){
		$(".load-back,.loading2").hide();
	});

	$.fn._serializeJsonObject = function(tranceFlag) {
	    var obj = {};
	    try{
	        $(this).find("input,select,textarea").each(function(){
	        	if($(this).attr("type") == "radio"){
	        		obj[this.name] = $("input[name="+this.name+"]:checked").val();
	        	}else if($(this).attr("type") == "checkbox"){
	        		if($("input[name="+this.name+"]").length == 1){
	        			obj[this.name] = $("input[name="+this.name+"]").is(":checked") ? "Y" : "N";
	        		}else{
	        			var t = "";
	        			$("input[name="+this.name+"]:checked").each(function(i){
	        				t += $(this).val() + ($("input[name="+this.name+"]:checked").length == i + 1 ? "" :  "','");
	        			});
	        			obj[this.name] = t;
	        		}
	        	}else{
	        		if(tranceFlag && $(this).parent().is(".unit-cont")){
	        			obj[this.name] = parseInt(($(this).val().replace(/[^0-9-]/gi, ""))||0);
	        		}else{
	        			obj[this.name] = $(this).val();
	        		}
	        	}
	        });
	    }catch(e){
	        console.log(e.message);
	    }finally{
	    	
	    }
    	return obj;
	}
	
	$.fn._syncData = function(d) {
		if(d.param){
			d.param = null;
		}
		$this = $(this);
		$(this).find("input,select,textarea").each(function(){
			$input = $(this);
			$.each(d,function(key,value){
				if($input.attr("name") == key){
					if($input.attr("type") == "radio"){
						if($input.attr("value") == value){
							$input.prop("checked",true);
						}
					}else if($input.attr("type") == "checkbox" && value == "Y"){
						$input.prop("checked",true);
					}else{
						$input.val(value);
					}
				}
			});
		});
		if(d.syncDataText){
			$.each(d,function(key,value){
				if(value == "null" || value == null){
					value = "";
				}
				$this.find("." + key).text(value);
			});
		}
	}
	

	$.fn._validation = function(){
		var flag = true;
		$(this).find("input,select,textarea").each(function(){
			$input = $(this);
			if(($(this).val() == "" || $(this).val() == null) 
					&& $(this).closest("li").find("label span span").hasClass("ess-mark")  
					&& $(this).closest("li").find("li").length == 0)
			{
				var t = $(this).closest("li").find("label span").text().split("*").join("");
				_alert("[" + t +"]을(를) 입력해 주세요.",{confirmBtnCb : function(){$input.focus();}});
				flag = false;
				return false;
			}
		});
		return flag;
	}
	
	$.fn._emailCheck = function(){
		$input = $(this);
		if($(this).val() == ""){
			return true;
		}
		var pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; 
		if(!pattern.test($(this).val())) { 
			_alert("이메일주소가 올바르지 않습니다.",{confirmBtnCb : function(){$input.focus();}});
			return false;
		} 
		return true;
	}
	
	$.fn._phoneNumberCheck = function(){
		$input = $(this);
		if($(this).val() == ""){
			return true;
		}
		var pattern = /\d{2,4}-\d{3,4}-\d{3,4}/;
		var flag = true;
		$($(this).val().split("-")).each(function(){
			if(this.length > 4){
				flag = false;
			}
		});
		if(!pattern.test($(this).val()) || !flag){
			_alert("전화번호가 올바르지 않습니다.",{confirmBtnCb : function(){$input.focus();}});
			return false;
		}
		return true;
	}
	
	
	$.fn._serializeJsonArray = function() {
	    var obj = {};
	    var objArray = new Array(); 
	    try{
	    	var startKey = null;
	        $(this).find("input,select,textarea").each(function(){	        	
	        	if(this.name == startKey){
	        		objArray.push(obj);
	        		obj = {};
	        	}
	        	if(startKey == null){
	        		startKey = this.name;
	        	}
	        	obj[this.name] = $(this).val();
	        });
	        objArray.push(obj);
	    }catch(e){
	        console.log(e.message);
	    }finally{
	    	
	    }
    	return JSON.stringify(objArray);	    
	}
	
	$.fn._clear = function() {
	    try{
	        $(this).find("input,select,textarea").each(function(){
	        	if($(this).attr("type") == "radio"){
	        		if($(this).hasClass("notChecked")){
	        			$("input[name="+this.name+"]").prop("checked",false);
	        		}else{
	        			$("input[name="+this.name+"]:eq(0)").prop("checked",true);
	        		}
	        	}else if($(this).attr("type") == "checkbox"){
	        		$("input[name="+this.name+"]").prop("checked",false);
	        	}else if($(this).is("select")){
	        		$(this).val($(this).children().first().val());
	        	}else{
	        		$(this).val("");
	        	}
	        });
	        if($(this).find("tbody").data("oriHtml") != null){
				$(this).find("tbody").html($(this).find("tbody").data("oriHtml"));	
			}
			if($(this).find(".data-table").data("oriHtml") != null){
				$(this).find(".data-table").html($(this).find(".data-table").data("oriHtml"));	
			}
			$(this).find(".list-count strong").text("0");
			$(this).find(".pagination").empty();
	    }catch(e){
	        console.log(e.message);
	    }finally{
	    	popupHeight();
	    }
	}
	
	$.fn._getRadioCheckedRowData = function(){
		var data = null;
		$(this).each(function(){
			if($(this).is(":checked")){	
				if($(this).parent().parent().is("td")){
					data = $(this).closest("tr").data();
					return false;
				}else{
					data = $(this).closest("li").data();
					return false;
				}
			}
		});
		return data;
	}
	
	$.fn._loopData = function(d,o){
		var o = $.extend({},{mobileDiv:null,mobileDivFlag:false},o);
		var $noData;
		var noDataTxt = "조회된 데이터가 없습니다.";
		var getDisplayHeaderCnt = function($t){
			var headerCnt;
			var resize = function($t){
				headerCnt = 0;
				$t.prev("thead").find("th").each(function(){
					if($(this).css("display") != "none"){
						headerCnt++;
					}
				});
				$t.find(".no-data td").attr("colspan",headerCnt);
			}
			resize($t);
			$(window).resize(function() {
				resize($t);
			});
			return headerCnt;
		}
		
		if($(this).is("ul")){
			$noData = $("<li class='no-data'></li>").text(noDataTxt);
		}else if($(this).is("tbody")){
			$noData = $("<tr class='no-data'><td></td></tr>");
			$noData.find("td").attr("colspan",getDisplayHeaderCnt($(this))).text(noDataTxt);
		}
		$(this).data("$noData",$noData);
		

		var $this = $(this);
		if($this.data("oriHtml") == undefined){
			$this.data("oriHtml",$this.html());
			var oeh = $this.html();
			if(oeh.match(/#/g)||[].length % 2 == 0){
				while(oeh.indexOf("#") >= 0){
					var removeMap = oeh.substr(oeh.indexOf("#"),(oeh.indexOf("#",oeh.indexOf("#")+1) -oeh.indexOf("#")+1));
					oeh = oeh.split(removeMap).join("");
				}
				$this.data("oriEmptyHtml",oeh);
			}
		}
		$this.empty();
		$this.data("oriData",d);
		$(d).each(function(i){
			d[i].index = i;
			var h = $this.data("oriHtml");
			$.each(o,function(key){
				d[i][key]=d[i][key] || "";
			});
			$.each(this,function(key,value){
				value = (value== null ? "" : value) ; 
				if(o[key] != null && typeof(o[key]) == "function"){
					h = h.split("#"+key+"#").join(o[key](value,d[i]));
				}else{
					h = h.split("#"+key+"#").join(value);
				}
			});			
			$this.append(h).children(":last").data(this).data("changeYn","N").change(function(){
				$(this).data("changeYn","Y");
				$(this).find("input[name='changeYn']").remove();
				$(this).append("<input  type='hidden' name='changeYn' value ='Y'>");
			});
			
		});
		$this.children().show();
		if(d == null || d.length < 1){
			$(this).append($(this).data("$noData"));
		}
		try{
			if(!o.mobileDivFlag && d.param != null && d.param.pagingDiv != null && d.totalCnt != null){
				var dp = d.param;
				$(dp.pagingDiv).html(_paging(d.totalCnt,dp.dataSize||10,dp.pageSize||5,dp.pageNo||1));
				$(dp.pagingDiv).find("a,button").click(function(){
					dp.pageNo = $(this).attr("page");
					o.mobileDivFlag = false;
					_ajax(d.url,dp);
				});
			}
			if(o.mobileDiv != null && !o.mobileDivFlag){
				o.mobileDivFlag = true;
				$(o.mobileDiv)._loopData(d,o);
			}
		}catch(e){
	        console.log(e.message);
	    }finally{
	    	popupHeight();
			tableHeight();
	    }
	}
	
	$.fn._appendEmptyForm = function(){
		$(this).append($(this).data("oriEmptyHtml"));
		$(this).children(":last").show();
		if($(this).is("tbody")){
			$(this).closest("table").find(".no-data").remove();
		}
	}								
	
	$.fn._empty = function(){
		var oeh = $(this).html();
		$(this).data("oriHtml",oeh);
		if(oeh.match(/#/g)||[].length % 2 == 0){
			while(oeh.indexOf("#") >= 0){
				var removeMap = oeh.substr(oeh.indexOf("#"),(oeh.indexOf("#",oeh.indexOf("#")+1) -oeh.indexOf("#")+1));
				oeh = oeh.split(removeMap).join("");
			}
			$(this).html(oeh);
		}
	}
	
	$.fn._excelDown = function(SaveFileName){
		if($(this).find("tbody tr").length == 0 
				|| $(this).find("tbody tr td :eq(0)").attr("colspan") > 0
				|| ($(this).find("tbody tr").length == 1 && $(this).find("tbody tr").css("display") == "none")){
			_alert("조회된 데이터가 존재하지 않습니다.");
			return;
		}
	    if (!SaveFileName) {
	        SaveFileName = $("title").text();
	    }
		var agent = navigator.userAgent.toLowerCase();
		if (agent.indexOf(".net") == -1) {
			var a = document.createElement('a');
	        var data_type = 'data:application/vnd.ms-excel';
	        var style = $("style").clone().wrapAll("<style/>").parent().html();
	        var table_div = $(this).clone().wrapAll("<table/>").parent().html();
	        var table_html = encodeURIComponent(style+table_div);
	        a.href = data_type + ', ' + table_html;
	        a.download = SaveFileName + '.xls';
	        a.click();
		}else{
		    if (document.all.excelExportFrame == null){
		        var ef = document.createElement("iframe");
		        ef.id = "excelExportFrame";
		        ef.name = "excelExportFrame";
		        ef.position = "absolute";
		        ef.style.zIndex = -1;
		        ef.style.visibility = "hidden";
		        ef.style.top = "-10px";
		        ef.style.left = "-10px";
		        ef.style.height = "0px";
		        ef.style.width = "0px";
		        document.body.appendChild(ef); 
		    }
		    var ft = document.all.excelExportFrame.contentWindow.document; 
		    ft.open("text/html", "replace");
		    ft.write('<html>');
		    ft.write('<meta http-equiv="Content-Type" content="application/vnd.ms-excel; charset=euc-kr"/>\r\n');
		    ft.write($("style").clone().wrapAll("<style/>").parent().html());
		    ft.write('<body onload="saveFile();">');
		    ft.write($(this).clone().wrapAll("<table/>").parent().html()); 
		    ft.write('<script language="javascript">');
		    ft.write('function saveFile(){document.execCommand("SaveAs", true, "'+ ( SaveFileName  + ".xls" )+ '");}');
		    ft.write('<\/script>');
		    ft.write('</body>');
		    ft.write('</html>');
		    ft.charset="UTF-8";
		    ft.close();
		}
	}
	
	$.fn._fileUpload = function(o){
		var init = {
			uploadPath : ""
			,fileName	: null
			,fileEx 		: null
			,fileSize		: 5			
			,alert			: true
		}
		var f = $.extend({},init,o||{});
		var r;
		var d = new FormData();
		var fileX = $(this).length;
		for (var i = 0; i < fileX; i++) {
			var fileY = $(this).get(i).files.length;
			if(fileY == 0){
				_alert("선택된 파일이 없습니다.");
				return;
			}
			for (var j = 0; j < fileY; j++) {
				var _file =  $(this)[i].files[j];
				if(f.fileEx != null && f.fileEx.toLowerCase().indexOf(_file.name.substring(_file.name.lastIndexOf(".")+1).toLowerCase()) < 0 ){
					_alert("[" + f.fileEx + "] 확장자만 업로드 가능합니다.");
					return;
				}
				if((parseInt(f.fileSize) * 1024 * 1024) < _file.size){
					_alert("첨부파일 용량은 " + f.fileSize + "MB내로만 등록 가능합니다.");
					return;
				}
				d.append("file", _file);
				d.append("uploadPath",f.uploadPath);
			}
		}
		$.ajax({
			data:d,
			url:"/SSFA/fileUpload.do",
			type:"POST",
			processData : false,
			contentType : false,
			success:function(data){
				if(data.rc){
					if(f.alert){
						_alert("업로드에 성공하였습니다.");
					}
					if(o.callback != null){
						o.callback(data);
					}					
				}else{
					_alert("Error = " + data.rm);
					return;
				}
			}
		});
		return r;
	}
	
	$.fn._showLayer = function(o){
		var init = {
				clear 			: true
				,callback	: null
				,data			: null
		}
		var lo = $.extend({},init,o||{});
		var $this = $(this);
		if(lo.clear){
			$(this).find("button:contains('초기화')").click(function(){
				$this._clear();
			}).click();
		}
		if($(".dimmed-layer").length == 0){
			$("body").append('<div class="dimmed-layer"></div>');
		}
		var $dimmed = $('.dimmed-layer:first');
        if($dimmed.data("layerArray") == null){
        	$dimmed.data("layerArray",new Array());
        }
        var layerArray = $dimmed.data("layerArray");
        var setLayerIndex = function(){
        	var displayLayerCnt = 0;
        	$(layerArray).each(function(){
        		if($(this).data("depth") == $("._fullLayer:last").attr("id")){
        			$(this).add($dimmed).css('display', 'block').css('z-index', '100');
        			displayLayerCnt++;
        		}
            });
            $(layerArray[layerArray.length-1]).css('z-index', '');
            if(layerArray.length == 0 || displayLayerCnt ==0 ){
            	$(".dimmed-layer").hide();
            }
        }
		if(!$(this).hasClass("layer-popup")){
			$(layerArray).each(function(){
        		$(this).removeAttr('style');
        		$dimmed.hide();
            });
			$(this).find(".menu-list").remove();
			$(this).find(".gnb-btn").remove();
			$(this).find(".gnb-menu").append($(".menu-list:first").clone());
			$(this).find(".gnb-menu").append($(".gnb-btn:first").clone(true));
			$(this).addClass("_fullLayer").css({width: "100%",height: "100%"});
			$("._fullLayer").hide();
			_setLogo();
			$(this).show();
			$(this).find(".btn-back").off("click").click(function(){
				$("._fullLayer:last").empty().removeClass("_fullLayer").css({width: "",height: ""});
				$("._fullLayer:last").show();
				$("._fullLayer:last").find(".layerReload").click();
				setLayerIndex();
			});
		}else{
	        layerArray.push($(this).data("depth",$("._fullLayer:last").attr("id")));
	        $(this).find('.btn-close').off("click").click(function(){
	        	try{
		        	layerArray.pop().removeAttr('style');
		        	setLayerIndex();
	        	}catch (e) {	        		
	        	}
	        });
	        setLayerIndex();
		}
		_setDefaultEvent($(this));
		if(typeof(lo.callback)  == "function"){
			lo.callback(lo.data);
		}
	}
	
	$.fn._hideLayer = function(){
		$(this).find(".btn-back").click();
		$(this).find(".btn-close").click();
	}
	
});

var _setDefaultEvent = function($layer){
	headerAction();
	calendarSetting();
	if ($('.calendar-box .input-txt').length > 0){
		calendarLayer();
	}
	if($layer != null){
		$layer.find(".calendar-box .today").val(_getTodayDate());
	}else{
		$(".calendar-box .today").val(_getTodayDate());
	}	
	$('.calendar-box .input-txt').attr("maxlength",10);
	$('.calendar-box .input-txt').off("keydown").keydown(function(e){
	    var num_arr = [ 
	       97, 98, 99, 100, 101, 102, 103, 104, 105, 96,
	       48, 49, 50, 51, 52, 53, 54, 55, 56, 57
	   ];
	   var key_code = ( e.which ) ? e.which : e.keyCode;
	   if( num_arr.indexOf( Number( key_code ) ) != -1 ){
	       var len = this.value.length;
		   if( len == 4 ){ 
			   this.value += "-";
		   }
		   if( len == 7 ){
			   this.value += "-";
		   }
	   }
	});
	$(".input-search-btn").off("click").click(function(){
		if($(this).closest("li").find("label span, strong span").text().indexOf("고객명") >= 0){
			$(".searchCustomer")._showLayer({clear:false});
			$("#form_searchCustomer ,.result-cont")._clear();
			$(".searchCustomer").find("input[name=shopCd]").val($("._defaultShopCd:last").val()||_session.shopCd);
			if($("select[name=userCd]").length == 0){
				$(".searchCustomer").find("input[name=userCd]").val(_session.userCd);
			}else{
				$(".searchCustomer").find("input[name=userCd]").val($("select[name=userCd]").val());
			}		
		}
	});
	
	$(".searchPostBtn").click(function(){
		if($(".searchPostAdress").css("display") == "none"){
			$(".searchPostAdress")._showLayer();
		}
	});
	
	var nf = function(t){
		var val = String(t.replace(/[^0-9]/g, ""));
        if(val.length < 1)
            return "";
        return _number_format(val);
	}
	
	$(".unit-cont input").off("change").off("keyup").off("blur").on({
		"change" : function(){this.value = nf(this.value)}
		,"keyup" : function(){this.value = nf(this.value)}
		,"blur" : function(){this.value = nf(this.value)}
	});
	
	$(".table-scroll").addClass("tableFixHead");
	var $th = $('.tableFixHead').find('thead th');
	$('.tableFixHead').off("scroll").scroll(function() {
	  $(this).find('tbody th').css({"transform" : "translateX("+ (this.scrollLeft) +"px)", "z-index" : "0" , "position" : "relative"});
	  $(this).find('thead th').css({"transform" : "translateY("+ (this.scrollTop) +"px)", "z-index" : "1" , "position" : "relative"});
	});
}

var _setEtc = function(){
	$(".header-btn").click(function(){
		$(".searchCustomer")._showLayer({clear:false});
		$("#form_searchCustomer ,#searchCustomerResult")._clear();
		$(".searchCustomer").find("input[name=shopCd]").val(_session.shopCd);
		$(".searchCustomer").find("input[name=userCd]").val(_session.userCd);
		$("#_apply").hide();
		$("#_selectCustomer").show();
		$("#_create").show();
		$(".searchCustomer").find(".btn-close").click(function(){
			$("#_apply").show();
			$("#_selectCustomer").hide();
			$("#_create").hide();
		});
	});
	$("#wrap").addClass("_fullLayer");
	$("body").append('<div id="wrap2"></div>').append('<div id="wrap3"></div>');
}

var _getCode = {
		init : {
			data 		: {}
			,class 	: "select-box"
			,id			: ""
			,name	: ""
			,value	: null
			,addEmpty : false
			,addEmptyTxt : ""
			,returnType	: "html"
			,option	: false	
		},
		getData : function(o){
			try{
				var o = $.extend({},{async : false},o);
				return _ajax("/SSFA/getCode.do",o).rd;
			}catch (e) {
				this.error(e);
			}
		},
		getUserList : function(o){
			try{
				var o = $.extend({},{shopCd : "",workYn : "Y",async : false},o);
				if(o.shopCd == ""){
					throw new Error("shopCd is null");
				}
				return _ajax("/SSFA/getUserList.do",o).rd;
			}catch (e) {
				this.error(e);
			}
		},
		getSelectBox : function(o){
			try{
				var d = $.extend({},this.init,o);
				var sel = "<select class='"+d.class+"' id='"+d.id+"' name='"+d.name+"'>";
				var st = "selected='selected'";
				if(d.addEmpty){
					sel += "<option value = '' data-option='' "+(d.value== null ? st : "")+">"+d.addEmptyTxt+"</option>";
				}	
				$(d.data).each(function(){
					sel += "<option value = '"+this.CODENO+"' "+ (d.value == this.CODENO ? st : "") + " data-option='" + JSON.stringify(this) + "'+>"+ this.CODENAME + "</option>";				
				})	;
				sel += "</select>";
				if(d.returnType == "html"){
					if(d.option){
						return $(sel).html();
					}
					return $(sel).clone().wrapAll("<select/>").parent().html(); 
				}else if(d.returnType == "obj"){
					$sel = $(sel);
					$sel.find("option").each(function(){
						if($(this).data("option") != null){
							$(this).data("option",JSON.parse(JSON.stringify($(this).data("option"))));	
						}
					});
					if(d.option){
						return $sel.find("option");
					}
					return $sel;
				}
			}catch (e) {
				this.error(e);
			}
		},
		error : function(e){
			console.log(e.message);
			return "";
		}
}

$.ajaxSetup({
	beforeSend : function(xmlHttpRequest){
		$(".load-back, .loading2").show();
        xmlHttpRequest.setRequestHeader("ajax", "true");
	},
	error : function(xhr, textStatus, error){
		if(xhr.status == 401){
			_alert("세션이 만료되어 로그아웃 되었습니다.",{confirmBtnCb:function(){location.href = "/SSFA/login/login.do";}});
		}
	},
	complete : function(){
		$(".load-back, .loading2").hide();
	},
	contentType:"application/x-www-form-urlencoded; charset=UTF-8"
});

var _ajaxForLoading = function(d){
	$.ajax({
		url:"",
		type:"POST",
		beforeSend :function(){$(".load-back, .loading2").show();},
		complete : function(){d.callback();},
		error : function(){d.callback();},
		success:function(data){}
	});
}

var _ajax = function(u,d){
	var r;
	var callback = null;
	try{
		d= _setDefaultParam(d);
		if(d.callback){
			callback = d.callback;
			d.callback = null;
		}
	}catch (e) {
		console.log(e);
	}
	$.ajax({
		data:d,
		async : d.async,
		url:u,
		type:"POST",
		success:function(data){
			r = data;
			try{
				r["param"] = d;
				r.param["callback"] = callback;
				r["url"] = u;
				r["totalCnt"] = r.totalCnt;
				r.rd["param"] = d;
				r.rd.param["callback"] = callback;
				r.rd["url"] = u;
				r.rd["totalCnt"] = r.totalCnt;
			}catch(e){
		    }finally{
		    	$(".load-back, .loading2").hide();
		    	if(callback != null && typeof(callback)  == "function"){
		    		callback(r);
		    	}
		    }
		}
	});
	if(!d.async){
		return r;	
	}
}

// 파일 전송용 ajax
// 2019-03-15, hckim
var _ajaxForm = function(u,d,fdata){
	var r;
	var callback = null;
	try{
		d= _setDefaultParam(d);
		if(d.callback){
			callback = d.callback;
			d.callback = null;
		}
	}catch (e) {
		console.log(e);
	}
	
	var init = {
		fileYn 			: false		// 파일첨부 여부
		,fileKey 		: "files"	// 파일 key 값
		,uploadPath 	: ""		// 업로드 디폴트 경로
		,inputName		: null		// 파일 태그의 name
		,pObj 			: null		// 파일태그들의 부모 selector
		,fileCnt		: 10		// 허용할 첨부파일 수
		,fileEx 		: null		// 허용할 첨부파일 확장자
		,fileSize		: 5			// 허용할 파일의 크기(MB)
		,alert			: true		// alert 여부
		,saveFNameUseYn : "N"		// 파일을 저장할 때 savefile명을 사용할지 여부. Y/N
		,fileArr		: null		// 파일이 담긴 배열
	}
	
	var f = $.extend({},init,fdata||{});
	
	var fd = new FormData();
	
	for( var key in d ) {
		fd.append(key, d[key]);
	}
	
	if( f.fileYn ) {
		var fileX = $(f.pObj).find("input:file[name=" + f.inputName + "]");
		
		if( !f.fileArr ) {
			_alert("첨부된 파일이 없습니다.");
			return;
		}
		
		// 기존 파일
		var oFileCnt = $(f.pObj).find(".down-file-cont").length;
		// 새로 첨부된 파일
		var nFileCnt = f.fileArr.length;
		
		if( oFileCnt + nFileCnt > f.fileCnt ) {
			_alert("파일은 최대 " + f.fileCnt + "개 업로드 가능합니다.<br/>첨부된 파일 수: " + (oFileCnt + nFileCnt) + "개");
			return;
		}
		
		for( var i=0; i<f.fileArr.length; i++ ) {
			var _file = f.fileArr[i];
//			nFileCnt++;
			
			if(f.fileEx != null 
					&& f.fileEx.toLowerCase().indexOf(_file.name.substring(_file.name.lastIndexOf(".")+1).toLowerCase()) < 0) {
				_alert("[" + f.fileEx + "] 확장자만 업로드 가능합니다.");
				return;
			}
	
			if( (parseInt(f.fileSize) * 1024 * 1024) < _file.size ) {
				_alert("첨부파일 용량은 " + f.fileSize + "MB내로만 등록 가능합니다.");
				return;
			}
	
			fd.append(f.fileKey, _file);
		}
		
		
		for(var key in f) {
			switch(key) {
				case "fileKey" :
				case "uploadPath" :
				case "saveFNameUseYn" :
					fd.append(key, f[key]);
					break;
				default:
					break;
			}
		}
	}
	
	$.ajax({
		data:fd,
		async : d.async,
		url:u,
		type:"POST",
		processData: false,
		contentType: false,
		success:function(data){
			r = data;
			try{
				r["param"] = d;
				r.param["callback"] = callback;
				r["url"] = u;
				r["totalCnt"] = r.totalCnt;
				r.rd["param"] = d;
				r.rd.param["callback"] = callback;
				r.rd["url"] = u;
				r.rd["totalCnt"] = r.totalCnt;
			}catch(e){
		    }finally{
		    	$(".load-back, .loading2").hide();
		    	if(callback != null && typeof(callback)  == "function"){
		    		callback(r);
		    	}
		    }
		}
	});
	if(!d.async){
		return r;	
	}
}

var _setDefaultParam = function(d){
	if(d.pagingDiv != null){
		d.dataSize = d.dataSize == null ? 10 : parseInt(d.dataSize);
		d.pagingSt = (d.pageNo == undefined || d.pageNo == 1 ? 1 : ((d.pageNo - 1) * d.dataSize) + 1);
		d.pagingEd = (d.pageNo == undefined || d.pageNo == 1 ? d.dataSize : ((d.pageNo - 1) * d.dataSize) + d.dataSize);
		d.pageNo = (d.pageNo == undefined ? 1 : d.pageNo);
	}
	if(d.startDt != null){d.startDt = d.startDt.split("-").join("")};
	if(d.endDt != null){d.endDt = d.endDt.split("-").join("")};
	_session.shopCd = $("._defaultShopCd:last").val()||_session.shopCd;
	_session.userCd = $("._defaultUserCd:last").val()||_session.userCd;
	d = $.extend({},_session,d);
	d.userAuth = null;
	d.useShopList = null;
	return d; 
}

var _alert = function(m,o){
	var init = {
		titleTxt 				: null
		,confirmBtnTxt	: "확인"
		,confirmBtn			: true
		,confirmBtnCb		: null
		,closeBtnTxt		: "취소"
		,closeBtn			: false
		,closeBtnCb		: null
		,data					: null	
	}
	var a = $.extend({},init,o||{});
	$("#confirmBtnTxt").html(a.confirmBtnTxt);
	$("#closeBtnTxt").html(a.closeBtnTxt);
	if(a.titleTxt){
		$(".alert .pop-tit").html(a.titleTxt).show();
	}else{
		$(".alert .pop-tit").html("").hide();
	}
	$(".alert .pop-cont span").html(m);
	if(a.closeBtn || a.closeBtnCb){
		$("#alertClose").show();
		$("#alertClose").off("click").click(function(){
			if(typeof(a.closeBtnCb)  == "function"){
				$(".alert")._hideLayer();
				a.closeBtnCb(a.data);
			}else{
				$(".alert")._hideLayer();
			}
		});
	}else{
		$("#alertClose").hide();
	}
	if(a.confirmBtn || a.confirmBtnCb){
		$("#alertConfirm").show();
		$("#alertConfirm").off("click").click(function(){
			if(typeof(a.confirmBtnCb)  == "function"){
				$(".alert")._hideLayer();
				a.confirmBtnCb(a.data);
			}else{
				$(".alert")._hideLayer();
			}
		});
	}else{
		$("#alertConfirm").hide();
	}
	$(".alert")._showLayer();
}

var _pad = function(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

var _getTodayDate = function(){
	return _getDateFormat(new Date());
}

var _getDateFormat = function(date){
	if(typeof(date) == "string" && date.length == 8){
		return date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substring(6,8);
	}else if(typeof(date) == "object"){
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var zeroNN = function (number){
			var num = String(number);
			if(num.length==1){num = "0"+num;}
			return num;
		}
		month = zeroNN(month+1);
		day = zeroNN(day);                                                       
		return year+"-"+month+"-"+day;
	}else{
		return "";
	}
}

var _getMonthFormat = function(date){
	var date = _getDateFormat(date).split("-");
	return date[0]+"-"+date[1];
}

var _paging = function(totalCnt, dataSize, pageSize, pageNo){ 
	totalCnt = parseInt(totalCnt); 
	dataSize = parseInt(dataSize); 
	pageSize = parseInt(pageSize); 
	pageNo = parseInt(pageNo); 
	
	var html = new Array(); 
	if(totalCnt == 0 || dataSize >= totalCnt){
		return ""; 
	} 
	var pageCnt = Math.ceil(totalCnt / dataSize); 
	var pRCnt = parseInt(pageNo / pageSize); 
	if(pageNo % pageSize == 0){
		pRCnt = parseInt(pageNo / pageSize) - 1; 
	} 
	if(pageNo > pageSize){ 
		var s2; 
		if(pageNo % pageSize == 0){
			s2 = pageNo - pageSize; 
		}else{ 
			s2 = pageNo - pageNo % pageSize; 
		} 
		html.push('<a page= "1" class="first">처음 </a>');
		html.push('<a page= "'+s2+'" class="prev">이전</a>'); 
	}
	//paging Bar
	html.push('<span class="page-num">');
	for(var index=pRCnt * pageSize + 1;index<(pRCnt + 1)*pageSize + 1;index++){
		if(index > totalCnt){
			return html.join("");
		}
		if(index == pageNo){ html.push('<strong>'); 
			html.push(index); html.push('</strong>'); 
		}else{ 
			html.push('<a page= "'+index+'">'+index+'</a>'); 
		} 
		if(index == pageCnt){ 
			break; 
		}
	}
	html.push('</span>');
	if(pageCnt > (pRCnt + 1) * pageSize){
		html.push('<a page= "'+((pRCnt + 1)*pageSize+1)+'" class="next">다음</a>');
		html.push('<a page= "'+pageCnt+'" class="last">마지막</a>');
	}
	return html.join(""); 
}

var _setCalendarToggle = function(){
	$(".calendar-box input:eq(0)").change(function(){
		$(".toggle-cont.toggle-4 input:checked+label").click();
	});
	$(".toggle-cont label").click(function(){
		var stDt = $(".calendar-box input:eq(0)").val().split("-");
		var date;
		if(stDt.length == 2){
			date = new Date(parseInt(stDt[0]),parseInt(stDt[1]) -1);
		}else{
			date = new Date();			
		}
		$("#edDt,#stDt").remove();
		$(".calendar-box input:eq(0)").append("<input type='hidden' id='stDt' name= 'stDt'>");
		$(".calendar-box input:eq(0)").append("<input type='hidden' id='edDt' name= 'edDt'>");
		var $cal = $(this).parents(".main-top-search,.search-cont").find(".calendar-box input");
		$cal.attr("disabled",false);
		switch ($(this).find("span").text()){
			case "월" 				:	date.setDate(1);
											$cal.eq(0).val(_getMonthFormat(date));
											$("#stDt").val(_getDateFormat(date));
											date.setMonth(date.getMonth()+1);
											date.setDate(0);
											$("#edDt").val(_getDateFormat(date));
											break;
			case "분기"			:	date.setDate(1);
											date.setMonth(date.getMonth() - (date.getMonth() % 3));
											$cal.eq(0).val(_getMonthFormat(date));
											$("#stDt").val(_getDateFormat(date));
											date.setMonth(date.getMonth()+3);
											date.setDate(0);
											$("#edDt").val(_getDateFormat(date));
											break;
			case "년"				:	date.setDate(1);
											date.setMonth(0);
											$cal.eq(0).val(_getMonthFormat(date));
											$("#stDt").val(_getDateFormat(date));
											date.setMonth(date.getMonth()+12);
											date.setDate(0);
											$("#edDt").val(_getDateFormat(date));
											break;
			case "전체"			:	$cal.val(null);
											$cal.attr("disabled",true);
											date.setFullYear('1900');
											$("#stDt").val(_getDateFormat(date));
											$("#edDt").val(_getDateFormat(new Date()));
											date = null;
											break;
			default 		:	$cal.attr("disabled",true);
								date = null;
								break;
		}
	});
}

var _setArrowToggle = function(){
	$(".prev,.next").off("click").click(function(){
		var operator = $(this).attr("class") == "prev"? -1 : 1;
		var stDt = $(".calendar-box input:eq(0)").val().split("-");
		if(stDt.length != 3){
			return;
		}
		var date = new Date(parseInt(stDt[0]),parseInt(stDt[1]) -1 ,parseInt(stDt[2]));
		var $toggle = $(".toggle-cont.toggle-3 input:checked+label");
		switch ($toggle.text()){
			case "Day" 	:	date.setDate(date.getDate() + operator);
									$(".hasDatepicker").val(_getDateFormat(date));
									break;
			case "Week" 	:	date.setDate(date.getDate() -7  - (date.getDay() - 1));
									$(".hasDatepicker:eq(0)").val(_getDateFormat(date));
									date.setDate(date.getDate() + 6);
									$(".hasDatepicker:eq(1)").val(_getDateFormat(date));
									break;		
			case "Month"	:	date.setMonth(date.getMonth() + operator);
									date.setDate(1);
									$(".hasDatepicker:eq(0)").val(_getDateFormat(date));
									date.setMonth(date.getMonth()+1);
									date.setDate(0);
									$(".hasDatepicker:eq(1)").val(_getDateFormat(date));
									break;
		}
	});
}

var _setLogo = function(){
	if(opener){
		_session = opener._session;
	}
	if(parent){
		_session = parent._session;
	}
	$(".gnb-close strong").removeClass("gnb-logo");
	if(_session.isMobile){ //  PC일경우 엑셀버튼 추가
		$(".btn-down, .table-btn.long").hide();
	}
	if(_session.currBrandCd == "N"){
		$(".login-left").addClass("nissan-img");
		$(".login-right-cont .logo img").attr("src","/SSFA/assets/img/common/img_login_nissan.jpg"); 						// 로그인페이지 로고
		$(".nissan-img .logo img").attr("src","/SSFA/assets/img/common/img_login_nissan_lage.png"); 						// 로그인페이지 로고
		$(".gnb-close strong").addClass("gnb-logo-nissan");											   						// 슬라이드 메뉴 로고
		$("#header h1").addClass("logo").click(function(){location.href=_session.startPage;});		// 해더 로고
		$("#wrap, #wrap2, #wrap3").addClass("nissan");																						// 해더 bg
	}else{
		$(".login-left").addClass("infiniti-img");
		$(".login-right-cont .logo img").attr("src","/SSFA/assets/img/common/img_login_infiniti.jpg"); 						// 로그인페이지 로고
		$(".infiniti-img .logo img").attr("src","/SSFA/assets/img/common/img_login_infiniti_lage.png");
		$(".gnb-close strong").addClass("gnb-logo-infiniti");
		$("#header h1").addClass("logo-infiniti").click(function(){location.href=_session.startPage;});
		$("#wrap, #wrap2, #wrap3").addClass("infiniti");																						// 해더 bg
	}
}

var _setShopCd = function(){
	var $shopCdLi =$("span:contains('사업소')").parents("li");
	var $userCdLi =$("span:contains('담당 SC')").parents("li");
	var shopCdChange = function(){
		var option = {
			data   : _getCode.getUserList({shopCd:$("select[name=shopCd]").val()})
			,name : "userCd"
			,addEmpty : true
			,addEmptyTxt : "담당 SC 선택"
			,value : _session.userCd
			,class : "select-box _defaultUserCd"
		}
		$userCdLi.find("div").html(_getCode.getSelectBox(option));
	}
	if( $shopCdLi.find("select option").text().indexOf("사업소 선택") >= 0 ){
		if(_session.useShopList == ""){
			$shopCdLi.find("select").html("<option value ='"+_session.shopCd+"' >" + _session.shopNm + " </option> ");
			$shopCdLi.find("select").val(_session.shopCd).attr("disabled",true);
			$userCdLi.find("select").html("<option value ='"+_session.userCd+"' >" + _session.userNm + " </option> ");
			$userCdLi.find("select").val(_session.userCd).attr("disabled",true);		
			return;
			
		}	
		var option = {
			data 	 : _session.useShopList
			,value : _session.shopCd
			,name : "shopCd"
			,class : "select-box _defaultShopCd"	
		}
		$shopCdLi.find("div").html(_getCode.getSelectBox(option));
		shopCdChange();
		$("select[name=shopCd]").change(function(){
			shopCdChange();
		});
	}
			
}

var _number_format= function(data)
{
	data += "";
	data = data.replace(/[^0-9-]/gi, "");
    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;
    var sign = data.match(/^[\+\-]/);
    if(sign) {
        data = data.replace(/^[\+\-]/, "");
    }
    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++)
    {
        number = number + data.charAt(i);
        if (i < data.length - 1)
        {
            k++;
            if ((k % cutlen) == 0)
            {
                number = number + comma;
                k = 0;
            }
        }
    }
    if(sign != null)
        number = sign+number;
    return number;
}

var _isNull = function(v){
	if(v == "" || v == null || v == undefined || v == "undefined" || v == "null"){
		return true;
	}else{
		return false;
	}
}

$.fn._excelUpload = function(o){
	var init = {
		 fileEx 		: "xlsx,xls"
		,startRow		: 2
		,insertRoot	    : null
		,callback		: null
		,alert			: true
	}
	var f = $.extend({},init,o||{});
	var r;
	var d = new FormData();
	var fileX = $(this).length;
	/*for (var i = 0; i < fileX; i++) {
		var fileY = $(this).get(i).files.length;
		if(fileY == 0){
			_alert("선택된 파일이 없습니다.");
			return;
		}
		for (var j = 0; j < fileY; j++) {
			var _file =  $(this)[i].files[j];
			if(f.fileEx != null && f.fileEx.toLowerCase().indexOf(_file.name.substring(_file.name.lastIndexOf(".")+1).toLowerCase()) < 0 ){
				_alert("[" + f.fileEx + "] 확장자만 업로드 가능합니다.");
				return;
			}

			d.append("file", _file);
		}
	}*/
	
	$.ajax({
		data:d,
		url: "/SSFA/excelUpload.do",
		type:"POST",
		processData : false,
		contentType : false,
		success:function(data){
			if(data.rc){
				if(f.alert){
					_alert("업로드에 성공하였습니다.");
				}
				if(o.callback != null){
					o.callback(data);
				}					
			}else{
				_alert("Error = " + data.rm);
				return;
			}
		}
	});
	return r;
}