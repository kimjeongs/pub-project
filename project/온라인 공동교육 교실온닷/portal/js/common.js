var currentInput,
    dayTripperStop;
function dayTripper() {
  $('.ui-datepicker-trigger').each(function(){
    $(this).stop().click(function () {
    currentInput = $(this).siblings('.calendar');
    clearTimeout(dayTripperStop);

    dayTripperStop=setTimeout(function () {
      var today = $('.ui-state-active')[0];

      if (!today) {
        today = $('.ui-datepicker-today a')[0] ||
                $('a.ui-state-default')[0];
      }


      // Hide the entire page (except the date picker)
      // from screen readers to prevent document navigation
      // (by headings, etc.) while the popup is open
      // $("main").attr('id','dp-container');
      // $("#dp-container").attr('aria-hidden','true');
      // $("#skipnav").attr('aria-hidden','true');

      // Hide the "today" button because it doesn't do what
      // you think it supposed to do
      $(".ui-datepicker-current").hide();

      today.focus();
      datePickHandler();
      $(document).on('click', '#ui-datepicker-div .ui-datepicker-close', function () {
        closeCalendar();
      });
    }, 0);
    })
  });
}

function datePickHandler() {
  var activeDate;
  //var container = document.getElementById('ui-datepicker-div');
  var container = $('.ui-datepicker');
  var input = $('.calendar');

  if (!container || !input) {
    return;
  }

 // $(container).find('table').first().attr('role', 'grid');

  container.attr('role', 'application');
  container.attr('aria-label', 'Calendar view date-picker');

    // the top controls:
  var prev = $('.ui-datepicker-prev' , container)[0],
      next = $('.ui-datepicker-next', container)[0];


// This is the line that needs to be fixed for use on pages with base URL set in head
  next.href = 'javascript:void(0)';
  prev.href = 'javascript:void(0)';

  next.setAttribute('role', 'button');
  next.removeAttribute('title');
  prev.setAttribute('role', 'button');
  prev.removeAttribute('title');

  appendOffscreenMonthText(next);
  appendOffscreenMonthText(prev);

  // delegation won't work here for whatever reason, so we are
  // forced to attach individual click listeners to the prev /
  // next month buttons each time they are added to the DOM
  $(next).on('click', handleNextClicks);
  $(prev).on('click', handlePrevClicks);

  monthDayYearText();

  $(container).on('keydown', function calendarKeyboardListener(keyVent) {
    var which = keyVent.which;
    var target = keyVent.target;
    var dateCurrent = getCurrentDate(container);

    if (!dateCurrent) {
      dateCurrent = $('.ui-state-active')[0] ||
                    $('.ui-state-highlight');
      setHighlightState(dateCurrent, container);
    }

    if (27 === which) {
      keyVent.stopPropagation();
      return closeCalendar();
    } else if (which === 9 && keyVent.shiftKey) { // SHIFT + TAB
      keyVent.preventDefault();
      if ($(target).hasClass('ui-datepicker-close')) { // close button
        $('.ui-datepicker-prev')[0].focus();
      } else if ($(target).hasClass('ui-state-default')) { // a date link
        if ($('.ui-datepicker-prev').hasClass('ui-state-disabled')) {
            $('.ui-datepicker-next')[0].focus();
        }else {
            $('.ui-datepicker-prev')[0].focus();
        }
      } else if ($(target).hasClass('ui-datepicker-prev')) { // the prev link
        if ($('.ui-datepicker-next').hasClass('ui-state-disabled')) {
            activeDate = $('.ui-state-active')[0] ||
                    $('.ui-state-highlight');
            if (activeDate) {
              activeDate.focus();
            }
        }else {
            $('.ui-datepicker-next')[0].focus();
        }
      } else if ($(target).hasClass('ui-datepicker-next')) { // the next link
         activeDate = $('.ui-state-active')[0] ||
                    $('.ui-state-highlight');
        if (activeDate) {
          activeDate.focus();
        }
      }
    } else if (which === 9) { // TAB
      keyVent.preventDefault();
      if ($(target).hasClass('ui-datepicker-close')) { // close button
        activeDate = $('.ui-state-active')[0] ||
                    $('.ui-state-highlight');
        if (activeDate) {
          activeDate.focus();
        }
      } else if ($(target).hasClass('ui-state-default')) {
        if ($('.ui-datepicker-next').hasClass('ui-state-disabled')) {
            $('.ui-datepicker-prev')[0].focus();
        }else {
            $('.ui-datepicker-next')[0].focus();
        }
      } else if ($(target).hasClass('ui-datepicker-next')) {
        if ($('.ui-datepicker-prev').hasClass('ui-state-disabled')) {
            activeDate = $('.ui-state-active')[0] ||
                    $('.ui-state-highlight');
            if (activeDate) {
              activeDate.focus();
            }
        }else {
            $('.ui-datepicker-prev')[0].focus();
        }
      } else if ($(target).hasClass('ui-datepicker-prev')) {
        activeDate = $('.ui-state-active')[0] ||
                    $('.ui-state-highlight');
        if (activeDate) {
          activeDate.focus();
        }
        //$('.ui-datepicker-close')[0].focus();
      }
    } else if (which === 37) { // LEFT arrow key
      // if we're on a date link...
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault();
        previousDay(target);
      }
    } else if (which === 39) { // RIGHT arrow key
      // if we're on a date link...
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault();
        nextDay(target);
      }
    } else if (which === 38) { // UP arrow key
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault();
        upHandler(target, container, prev);
      }
    } else if (which === 40) { // DOWN arrow key
      if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
        keyVent.preventDefault();
        downHandler(target, container, next);
      }
    } else if (which === 13) { // ENTER
      if ($(target).hasClass('ui-state-default')) {
        setTimeout(function () {
          closeCalendar();
        }, 100);
      } else if ($(target).hasClass('ui-datepicker-prev')) {
        handlePrevClicks();
      } else if ($(target).hasClass('ui-datepicker-next')) {
        handleNextClicks();
      }
    } else if (32 === which) {
      if ($(target).hasClass('ui-datepicker-prev') || $(target).hasClass('ui-datepicker-next')) {
        target.click();
      }
    } else if (33 === which) { // PAGE UP
      moveOneMonth(target, 'prev');
    } else if (34 === which) { // PAGE DOWN
      moveOneMonth(target, 'next');
    } else if (36 === which) { // HOME
      var firstOfMonth = $(target).closest('tbody').find('.ui-state-default')[0];
      if (firstOfMonth) {
        firstOfMonth.focus();
        setHighlightState(firstOfMonth, $('#ui-datepicker-div')[0]);
      }
    } else if (35 === which) { // END
      var $daysOfMonth = $(target).closest('tbody').find('.ui-state-default');
      var lastDay = $daysOfMonth[$daysOfMonth.length - 1];
      if (lastDay) {
        lastDay.focus();
        setHighlightState(lastDay, $('#ui-datepicker-div')[0]);
      }
    }
    $(".ui-datepicker-current").hide();
  });
}

