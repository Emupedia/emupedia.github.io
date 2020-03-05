// noinspection JSFileReferences
import {define, html} from 'https://unpkg.com/hybrids@4.1.5/src/index.js';

const name = 'welcome-page';

define(name, {
	render: () => html`
		<div>
			<h2>Welcome Page</h2>
			<p>This Welcome page was dynamically loaded.</p>
		</div>`
});

export default name;