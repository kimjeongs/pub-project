$(document).ready(function () {
  // sidemenu
  $(document).on("click", ".sidemenu > li > a", function () {
    $(this).parents("li").siblings().removeClass("active");
    $(this).parent("li").toggleClass("active");
  });
  $(document).on("click", ".sidemenu > li > ul > li > a", function () {
    $(this).parents("li").siblings().removeClass("active");
    $(this).parent("li").toggleClass("active");
  });

  // menu Full Layer
  $(document).on("click", "#btnFull", function (event) {
    event.stopPropagation();
    $(".fullmenu-layer, .fullmenu-layer-bg").fadeToggle(50);
    $(this).toggleClass("active");
  });
  $(document).on("click", ".fullmenu-layer", function (event) {
    event.stopPropagation();
  });
  $("body").on("click", function () {
    $(".fullmenu-layer, .fullmenu-layer-bg").fadeOut(50);
    $("#btnFull").removeClass("active");
  });

  // menu-layout
  $(document).on("click", ".menu-layout", function () {
    $(this).parents(".wrap").toggleClass("layout-wide");
  });
  $(window).resize(function () {
    var resWidth = window.outerWidth;
    if (resWidth <= 1200) {
      $(".wrap").addClass("mobile").removeClass("layout-wide");
    } else if (resWidth >= 1200) {
      $(".wrap").removeClass("mobile").removeClass("layout-wide");
    }
  });

  // tooltip
  if ($('[data-toggle="tooltip"]').length > 0) {
    var $modalTooltip = $('.modal [data-toggle="tooltip"]');
    var $tooltip = $('.con-wrap [data-toggle="tooltip"]');
    // tooltip이 IE scrollbar 생기는 버그가 있어 모달과 본문페이지 구분
    // 팝업일 경우
    if ($modalTooltip.closest('th').length) {
      $modalTooltip.tooltip();
    }
    if ($tooltip.closest('th').length || $tooltip.closest('.sub-title').length ) {
      $tooltip.tooltip({ container: ".con-wrap" });
    }
  }

  // tooltip (type2)
  $(".info-tooltip-type2").on("mouseenter", ".info-tooltip", function () {
    $(this).next(".info-tooltip-cont").addClass("on");
  });
  $(document).on("click", function (e) {
    if ($(".info-tooltip-cont").has(e.target).length === 0) {
      $(".info-tooltip-cont").removeClass("on");
    }
  });

  /* multiple 모달일 경우 모달 오픈상태를 감지해서 형태유지 */
  $(document).on("hidden.bs.modal", ".modal", function () {
    $(".modal:visible").length && $(document.body).addClass("modal-open");
  });


  // tab
  var menu_li = $('.tab-menu li');
  var cont_div = $('.tab-cont .cont');
  menu_li.on('click',function(e){
    e.preventDefault();
    var i = $(this).index();
    var $this = $(this);
    activeBtn($this);
    activeBox(i);
  });

  function activeBtn($this){
    menu_li.removeClass('active');
    $this.addClass('active');
  }
  function activeBox(i){
    cont_div.removeClass('active');
    cont_div.eq(i).addClass('active');
  }


  // init
  allCheck();
  fileUpload();
  draggle();
  toggle();
  classToggle();
  datePickerLoad();
  selectDirect();
  formAddCell.init();
  fieldAdd.init();
  tableAccordion.init();
});

/**
 * all checkbox checked
 * default: table
 */
function allCheck() {
  // [data-check-parent] 값이 no-table가 존재 할 경우 일반엘리먼트에서 사용
  var $table = $("[data-check-parent]"),
    targetCheck =
      $table.data("checkParent") !== "no-table"
        ? "td:first-child"
        : "[data-check-target]",
    allCheck = "[data-check-parent] .checkAll",
    childCheck =
      "[data-check-parent] " +
      targetCheck +
      ' input[type="checkbox"]:not(.checkAll)';

  // all check
  $(document).on("change", allCheck, function () {
    var isChecked = $(this).prop("checked");
    // 전체체크 할 대상이 테이블 엘리먼트 일 경우
    $childCheck = $(this)
      .closest("[data-check-parent]")
      .find(targetCheck)
      .find('input[type="checkbox"]')
      .not(".checkAll");
    $childCheck.each(function (i, o) {
      if (isChecked) {
        $(o).prop("checked", true);
      } else {
        $(o).prop("checked", false);
      }
    });
  });

  // target check
  $(document).on("change", childCheck, function () {
    var isCheckArray = [];
    var $allCheck = $(this).closest("[data-check-parent]").find(".checkAll");
    $childCheck = $(this)
      .closest("[data-check-parent]")
      .find(targetCheck)
      .find('input[type="checkbox"]')
      .not(".checkAll");
    $childCheck.each(function (i, o) {
      if (!$(o).prop("checked")) {
        isCheckArray.push(i);
      }
    });
    if (isCheckArray.length > 0) {
      $allCheck.prop("checked", false);
    } else {
      $allCheck.prop("checked", true);
    }
  });
}

