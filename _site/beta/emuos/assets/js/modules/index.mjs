// noinspection JSFileReferences
import {define, html} from 'https://unpkg.com/hybrids@4.1.5/src/index.js';

const load = async (host, event) => {
	const pageUrl = event.target.getAttribute('page');
	const pageName = (await import(pageUrl)).default;
	host.pageLoaded = `<${pageName}></${pageName}>`;
}

const HybridsApp = {
	appName: 'Welcome to Hybrids!',
	pageLoaded: '<span>No page loaded, yet.</span>',
	page: ({pageLoaded}) => pageLoaded,
	render: ({appName, page}) => html`
			<div>
				<h1>${appName}</h1>

				<p>Example of an unbundled Hybrids app with dynamic imports.</p>

				<div>
					<button onclick="${load}" page="./Welcome.mjs">
						Welcome Page
					</button>
					<button onclick="${load}" page="./Other.mjs">
						Other Page
					</button>
				</div>

				<hr />

				<article innerHTML="${page}"></article>

				<hr />

				<footer>
					<ul>
						<li>
							<a href="https://github.com/f1lt3r/hybrids-dynamic-load/">
								See this code on Github
							</a>
						</li>
						<li>
							<a href="https://f1lt3r.io">Visit my homepage</a>
						</li>
					</ul>
				</footer>
			</div>`
}

define('hybrids-app', HybridsApp);