// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	var externallyFramed;

	try {
		externallyFramed = global.top.location.host !== global.location.host;
	} catch (e) {
		externallyFramed = true;
	}

	if (externallyFramed) {
		try {
			global.top.location = global.location;
		} catch (e) {
			global.location = global.top.location
		}
	}
}(this));