/**
 * selectDirect
 */
function selectDirect() {
  var select = '[data-direct-target="select"]',
      input = '[data-direct-target="input"]';
  $(input).hide();
  $(document).on('change', select, function () {
    var $input = $(this).next(input);
    if ($(this).val() == "direct") {
      $input.val('').show();
    } else {
      $input.hide();
    }
  });
}

/**
 * datePickerLoad
 */
function datePickerLoad() {
	if ($("[data-datepicker-id=datePicker]").length > 0) {
    $("[data-datepicker-id=datePicker]").each(function(){
      var val = $(this).val();
      $(this).datepicker({
          dateFormat: "yyyy-mm-dd",
          language: "en",
          showMonthAfterYear: true,
          autoClose:true,
          // minDate: new Date()
        });
        $(this).val(val);
      });
    }
}


/**
 * file upload: default
 */
function fileUpload() {
  var $fileElement = $("[data-fileupload]"),
      $fileLabel = $fileElement.find(".custom-file-name"),
      $fileImgbox;
  var fileInput = "[data-file-target]",
      fileDelete = "[data-file-delete]";
  var buttonDeleteNode = "<button type='button' data-file-delete><i class='feather feather icon-x'></i></button>";

  // file select
  $(document).on("change", fileInput, function () {
    var dataFileTarget = this.dataset.fileTarget;
    // data-file-img
    if (dataFileTarget == "img") {
      $fileImgbox = $(this).closest("[data-fileupload]").find(".img-box");
      // image 파일아닐 시 반환
      if (!this.files[0].type.match(/image\//)) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        var src = e.target.result;
        $fileImgbox.empty().append('<img src="' + src + '" alt="" />');

        // delete 버튼추가
        $fileImgbox.closest('.img-area').find(fileDelete).remove();
        $fileImgbox.closest('.img-area').append(buttonDeleteNode);
      };
      reader.readAsDataURL(this.files[0]);
    } else {
      $fileLabel = $(this).closest('.custom-file').siblings(".custom-file-name");
      var filename = this.files[0].name;
      $fileLabel.text(filename);
    }
  });

  // file delete
  $(document).on("click", fileDelete, function () {
    var $fileParent = $(this).closest("[data-fileupload]"),
      $fileImgbox = $fileParent.find(".img-box"),
      $fileLabelInput = $fileParent.find(".img-cont .inp-txt");
    // 이미지유형 일경우
    if ($fileParent.data("fileupload") === "imgType") {
      $(this).remove();
      $fileImgbox.empty();
      $fileLabelInput.val("");
    } else {
      $fileLabel = $fileParent.find(".custom-file-name");
      $fileLabel.text("");
      $fileParent.find('[data-file-target]').val("");
    }
  });
}

/**
 * draggle basic
 */
function draggle() {
  // drag & drop (table)
  if ($("[data-table-draggle]").length > 0) {
    $("[data-table-draggle] tbody")
      .sortable({
        cursor: "move",
        placeholder: "sortable-placeholder",
        helper: "clone",
        items: "tr:not(.fix)",
        stop: function (event, ui) {
          var $tableContainer = $(event.target),
            $table = $tableContainer.closest("[data-table-draggle]");
          if ($table.data("tableDraggle") === "number") {
            $tableContainer.find("tr").each(function (i, o) {
              var $num = $(o).find(".num");
              $num.text(i + 1);
            });
          }
        },
      })
      .disableSelection();
  }

  // drag & drop (box)
  if ($("[data-draggle]").length > 0) {
    $("[data-draggle] [data-draggle-container]")
      .sortable({
        cursor: "move",
        placeholder: "sortable-placeholder",
        helper: "clone",
        handle: ".is-move",
        stop: function (event, ui) {
          var $draggleArea = $(event.target),
            $draggle = $draggleArea.closest("[data-draggle]");
          if ($draggle.data("draggle") === "number") {
            $draggleArea.find(".new-cont-wrap").each(function (i, o) {
              var $index = $(o).find(".new-index");
              $index.text(i + 1);
            });
          }
        },
      })
  }
}

/**
 * toggle
 * default: hide
 */
function toggle() {
  var $toggle = $('[data-toggle="parent"]');
  var $button = '[data-toggle="button"]';
  $toggle.each(function (i, o) {
    if (!$(o).is(".is-close")) return;
    $(o).find(".new-cont-top").addClass("is-move");
  });

  $(document).on("click", $button, function () {
    var $currParent = $(this).closest('[data-toggle="parent"]');
    if ($currParent.is(".is-close")) {
      $currParent.removeClass("is-close");
      if ($currParent.find(".new-cont-top").is(":visible")) {
        $currParent.find(".new-cont-top").removeClass("is-move");
      }
    } else {
      $currParent.addClass("is-close");
      if ($currParent.find(".new-cont-top").is(":visible")) {
        $currParent.find(".new-cont-top").addClass("is-move");
      }
    }
  });
}

/**
 * add Class (toggle)
 */
function classToggle() {
  var $button = '[data-classToggle="target"]';

  $(document).on("click", $button, function () {
    var $li = $(this).parent('li');
    $li.toggleClass('active').siblings('').removeClass('active');
  });
}

/**
 * form cell add/delete
 */
var formAddCell = {
  init: function () {
    this.eventBind();
  },
  element: function () {
    return {
      wrap: '[data-form-cell="wrap"]',
      btnAdd: '[data-form-cell="add"]',
      btnDel: '[data-form-cell="delete"]',
      addNode:
        '<button type="button" class="add" data-form-cell="add"><i class="feather icon-plus"></i>추가</button>',
      deleteNode:
        '<button type="button" class="delete" data-form-cell="delete"><i class="feather icon-minus"></i>삭제</button> ',
    };
  },
  eventBind: function () {
    var self = this;
    var el = self.element();
    $(document).on("click", el.btnAdd, function () {
      self.cellAdd(this);
    });
    $(document).on("click", el.btnDel, function () {
      self.cellDel(this);
    });
  },
  cellAdd: function (target) {
    var self = this;
    var el = self.element();
    var $parent = $(target).closest(el.wrap),
        $liClone = $(target).closest("li").clone();
    var isDepth = $(target).closest(".isDepth").length > 0;
    var btnWrap = isDepth ? ".isDepth > .btn-wrap" : ".btn-wrap";

    // 추가할 cell의 기본 폼 초기화
    self.cellInitialization($liClone);
    // 클릭 후 개발에서 event catch 하기위함
    if (existFunction('formInitialization')) {
      formInitialization($liClone);
    }

    // 추가할 cell
    $liClone.find(btnWrap).find(".delete").remove();
    $liClone.find(btnWrap).prepend(el.deleteNode);

    // 전체 버튼세팅
    $parent.find(btnWrap).find("button").remove();
    $parent.find(btnWrap).append(el.deleteNode);

    $parent.append($liClone);
    datePickerLoad();

    // depth유형은 BTO카테고리의 pakage쪽에 존재함
    if (isDepth) {
      // child element 초기화
      $liClone.find(el.wrap).find("li:not(:last-child)").remove();
      // child element button 초기화
      $liClone.find(el.wrap).find(".btn-wrap").find(".delete").remove();
    }
  },
  cellDel: function (target) {
    var self = this;
    var el = self.element();
    var $parent = $(target).closest(el.wrap),
      $currentItem = $(target).closest("li");
    var btnWrap =
      $(target).closest(".isDepth").length > 0
        ? ".isDepth > .btn-wrap"
        : ".btn-wrap";
    // 삭제
    $currentItem.remove();

    var $item = $parent.find("> li");
    var len = $item.length - 1;
    // cell add/delete depth가 존재할시
    if (len == 0) $item.find(btnWrap).find("button").remove();
    if ($item.eq(len).find(btnWrap).find(el.btnAdd).length == 0) {
      $item.eq(len).find(btnWrap).append(el.addNode);
    }
  },
  cellInitialization: function (elem) {
    if (elem.is('.active')) elem.removeClass('active');
    elem.find(".inp-txt").val("").removeAttr("value");
    elem.find(".datepicker-here").val("");
    elem.find(".direct-sel select").show();
    elem.find(".direct-sel input[type='text']").val("").hide();
  }
};

/**

* field add/delete

*/
var fieldAdd = {
  init: function() {
      this.eventBind();
  },
  element: function() {
      return {
          wrap: '[data-field-add="wrap"]',
          item: '[data-field-add="item"]',
          btnAdd: '[data-field-add="add"]',
          btnDel: '[data-field-add="delete"]',
          specAdd: '[data-field-add="specAdd"]',
          checkNode: '<label class="checkbox"><input type="checkbox" name="Ckk"><span></span></label>',
      };
  },
  eventBind: function() {
      var self = this;
      var el = self.element();
      $(document).on("click", el.btnAdd, function() {
          self.fieldAdd(this);
      });

      $(document).on("click", el.btnDel, function() {
          self.fieldDel(this);
      });

      $(document).on("click", el.specAdd, function() {
          self.fieldSpecAdd(this);
      });
  },
  fieldAdd: function(target) {
      var self = this;
      var el = self.element();
      var $parent = $(target).closest(el.wrap),
          $btnWrap = $parent.find(".btn-wrap"),
          $item = $parent.find(el.item);
      $itemClone = $item.eq(0).clone();

      if ($item.length > 0) $(el.btnDel).show();
      $itemClone.find("> *").text("").val("");
      $itemClone.append(el.checkNode);
      $btnWrap.before($itemClone);
  },
  fieldSpecAdd: function(target) {
      var self = this;
      var el = self.element();
      var $parent = $(target).closest(el.wrap),
          $btnWrap = $parent.find(".btn-wrap"),
          $item = $parent.find(el.item);
      $itemClone = $item.eq(0).clone();

      if ($item.length > 0) $(el.btnDel).show();
      $itemClone.find("> textarea").text("").val("");
      $itemClone.append(el.checkNode);
      $btnWrap.before($itemClone);
  },
  fieldDel: function(target) {
      var self = this;
      var el = self.element();
      var $parent = $(target).closest(el.wrap),
          $item = $parent.find(el.item);
      $item.each(function(i, o) {
          var $checkbox = $(o).find('input[type="checkbox"]');
          var isChecked = $checkbox.prop("checked");
          if (isChecked) {
              $(o).remove();
          }
      });
      if ($parent.find(el.item).length == 1) {
          $(el.btnDel).hide();
      }
  },
};

/**
 * table accordion
 * default: hide
 */
var tableAccordion = {
  init: function () {
    this.eventBind();
  },
  element: function () {
    return {
      wrap: '[datad-table-accordion="wrap"]',
      toggleBtn: '[data-table-accordion="toggle"]',
    };
  },
  eventBind: function () {
    var self = this;
    var el = self.element();
    $(document).on("click", el.toggleBtn, function () {
      self.toggle(this);
    });
  },
  toggle: function (target) {
    var self = this;
    var el = self.element();
    var $currbtn = $(target);
    var $tr = $currbtn.closest("table").find("tr");
    var currtId = $currbtn.closest("tr").find("[data-id]").data("id");

    if ($currbtn.is(".is-active")) {
      $currbtn.removeClass("is-active").text("열림");
    } else {
      $currbtn.addClass("is-active").text("닫힘");
    }

    $tr.each(function (i, o) {
      var $o = $(o);
      var depthId = $o.data("depthId");

      if (!depthId) return;
      var firstCode = parseInt(depthId.split("-")[0]);
      if (currtId === firstCode) {
        if ($o.is(":visible")) {
          $o.hide();
        } else {
          $o.show();
        }
      }
    });
  },
};


/**
 * @param {*} func 
 * 함수존재여부 체크
 */
var existFunction = function(func) {
  return typeof window[func]=== "function";
}






/****************** backend-develop support *******************/
/*
  formAddCell 클릭 후 초기화 가이드
 */
// function formInitialization(elem) {
//   /* 
//       [example]
//       작성할 초기화 내용 추가
//   */
//   // li 속성 지우기
//   elem.removeAttr('data-sep');
//   // 추가한 태그에 대한 타겟 지정
//   elem.find('.inp input[type="hidden"]')
//       .val('') // 값 지우기
//       .removeAttr('value') // value 속성 삭제
//       .removeAttr('name'); // name 속성 삭제
// }


/**
 * cloneHtml
 */
var cloneHtml = function () {
  // data-clone-item: 선택한 대상 (ex: tbody)
  // data-clone-target: data-clone-item을 append할 대상 (ex: tbody, 부모 div)

  var data = {
    item: "[data-clone-item]",
    target: "[data-clone-target]",
  };

  var $item = $(data.item).eq(0).clone();
  // set
  $item.removeClass("focus");
  $item.find('input[type="checkbox"]').prop("checked", false);
  $item.find('input[type="text"]').val("");

  // 추가
  $(data.target).append($item);

  // 추가된후 data item index 재 세팅
  var $target = $item.closest(data.target);
  $target.find(data.item).each(function (i, o) {
    $(o)
      .removeAttr("data-clone-item")
      .attr("data-clone-item", i + 1);
  });
};

/**
 * @param {*} index
 * index: 선택한 대상 인덱스
 */
var deleteHtml = function (index) {
  // 해당인덱스 아이템 삭제
  $("[data-clone-item=" + index + "]").remove();
};


/**
 * @param {*} elem : this
 * 직속부모에 active 클래스 추가
 */
var activeAdd = function (elem) {
  $(elem).parent().addClass('active');
}
/**
 * @param {*} elem : this
 * 직속부모에 active 토글 클래스
 */
var activeToggle = function (elem) {
  $(elem).parent().toggleClass('active');
}
/**
 * @param {*} elem : this
 * 직속부모에 active 클래스 제거
 */
var activeRemove = function (elem) {
  $(elem).parent().removeClass('active');
}