function closeCalendar(e) {
  var container = $('#ui-datepicker-div');
  $(container).off('keydown');
  //$(input).datepicker('hide');
  $(currentInput).focus();
}

function removeAria() {
  // make the rest of the page accessible again:
  $("#dp-container").removeAttr('aria-hidden');
  $("#skipnav").removeAttr('aria-hidden');
}

///////////////////////////////
//////////////////////////// //
///////////////////////// // //
// UTILITY-LIKE THINGS // // //
///////////////////////// // //
//////////////////////////// //
///////////////////////////////
function isOdd(num) {
  return num % 2;
}

function moveOneMonth(currentDate, dir) {
  var button = (dir === 'next')
              ? $('.ui-datepicker-next')[0]
              : $('.ui-datepicker-prev')[0];

  if (!button) {
    return;
  }

  var ENABLED_SELECTOR = '#ui-datepicker-div tbody td:not(.ui-state-disabled)';
  var $currentCells = $(ENABLED_SELECTOR);
  var currentIdx = $.inArray(currentDate.parentNode, $currentCells);

  button.click();
  setTimeout(function () {
    updateHeaderElements();

    var $newCells = $(ENABLED_SELECTOR);
    var newTd = $newCells[currentIdx];
    var newAnchor = newTd && $(newTd).find('a')[0];

    while (!newAnchor) {
      currentIdx--;
      newTd = $newCells[currentIdx];
      newAnchor = newTd && $(newTd).find('a')[0];
    }

    setHighlightState(newAnchor, $('#ui-datepicker-div')[0]);
    newAnchor.focus();

  }, 0);

}

