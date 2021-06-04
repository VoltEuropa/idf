/*jslint nomen: true, indent: 2, maxlen: 80 */
/*global window, rJS, RSVP */
(function (window, rJS, RSVP) {
    "use strict";

  /////////////////////////////
  // parameters
  /////////////////////////////
  var STR = "";
  var ACTIVE = "is-active";
  var KLASS = rJS(window);
  var CANVAS = "canvas";
  var ARR = [];
  var BLANK = "_blank";
  var NAME = "name";
  var LOCATION = window.location;
  var DOCUMENT = window.document;

  /////////////////////////////
  // methods
  /////////////////////////////

  function getElem(my_element, my_selector) {
    return my_element.querySelector(my_selector);
  }

  function mergeDict(my_return_dict, my_new_dict) {
    return Object.keys(my_new_dict).reduce(function (pass_dict, key) {
      pass_dict[key] = my_new_dict[key];
      return pass_dict;
    }, my_return_dict);
  }

  function getLang(nav) {
    return (nav.languages ? nav.languages[0] : (nav.language || nav.userLanguage));
  }


  KLASS

    /////////////////////////////
    // state
    /////////////////////////////
    .setState({
      "locale": getLang(window.navigator).substring(0, 2) || "en",
      "online": null,
      "sw_errors": 0,
    })

    /////////////////////////////
    // ready
    /////////////////////////////
    .ready(function (gadget) {
      var element = gadget.element;
      gadget.property_dict = {
        "layout": getElem(element, ".vote-layout"),
        "url_dict": {},
        "content_dict": {},
        "i18n_dict": {},
      };
    })

    /////////////////////////////
    // acquired methods
    /////////////////////////////

    /////////////////////////////
    // published methods
    /////////////////////////////

    /////////////////////////////
    // declared methods
    /////////////////////////////

    .declareMethod("stateChange", function (delta) {
      var gadget = this;
      var state = gadget.state;

      if (delta.hasOwnProperty("locale")) {
        state.locale = delta.locale;
      }
      if (delta.hasOwnProperty("mode")) {
        state.mode = delta.mode;
      }
      if (delta.hasOwnProperty("online")) {
        state.online = delta.online;
        if (state.online) {
          gadget.element.classList.remove("vote-offline");
        } else {
          gadget.element.classList.add("vote-offline");
        }
      }
      //if (delta.hasOwnProperty("sw_errors")) {
      //  state.sw_errors = delta.sw_errors;
      //}
      return;
    })

    // -------------------.--- Render ------------------------------------------
    .declareMethod("render", function (my_option_dict) {
      var gadget = this;
      var dict = gadget.property_dict;

      window.componentHandler.upgradeDom();
      mergeDict(dict, my_option_dict);
    })

    .declareMethod("handleError", function (my_err, my_err_dict) {
      var gadget = this;
      var code;
      var err = my_err.target ? JSON.parse(my_err.target.response).error : my_err;

      for (code in my_err_dict) {
        if (my_err_dict.hasOwnProperty(code)) {
          if ((err.status_code + STR) === code) {
            return my_err_dict[code];
          }
        }
      }
      throw err;
    })

    /////////////////////////////
    // declared jobs
    /////////////////////////////

    /////////////////////////////
    // declared service
    /////////////////////////////
    .declareService(function () {
      var body = DOCUMENT.body;
      var idf = body.querySelector(".idf-seo-content");
      idf.parentElement.removeChild(idf);
      body.classList.remove("idf-splash");     
    })

    /////////////////////////////
    // on Event
    /////////////////////////////

    .onEvent("submit", function (event) {
      switch (event.target.getAttribute(NAME)) {

      }
    });


}(window, rJS, RSVP));