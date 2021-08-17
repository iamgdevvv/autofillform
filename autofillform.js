/*
 Version: 0.0.1
  Author: Grafis Nuresa
 Website: https://iamgdevvv.github.io/autofillform
    Docs: https://iamgdevvv.github.io/autofillform
    Repo: https://github.com/iamgdevvv/autofillform
  Issues: https://github.com/iamgdevvv/autofillform/issues
 */

/* POLYFILL CUSTOM EVENT */
(function () {

	if (typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
})();

var AutoFillForm = {
	init: function () {
		var params = this.parseQuery();
		if(!params || params == "") {
			var EGprevent = new CustomEvent('autofill-cancel', {
				bubbles: true,
				cancelable: true,
				composed: false,
			});
			window.dispatchEvent(EGprevent);

			return false;
		}

		for(var i = 0; i < params.length; i++) {
			var query_key = decodeURIComponent(params[i].split('=')[0]);
			var query_value = decodeURIComponent(params[i].split('=').pop());
			var fields = document.querySelectorAll("[name='"+query_key+"']");

			for(var j = 0; j < fields.length; j++) {
				if(fields[j].matches("[type='checkbox']") || fields[j].matches("[type='radio']")) {
					if(fields[j].matches("[value='"+query_value+"']")) {
						fields[j].checked = true;
					}
				} else {
					fields[j].value = query_value;
				}
			}
		}

		var EGprevent = new CustomEvent('autofill-success', {
			bubbles: true,
			cancelable: true,
			composed: false,
			detail: {
				param_query: params
			}
		});
		window.dispatchEvent(EGprevent);
	},
	parseQuery: function () {
		return window.location.search.substring(1).split("&");
	}
}