function handleNextClicks() {
  setTimeout(function () {
    updateHeaderElements();
    prepHighlightState();
    $('.ui-datepicker-next').focus();
    $(".ui-datepicker-current").hide();
  }, 0);
}

function handlePrevClicks() {
  setTimeout(function () {
    updateHeaderElements();
    prepHighlightState();
    $('.ui-datepicker-prev').focus();
    $(".ui-datepicker-current").hide();
  }, 0);
}

function previousDay(dateLink) {
  var container = document.getElementById('ui-datepicker-div');
  if (!dateLink) {
    return;
  }
  var td = $(dateLink).closest('td');
  if (!td) {
    return;
  }

  var prevTd = $(td).prev(),
      prevDateLink = $('a.ui-state-default', prevTd)[0];

  if (prevTd && prevDateLink) {
    setHighlightState(prevDateLink, container);
    prevDateLink.focus();
  } else {
    handlePrevious(dateLink);
  }
}


function handlePrevious(target) {
  var container = document.getElementById('ui-datepicker-div');
  if (!target) {
    return;
  }
  var currentRow = $(target).closest('tr');
  if (!currentRow) {
    return;
  }
  var previousRow = $(currentRow).prev();

  if (!previousRow || previousRow.length === 0) {
    // there is not previous row, so we go to previous month...
    previousMonth();
  } else {
    var prevRowDates = $('td a.ui-state-default', previousRow);
    var prevRowDate = prevRowDates[prevRowDates.length - 1];

    if (prevRowDate) {
      setTimeout(function () {
        setHighlightState(prevRowDate, container);
        prevRowDate.focus();
      }, 0);
    }
  }
}

function previousMonth() {
  var prevLink = $('.ui-datepicker-prev')[0];
  var container = document.getElementById('ui-datepicker-div');
  prevLink.click();
  // focus last day of new month
  setTimeout(function () {
    var trs = $('tr', container),
        lastRowTdLinks = $('td a.ui-state-default', trs[trs.length - 1]),
        lastDate = lastRowTdLinks[lastRowTdLinks.length - 1];

    // updating the cached header elements
    updateHeaderElements();

    setHighlightState(lastDate, container);
    lastDate.focus();

  }, 0);
}

///////////////// NEXT /////////////////
/**
 * Handles right arrow key navigation
 * @param  {HTMLElement} dateLink The target of the keyboard event
 */
function nextDay(dateLink) {
  var container = document.getElementById('ui-datepicker-div');
  if (!dateLink) {
    return;
  }
  var td = $(dateLink).closest('td');
  if (!td) {
    return;
  }
  var nextTd = $(td).next(),
      nextDateLink = $('a.ui-state-default', nextTd)[0];

  if (nextTd && nextDateLink) {
    setHighlightState(nextDateLink, container);
    nextDateLink.focus(); // the next day (same row)
  } else {
    handleNext(dateLink);
  }
}

function handleNext(target) {
  var container = document.getElementById('ui-datepicker-div');
  if (!target) {
    return;
  }
  var currentRow = $(target).closest('tr'),
      nextRow = $(currentRow).next();

  if (!nextRow || nextRow.length === 0) {
    nextMonth();
  } else {
    var nextRowFirstDate = $('a.ui-state-default', nextRow)[0];
    if (nextRowFirstDate) {
      setHighlightState(nextRowFirstDate, container);
      nextRowFirstDate.focus();
    }
  }
}

function nextMonth() {
  nextMon = $('.ui-datepicker-next')[0];
  var container = $('.ui-datepicker');
  nextMon.click();
  // focus the first day of the new month
  setTimeout(function () {
    // updating the cached header elements
    updateHeaderElements();

    var firstDate = $('a.ui-state-default', container)[0];
    setHighlightState(firstDate, container);
    firstDate.focus();
  }, 0);
}

/////////// UP ///////////
/**
 * Handle the up arrow navigation through dates
 * @param  {HTMLElement} target   The target of the keyboard event (day)
 * @param  {HTMLElement} cont     The calendar container
 * @param  {HTMLElement} prevLink Link to navigate to previous month
 */
