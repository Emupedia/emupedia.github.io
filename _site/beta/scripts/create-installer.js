const {createWindowsInstaller}	= require('electron-winstaller');
const packages					= require('../../package.json');

getInstallerConfig().then(createWindowsInstaller).catch((error) => {
	console.error(error.message || error);
	process.exit(1)
});

function getInstallerConfig () {
	console.log('Creating Windows Installer');

	const root = `${__dirname}/..`;

	// noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
	return Promise.resolve({
		title: packages.description,
		appDirectory: `${root}/${packages.config.build_dir}/${packages.config.out_dir}`,
		authors: packages.author.name,
		noMsi: true,
		outputDirectory: `${root}/${packages.config.build_dir}`,
		exe: `${packages.productName}.exe`,
		setupExe: `${packages.productName}-${packages.version}-setup.exe`,
		setupIcon: `${root}/${packages.config.www_dir}/favicon.ico`,
		iconUrl: 'https://emupedia.net/favicon.ico',
		loadingGif: `${root}/${packages.config.www_dir}/images/loading.gif`
	})
}