current_user = {};
var pages = {};

function Initialize(callback) {
  pages = {
    "nav": null,
    "login": null,
    "menu": null,
    "event_listing": null,
    "create_event": null,
    "my_events": null,
    "friends": null,
    "profile": null,
  };

  js = [
    "nav",
    "login",
    "menu",
    "event_listing",
    "create_event",
    "my_events",
    "friends",
    "profile"
  ]

  var requests = [];
  for (key in pages) {
    // Create a closure to hold the loop value
    (function(key) {
      requests.push (
        $.get(key + '.html', function(page) {
          pages[key] = page;
        })
      );
    })(key);
  }

  js.forEach (function (script) {
    // Create a closure to hold the loop value
    (function(script) {
      requests.push (
        $.getScript('scripts/' + script + '.js').fail( function(jqxhr, settings, exception) { 
          console.log(exception);
        })
      );
    })(script);
  });

  $.when.apply($, requests).then( function() {
    callback();
  });

}

function LoadPage(page) {
  var html = page + '.html';
  $("body").html("");
  $("body").append(pages[page]);

  if ((page != "menu") || (page != "login")) {
    window['JS_' + page].Initialize();
    window['JS_nav'].Initialize();
  }

  $(".redirect").each( function () {
    $( this ).on("click", function( event ) {
      $("body").fadeOut(300, function () {
        LoadPage( $( event.target ).data('redirect') );
        $("body").fadeIn(300);
      });
    });
  });
}

Initialize( function() { LoadPage("login"); });