function upHandler(target, cont, prevLink) {
  prevLink = $('.ui-datepicker-prev')[0];
  var rowContext = $(target).closest('tr');
  if (!rowContext) {
    return;
  }
  var rowTds = $('td', rowContext),
      rowLinks = $('a.ui-state-default', rowContext),
      targetIndex = $.inArray(target, rowLinks),
      prevRow = $(rowContext).prev(),
      prevRowTds = $('td', prevRow),
      parallel = prevRowTds[targetIndex],
      linkCheck = $('a.ui-state-default', parallel)[0],
      upHandlerStop;

  clearTimeout(upHandlerStop);
  if (prevRow && parallel && linkCheck) {
    // there is a previous row, a td at the same index
    // of the target AND theres a link in that td
    setHighlightState(linkCheck, cont);
    linkCheck.focus();
  } else {
    // we're either on the first row of a month, or we're on the
    // second and there is not a date link directly above the target
    if (!$('.ui-datepicker-prev').hasClass('ui-state-disabled')) {
        prevLink.click();
    }
    upHandlerStop = setTimeout(function () {
      // updating the cached header elements
      updateHeaderElements();
      var newRows = $('tr', cont),
          lastRow = newRows[newRows.length - 1],
          lastRowTds = $('td', lastRow),
          tdParallelIndex = $.inArray(target.parentNode, rowTds),
          newParallel = lastRowTds[tdParallelIndex],
          newCheck = $('a.ui-state-default', newParallel)[0];
      if (lastRow && newParallel && newCheck) {
        if (!$('.ui-datepicker-prev').hasClass('ui-state-disabled')) {
            setHighlightState(newCheck, cont);
            newCheck.focus();
        }else {
            $('a.ui-state-default')[0].focus();
        }
      } else {
        // theres no date link on the last week (row) of the new month
        // meaning its an empty cell, so we'll try the 2nd to last week
        var secondLastRow = newRows[newRows.length - 2],
            secondTds = $('td', secondLastRow),
            targetTd = secondTds[tdParallelIndex],
            linkCheck = $('a.ui-state-default', targetTd)[0];

        if (linkCheck) {
            if (!$('.ui-datepicker-prev').hasClass('ui-state-disabled')) {
                setHighlightState(linkCheck, cont);
                linkCheck.focus();
            }else {
                $('a.ui-state-default')[0].focus();
            }
        }
      }
    }, 0);
  }
}

//////////////// DOWN ////////////////
/**
 * Handles down arrow navigation through dates in calendar
 * @param  {HTMLElement} target   The target of the keyboard event (day)
 * @param  {HTMLElement} cont     The calendar container
 * @param  {HTMLElement} nextLink Link to navigate to next month
 */
function downHandler(target, cont, nextLink) {
  nextLink = $('.ui-datepicker-next')[0];
  var targetRow = $(target).closest('tr');
  if (!targetRow) {
    return;
  }
  var targetCells = $('td', targetRow),
      cellIndex = $.inArray(target.parentNode, targetCells), // the td (parent of target) index
      nextRow = $(targetRow).next(),
      nextRowCells = $('td', nextRow),
      nextWeekTd = nextRowCells[cellIndex],
      nextWeekCheck = $('a.ui-state-default', nextWeekTd)[0],
      downHandlerStop;

  clearTimeout(downHandlerStop);
  if (nextRow && nextWeekTd && nextWeekCheck) {
    // theres a next row, a TD at the same index of `target`,
    // and theres an anchor within that td
    setHighlightState(nextWeekCheck, cont);
    nextWeekCheck.focus();
  } else {
    if (!$('.ui-datepicker-next').hasClass('ui-state-disabled')) {
        nextLink.click();
    }

    downHandlerStop = setTimeout(function () {
      // updating the cached header elements
      updateHeaderElements();

      var nextMonthTrs = $('tbody tr', cont),
          firstTds = $('td', nextMonthTrs[0]),
          firstParallel = firstTds[cellIndex],
          firstCheck = $('a.ui-state-default', firstParallel)[0];

      if (firstParallel && firstCheck) {
        if (!$('.ui-datepicker-next').hasClass('ui-state-disabled')) {
            setHighlightState(firstCheck, cont);
            firstCheck.focus();
        }else {
            $('a.ui-state-default:last-child').focus();
        }
      } else {
        // lets try the second row b/c we didnt find a
        // date link in the first row at the target's index
        var secondRow = nextMonthTrs[1],
            secondTds = $('td', secondRow),
            secondRowTd = secondTds[cellIndex],
            secondCheck = $('a.ui-state-default', secondRowTd)[0];

        if (secondRow && secondCheck) {
          setHighlightState(secondCheck, cont);
          secondCheck.focus();
        }
      }
    }, 0);
  }
}


