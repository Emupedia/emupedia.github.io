(function() {
	// noinspection JSUnresolvedVariable
	const define = $sys.api.hybrids.define;
	// noinspection JSUnresolvedVariable
	const html = $sys.api.hybrids.html;

	function increaseCount(host) {
		host.count += 1;
	}

	const SimpleCounter = {
		count: 0,
		render: ({ count }) => html`<button onclick="${increaseCount}">Count: ${count}</button>`
	};

	define('simple-counter', SimpleCounter);

	$sys.api.fetch('assets/styles/css/components/themes/win9x/panel.css', (e, style) => {
		const Panel = {
			render: () => html`
				<slot name="panel-content">Panel</slot>
			`.style(style)
		};

		define('emuos-panel', Panel);
	});

	$sys.api.fetch('assets/styles/css/components/themes/win9x/button.css', (e, style) => {
		const Button = {
			render: () => html`
				<button type="button">
					<emuos-panel>
						<span slot="panel-content">
							<slot name="button-text">Button</slot>
						</span>
					</emuos-panel>
				</button>
			`.style(style)
		};

		define('emuos-button', Button);
	});

	$sys.api.fetch('assets/styles/css/components/themes/win9x/titlebar.css', (e, style) => {
		const TitleBar = {
			render: () => html`
				<slot name="titlebar-content">Title</slot>
			`.style(style)
		};

		define('emuos-titlebar', TitleBar);
	});

	$sys.api.fetch('assets/styles/css/components/themes/win9x/window.css', (e, style) => {
		const Window = {
			render: () => html`
				<emuos-panel>
					<div slot="panel-content">
						<emuos-titlebar>
							<span slot="titlebar-content">
								<span>New clock settings</span>
								<emuos-button id="close" class="disabled">
									<span slot="button-text">x</span>
								</emuos-button>
							</span>
						</emuos-titlebar>
					</div>
				</emuos-panel>
			`.style(style)
		};

		define('emuos-window', Window);
	});

	$sys.api.fetch('assets/styles/css/components/themes/win9x/taskbar.css', (e, style) => {
		const Taskbar = {
			render: () => html`
				<emuos-button id="start">
					<span slot="button-text">Start</span>
				</emuos-button>
				<emuos-button id="a" class="down">
					<span slot="button-text">A</span>
				</emuos-button>
				<emuos-button id="b">
					<span slot="button-text">B</span>
				</emuos-button>
			`.style(style)
		};

		define('emuos-taskbar', Taskbar);
	});

	$sys.api.fetch('assets/styles/css/components/themes/win9x/desktop.css', (e, style) => {
		const Desktop = {
			render: () => html`
				<emuos-window></emuos-window>
				<emuos-taskbar class="bottom"></emuos-taskbar>
			`.style(style)
		};

		define('emuos-desktop', Desktop);
	});
})();