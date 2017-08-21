/**
 * Created by Lahphim on 8/15/2017 AD.
 */

$(function() {
  $("#toggle-sidebar-btn")
    .click(function() {
      $(document.body).addClass("aside-show");
    });

  $(".aside-overlay")
    .click(function(){
      $(document.body).removeClass("aside-show");
    });
});