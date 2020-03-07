// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	global['DROPBOX_TOKEN'] = atob('UncxWEJoSHQzYUFBQUFBQUFBQURZX203TElMaGFfUjFad1dLLWJtcFRDYW5qVmFnM25aQUh6SUotM2JzRnByWQ==');

	var externallyFramed;

	try {
		externallyFramed = global.top.location.host !== global.location.host;
	} catch (e) {
		externallyFramed = true;
	}

	if (externallyFramed) {
		global.top.location = global.location;
	}
}(this));