function onCalendarHide() {
  closeCalendar();
}

// add an aria-label to the date link indicating the currently focused date
// (formatted identically to the required format: mm/dd/yyyy)
function monthDayYearText() {
  var cleanUps = $('.amaze-date');

  $(cleanUps).each(function (clean) {
  // each(cleanUps, function (clean) {
    clean.parentNode.removeChild(clean);
  });

  var datePickDiv = document.getElementById('ui-datepicker-div');
  // in case we find no datepick div
  if (!datePickDiv) {
    return;
  }

  var dates = $('a.ui-state-default', datePickDiv);
  $(dates).attr('role', 'button').on('keydown', function (e) {
    if (e.which === 32) {
      e.preventDefault();
      e.target.click();
      setTimeout(function () {
        closeCalendar();
      }, 100);
    }
  });
  $(dates).each(function (index, date) {
    var currentRow = $(date).closest('tr'),
        currentTds = $('td', currentRow),
        currentIndex = $.inArray(date.parentNode, currentTds),
        headThs = $('thead tr th', datePickDiv),
        dayIndex = headThs[currentIndex],
        daySpan = $('span', dayIndex)[0],
        monthName = $('.ui-datepicker-month', datePickDiv)[0].innerHTML,
        year = $('.ui-datepicker-year', datePickDiv)[0].innerHTML,
        number = date.innerHTML;

    if (!daySpan || !monthName || !number || !year) {
      return;
    }

    // AT Reads: {month} {date} {year} {day}
    // "December 18 2014 Thursday"
    var dateText = monthName + ' ' + date.innerHTML + ' ' + year + ' ' + daySpan.title;
    // AT Reads: {date(number)} {name of day} {name of month} {year(number)}
    // var dateText = date.innerHTML + ' ' + daySpan.title + ' ' + monthName + ' ' + year;
    // add an aria-label to the date link reading out the currently focused date
    date.setAttribute('aria-label', dateText);
  });
}



// update the cached header elements because we're in a new month or year
function updateHeaderElements() {
  var context = $('.ui-datepicker');
  if (!context) {
    return;
  }

//  $(context).find('table').first().attr('role', 'grid');

  prev = $('.ui-datepicker-prev', context)[0];
  next = $('.ui-datepicker-next', context)[0];

  //make them click/focus - able
  next.href = 'javascript:void(0)';
  prev.href = 'javascript:void(0)';

  next.setAttribute('role', 'button');
  prev.setAttribute('role', 'button');
  appendOffscreenMonthText(next);
  appendOffscreenMonthText(prev);

  $(next).on('click', handleNextClicks);
  $(prev).on('click', handlePrevClicks);

  // add month day year text
  monthDayYearText();
}


function prepHighlightState() {
  var highlight;
  var cage = document.getElementById('ui-datepicker-div');
  highlight = $('.ui-state-highlight', cage)[0] ||
              $('.ui-state-default', cage)[0];
  if (highlight && cage) {
    setHighlightState(highlight, cage);
  }
}

// Set the highlighted class to date elements, when focus is recieved
function setHighlightState(newHighlight, container) {
  var prevHighlight = getCurrentDate(container);
  // remove the highlight state from previously
  // highlighted date and add it to our newly active date
  $(prevHighlight).removeClass('ui-state-highlight');
  $(newHighlight).addClass('ui-state-highlight');
}


// grabs the current date based on the hightlight class
function getCurrentDate(container) {
  var currentDate = $('.ui-state-highlight', container)[0];
  return currentDate;
}

/**
 * Appends logical next/prev month text to the buttons
 * - ex: Next Month, January 2015
 *       Previous Month, November 2014
 */
function appendOffscreenMonthText(button) {
  var buttonText;
  var isNext = $(button).hasClass('ui-datepicker-next');
  var months = [
    'january', 'february',
    'march', 'april',
    'may', 'june', 'july',
    'august', 'september',
    'october',
    'november', 'december'
  ];

  var currentMonth = $('.ui-datepicker-title .ui-datepicker-month').text().toLowerCase();
  var monthIndex = $.inArray(currentMonth.toLowerCase(), months);
  var currentYear = $('.ui-datepicker-title .ui-datepicker-year').text().toLowerCase();
  var adjacentIndex = (isNext) ? monthIndex + 1 : monthIndex - 1;

  if (isNext && currentMonth === 'december') {
    currentYear = parseInt(currentYear, 10) + 1;
    adjacentIndex = 0;
  } else if (!isNext && currentMonth === 'january') {
    currentYear = parseInt(currentYear, 10) - 1;
    adjacentIndex = months.length - 1;
  }

  buttonText = (isNext)
                ? 'Next Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear
                : 'Previous Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear;

  $(button).find('.ui-icon').html(buttonText);

}

