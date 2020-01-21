(function() {
	const define = $sys.api.hybrids.define;
	const html = $sys.api.hybrids.html;

	function increaseCount(host) {
		host.count += 1;
	}

	const SimpleCounter = {
		count: 0,
		render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
	};

	define('simple-counter', SimpleCounter);

	$sys.api.fetch('css/components/themes/win9x/panel.css', (e, style) => {
		const Panel = {
			render: () => html`
				<slot name="content">Content</slot>
			`.style(style)
		};

		define('emuos-panel', Panel);
	});

	$sys.api.fetch('css/components/themes/win9x/button.css', (e, style) => {
		const Button = {
			render: () => html`
				<button type="button"><emuos-panel><span slot="content">Test</span></emuos-panel></button>
			`.style(style)
		};

		define('emuos-button', Button);
	});

	$sys.api.fetch('css/components/themes/win9x/titlebar.css', (e, style) => {
		const TitleBar = {
			render: () => html`
				<slot name="title">Title</slot>
				<slot name="content">Content</slot>
			`.style(style)
		};

		define('emuos-titlebar', TitleBar);
	});

	$sys.api.fetch('css/components/themes/win9x/window.css', (e, style) => {
		const Window = {
			render: () => html`
				<emuos-panel>
					<div slot="content">
						<emuos-titlebar>
							<span slot="title">New clock settings</span>
							<emuos-button id="close" class="disabled">x</emuos-button>
						</emuos-titlebar>
					</div>
				</emuos-panel>
			`.style(style)
		};

		define('emuos-window', Window);
	});

	$sys.api.fetch('css/components/themes/win9x/taskbar.css', (e, style) => {
		const Taskbar = {
			render: () => html`
				<emuos-button id="start">Start</emuos-button>
			`.style(style)
		};

		define('emuos-taskbar', Taskbar);
	});

	$sys.api.fetch('css/components/themes/win9x/desktop.css', (e, style) => {
		const Desktop = {
			render: () => html`
				<emuos-button>Start</emuos-button>
			`.style(style)
		};

		define('emuos-desktop', Desktop);
	});
})();