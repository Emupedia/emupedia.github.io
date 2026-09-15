(function() {
	function start() {
		if (!$sys.feature.ES6) {
			$sys.api.import('assets/js/components/components.js', 'text/babel');

			// noinspection JSUnresolvedVariable
			if (typeof Babel !== 'undefined') {
				// noinspection JSUnresolvedVariable,ES6ModulesDependencies
				if (typeof Babel.transformScriptTags === 'function') {
					// noinspection JSUnresolvedVariable,ES6ModulesDependencies
					Babel.transformScriptTags();
				}
			}

			$sys.api.get('body').innerHTML = '<emuos-desktop></emuos-desktop>';
		} else {
			$sys.api.import('assets/js/components/components.js', function() {
				$sys.api.get('body').innerHTML = '<emuos-desktop></emuos-desktop>';
			});
		}
	}

	if (typeof $sys !== 'undefined') {
		if (!$sys.feature['ES6'] && !$sys.feature['WEBCOMPONENTS_V1']) {
			$sys.api.import($sys.lib['babel-polyfill'][0], function() {
				$sys.api.import($sys.lib['babel-standalone'][0], function() {
					$sys.api.import($sys.lib['webcomponents'][0], function() {
						$sys.api.import($sys.lib['hybrids'][0], function() {
							$sys.api.hybrids = hybrids;
							start();
						});
					});
				});
			});
		} else if (!$sys.feature['WEBCOMPONENTS_V1']) {
			$sys.api.import($sys.lib['webcomponents'][0], function() {
				$sys.api.import($sys.lib['hybrids'][0], function() {
					$sys.api.hybrids = hybrids;
					start();
				});
			});
		} else {
			$sys.api.import($sys.lib['hybrids'][0], function() {
				$sys.api.hybrids = hybrids;
				start();
			});
		}
	}
}());