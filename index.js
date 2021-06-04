/*jslint maxlen: 80, indent: 2 */
/*global window, rJS, RSVP */
(function (window, rJS, RSVP) {
  "use strict";

  /////////////////////////////
  // parameters
  /////////////////////////////
  var OPTION_DICT = {};

  /////////////////////////////
  // methods
  /////////////////////////////

  rJS(window)

    /////////////////////////////
    // ready
    /////////////////////////////
    .ready(function (gadget) {
      gadget.property_dict = {};
    })

    /////////////////////////////
    // published methods
    /////////////////////////////

    /////////////////////////////
    // declared service
    /////////////////////////////
    .declareService(function () {
      var gadget = this;
      return gadget.getDeclaredGadget("idf")
        .push(function (my_vote_gadget) {
          return my_vote_gadget.render(OPTION_DICT);
        })
        .push(null, function (my_error) {
          throw my_error;

          // poor man's error handling
          var fragment = window.document.createDocumentFragment();
          var p = window.document.createElement("p");
          var br = window.document.createElement("br");
          var a = window.document.createElement("a");
          var body = window.document.getElementsByTagName('body')[0];
          p.classList.add("vote-error");
          p.textContent = "Sorry, we messed up or your browser does not seem to support this application :( ";
          a.classList.add("vote-error-link");
          a.textContent = "XXX";
          a.setAttribute("href", "XXX");
          fragment.appendChild(p);
          fragment.appendChild(br);
          fragment.appendChild(a);
  
          while (body.firstChild) {
            body.removeChild(body.firstChild);
          }
          body.appendChild(fragment);
        });
    });

}(window, rJS, RSVP));