// Returns the string with the first letter capitalized
function firstToCap(s) {
  //return s.charAt(0).toUpperCase() + s.slice(1);
}

$(document).ready(function() {
    //gnb
    var gnb = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventWrap: '.gnb',
            eventCont: '.gnb .gnb_link >li',
            eventAllMenuOpen: '.all_menu_open a',
            eventAllMenuClose: '.all_menu_close a'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventAllMenuOpen).on('click', function(e) {
                e.preventDefault();
                _this.objAllOpen(e);
            });
            $(_this.eventObj.eventAllMenuClose).on('click', function(e) {
                e.preventDefault();
                _this.objAllClose(e);
            });
            $(_this.eventObj.eventCont).on('mouseenter focusin', function(e) {
                e.preventDefault();
                _this.objOpen(e);
            });
            $(_this.eventObj.eventCont).on('mouseleave focusout', function(e) {
                e.preventDefault();
                _this.objClose(e);
            });
        },
        objOpen: function(e) {
          var curHeight = $(e.currentTarget).find('.gnb_sub_menu').height(),
            autoHeight = $(e.currentTarget).find('.gnb_sub_menu').css('height', 'auto').height();
            $(e.currentTarget).find('.gnb_sub_menu').height(curHeight);
          $(e.currentTarget).find('.gnb_sub_menu').stop().animate({'height': autoHeight},400);
        },
        objClose: function(e) {
          $(e.currentTarget).find('.gnb_sub_menu').stop().animate({'height': 0},400);
        },
        objAllOpen: function(e) {
          var allMenu = $(e.currentTarget).attr('href');
          $(this.eventObj.eventCont).unbind('mouseenter focusin');
          $(allMenu).stop().slideDown().focus();
        },
        objAllClose: function(e) {
          var _this = this,
              allMenu = $(e.currentTarget).attr('href');
          $(allMenu).stop().slideUp().focus();
          $(this.eventObj.eventCont).bind('mouseenter focusin', function(e) {
                e.preventDefault();
                _this.objOpen(e);
            });
        }
    };

    //gnbMo
    var gnbScroll;
    var gnbMo = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventWrap: '#gnbMo',
            eventCont: '#gnbMo .view_all_menu_cont_mo',
            eventMenuOpen: '#gnbMo .all_menu_open_mo a',
            eventMenuClose: '#gnbMo .all_menu_close_mo a'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventMenuOpen).on('click', function(e) {
                e.preventDefault();
                _this.objOpen(e);
            });
            $(_this.eventObj.eventMenuClose).on('click', function(e) {
                e.preventDefault();
                _this.objClose(e);
            });
        },
        objOpen: function(e) {
          var _this = this;
          $('body').css('overflow','hidden');
          $(this.eventObj.eventCont).css('display','flex');
          window.setTimeout(function() {
            $(_this.eventObj.eventCont).addClass('on');
            $(window).bind('touchmove', function (e) { e.preventDefault(); }, false);
            setTimeout(function() {
              gnbScroll = new IScroll('#allMenu',{
                mouseWheel: true,
                click:true
              });
              $( window ).resize(function() {
                gnbScroll.refresh();
                //gnbMo.objResizeClose();
              });
            },200);
          },50);
        },
        objClose: function(e) {
          var _this = this;
          $(this.eventObj.eventCont).removeClass('on');
          window.setTimeout(function() {
            $('body').css('overflow','');
            $(window).unbind('touchmove');
            $(_this.eventObj.eventCont).css('display','none');
          },800);
        },
        objResizeClose: function(e) {
          var _this = this;
          $('body').css('overflow','');
          $(window).unbind('touchmove');
          $(this.eventObj.eventCont).css('display','none');
          $(this.eventObj.eventCont).removeClass('on');
        }
    };

    //location
    var locationNav = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.location .menu',
            eventSel: '.location .menu > a',
            eventToggleCont: '.location .menu'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            $(e.target).siblings('ul').parents('.menu').addClass('on').siblings('.menu').removeClass('on');
        },
        close: function(e) {
            if (!$(e).parents().is(this.eventObj.eventCont)) {
                $(this.eventObj.eventToggleCont).removeClass('on');
            }
        }
    };

    //관련사이트
    var relateSite = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.footer_cont .site',
            eventSel: '.footer_cont .site > a',
            eventToggleCont: '.footer_cont .site > ul'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            $(e.target).siblings('ul').toggle();
        },
        close: function(e) {
            if (!$(e).parents().is(this.eventObj.eventCont)) {
                $(this.eventObj.eventToggleCont).hide();
            }
        }
    };

    //로그인 아이디,비밀번호
    var capsSet;
    var loginInp = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventInput: '.input_caps_lock'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventInput).on('focusin focusout keydown keypress', function(e) {
                if (e.type == 'focusin') {
                    _this.inpFoucsIn(this);
                } else if (e.type == 'focusout') {
                    _this.inpFoucsOut(this);
                } else if (e.type == 'keydown') {
                    _this.inpuCapsKeydown(e, this);
                } else if (e.type == 'keypress') {
                    _this.inpuCapsKeypress(e, this);
                }
            });
        },
        inpFoucsIn: function(e) {
            $(e).addClass('on');
        },
        inpFoucsOut: function(e) {
            $(e).removeClass('on');
            $(e).siblings('.caps_lock').hide();
        },
        inpuCapsKeydown: function(e, target) {
            if (typeof(window.lastpress) === 'undefined') { window.lastpress = e.timeStamp; }
            if (typeof(window.capsLockEnabled) !== 'undefined') {
                if (e.keyCode == 20 && e.timeStamp > window.lastpress + 50) {
                    window.capsLockEnabled = !window.capsLockEnabled;
                    if (window.capsLockEnabled) {
                        $(target).siblings('.caps_lock').show(1, function() {
                            clearTimeout(capsSet);

                        });
                        capsSet = setTimeout(function() {
                            $(target).siblings('.caps_lock').hide();
                        }, 1000);
                    } else {
                        $(target).siblings('.caps_lock').hide();
                    }
                }
                window.lastpress = e.timeStamp;
            }
        },
        inpuCapsKeypress: function(e, target) {
            var s = String.fromCharCode(e.keyCode);
            if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
                window.capsLockEnabled = true;

                $(target).siblings('.caps_lock').show(1, function() {
                    clearTimeout(capsSet);

                });
                capsSet = setTimeout(function() {
                    $(target).siblings('.caps_lock').hide();
                }, 1000);
            } else {
                window.capsLockEnabled = false;
                $(target).siblings('.caps_lock').hide();
            }
        }
    };

    //layerpopup
    var layerTarget;
    var layerPopup = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventOpen: '.d_layer_open',
            eventClose: '.d_layer_close',
            eventDimmed: '#dimmed'
        },
        bindEvt: function() {
            var _this = this;
            $(document).on('click',_this.eventObj.eventOpen, function(e) {
                e.preventDefault();
                layerTarget = $(this);
                _this.popupOpen(e);
            });
            $(document).on('click',_this.eventObj.eventClose, function(e) {
                e.preventDefault();
                _this.popupClose(e);
            });
        },
        popupOpen: function(e) {
            this.dimmedClose();
            $('.layer_popup').hide();
            var layerId = $(e.currentTarget).attr('href');

            this.dimmedOpen();
            $(layerId).css('display','flex').focus();
        },
        popupClose: function(e) {
            var layerId = $(e.target).parents('.layer_popup').attr('id');
            layerTarget.focus();
            this.dimmedClose();
            $(e.target).parents('.layer_popup').hide();
        },
        dimmedOpen: function(e) {
            $(this.eventObj.eventDimmed).show();
        },
        dimmedClose: function(e) {
            $(this.eventObj.eventDimmed).hide();
        },
        close: function(e) {
        }
    };

    //tab
    var tab = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.d_tab',
            eventSel: '.d_tab li > a'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            $(e.target).parents('li').addClass('on').siblings().removeClass('on');
        }
    };

    //tab2
    var tab2 = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.d_tab2',
            eventSel: '.d_tab2_select a',
            eventToggleCont: '.d_tab2_cont'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            var itemId = $(e.currentTarget).attr('href');
            $(e.currentTarget).parents('li').addClass('on').siblings('li').removeClass('on');
            $(itemId).show().siblings(this.eventObj.eventToggleCont).hide();
        }
    };

    //radioSelect
    var radioSelect = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventSel: '.d_radio_select'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            $(e.target).addClass('on').siblings(this.eventObj.eventSel).removeClass('on');
        }
    };

    //accordion
    var accordion = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.d_accordion li',
            eventSel: '.d_accordion_select',
            eventToggleCont: '.d_accordion_cont'
        },
        bindEvt: function() {
            var _this = this;
            $(document).on('click',_this.eventObj.eventSel, function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            var topHead = 53;
            $(this.eventObj.eventCont).removeClass('on');
            $(e.target).parents('li').toggleClass('on').find(this.eventObj.eventToggleCont).focus();
            if ($(window).width() < 560) {
                topHead = 114;
            }else if ($(window).width() < 1280) {
                topHead = 134;
            }
            $(window).scrollTop($(e.target).parents('li').find(this.eventObj.eventToggleCont).offset().top - topHead);
        }
    };

    //accordion2
    var accordion2 = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.d_accordion2',
            eventSel: '.d_accordion2_select',
            eventToggleCont: '.d_accordion2_cont'
        },
        bindEvt: function() {
            var _this = this;
            $(document).on('click',_this.eventObj.eventSel, function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            if ($(e.target).parents(this.eventObj.eventCont).hasClass('on')) {
              $(e.target).parents(this.eventObj.eventCont).removeClass('on');
            }else {
              $(this.eventObj.eventCont).removeClass('on');
              $(e.target).parents(this.eventObj.eventCont).addClass('on').find(this.eventObj.eventToggleCont).focus();
            }
        }
    };

    //toggle
    var toggle = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.d_toggle',
            eventSel: '.d_toggle_select',
            eventToggleCont: '.d_toggle_cont'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventSel).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            $(e.target).parents(this.eventObj.eventCont).toggleClass('on');
            $(e.target).siblings(this.eventObj.eventToggleCont).focus();
        }
    };

    //switch
    var switchOnOff = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventCont: '.d_switch'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventCont).on('click', function(e) {
                e.preventDefault();
                _this.objToggle(e);
            });
        },
        objToggle: function(e) {
            if ($(e.currentTarget).hasClass('on')) {
              $(e.currentTarget).removeClass('on').addClass('off').text('OFF').attr('title','클릭시 ON로 전환');
            }else {
              $(e.currentTarget).removeClass('off').addClass('on').text('ON').attr('title','클릭시 OFF로 전환');
            }
        }
    };

    //datepicker
    var datepicker = {
        init: function() {
            this.bindEvt();
        },
        eventObj: {
            eventInput: '.calendar'
        },
        bindEvt: function() {
            var _this = this;
            $(_this.eventObj.eventInput).on('focusin focusout', function(e) {
                if (e.type == 'focusin') {
                    _this.inpFoucsIn(this);
                } else if (e.type == 'focusout') {
                    _this.inpFoucsOut(this);
                }
            });
        },
        inpFoucsIn: function(e) {
            $(e).addClass('on');
        },
        inpFoucsOut: function(e) {
            $(e).removeClass('on');
        }
    };

    if ($('body').find('.calendar').length > 0) {
        $( '.calendar' ).datepicker({
            showOn: 'button',
            buttonText: '날짜선택',
            //buttonImage: '../../../images/common/ico_calendar_on.png',
            dayNamesMin: ['일','월', '화', '수', '목', '금', '토'], 
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            nextText: '다음 달',
            prevText: '이전 달',
            dateFormat: 'yy-mm-dd',
            yearSuffix: '년',
            showMonthAfterYear: true,
        });
        $('.ui-datepicker-trigger').each(function(){
            $(this).attr('aria-describedby', 'datepickerLabel');
        });
        dayTripper();
    }

    var globalClose = {
        init: function() {
            this.bindEvt();
        },
        bindEvt: function() {
            $('html').on('click', this.closeAll);
        },
        closeAll: function(e) {
            locationNav.close(e.target);
            relateSite.close(e.target);
        }
    };

    gnb.init();
    gnbMo.init();
    locationNav.init();
    relateSite.init();
    loginInp.init();
    layerPopup.init();
    tab.init();
    tab2.init();
    radioSelect.init();
    accordion.init();
    accordion2.init();
    toggle.init();
    datepicker.init();
    switchOnOff.init();
    globalClose.init();
});