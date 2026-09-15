const fs					= require('fs-extra');
const replace				= require('replace-in-file');
const packages				= require('../../package.json');
const crypto				= require('crypto');
const logger				= require('debug-logger');

const app_directory			= `${packages.config.www_dir}/`;
const images_directory		= `${packages.config.images_dir}/`;
const fonts_directory		= `${packages.config.fonts_dir}/`;
const scss_directory		= `${packages.config.scss_dir}/`;
const less_directory		= `${packages.config.less_dir}/`;
const css_directory			= `${packages.config.css_dir}/`;
// noinspection JSUnusedLocalSymbols
const pug_directory			= `${packages.config.pug_dir}/`;
const js_directory			= `${packages.config.js_dir}/`;
const config_directory		= `${packages.config.config_dir}/`;
const libraries_directory	= `${packages.config.library_dir}/`;
const polyfills_directory	= `${packages.config.polyfill_dir}/`;
const nodemodules_directory	= `${__dirname}/../../node_modules/`;

// noinspection JSUnusedGlobalSymbols
const copy_options			= {
	overwrite: false,
	preserveTimestamps: true,
	transform: (readStream, writeStream, file) => {
		writeStream.on('open', () => {
			file.mode = process.platform === 'win32' && (file.mode & 146) === 0 ? file.mode | 146 : 664;
			readStream.pipe(writeStream);
		});
	}
};

const copy_options_overwrite = {
	overwrite: true,
	preserveTimestamps: false,
	transform: (readStream, writeStream, file) => {
		writeStream.on('open', () => {
			file.mode = process.platform === 'win32' && (file.mode & 146) === 0 ? file.mode | 146 : 664;
			readStream.pipe(writeStream);
		});
	}
};

//noinspection JSUnresolvedVariable
const dependencies			= typeof packages.dependencies !== 'undefined' ? Object.keys(packages.dependencies) : [];
//noinspection JSUnresolvedVariable
const dev_dependencies		= typeof packages.devDependencies !== 'undefined' ? Object.keys(packages.devDependencies) : [];
//noinspection JSUnresolvedVariable
const napa_dependencies		= typeof packages.napa !== 'undefined' ? Object.keys(packages.napa) : [];

const tag					= 'import-libraries';
//noinspection JSUnresolvedFunction
const log					= logger.config({
	inspectOptions: {
		colors: true
	},
	ensureNewline: true,
	levels: {
		warn: {
			fd: 1
		},
		error: {
			fd: 1
		}
	}
})(tag);

// noinspection ES6ConvertVarToLetConst
let libraries				= {};
let ordered					= {};

function checksum(input) {
	//noinspection JSUnresolvedFunction
	let hash = crypto.createHash('sha384').update(input, 'utf8');
	//noinspection JSUnresolvedFunction
	let hashBase64 = hash.digest('base64');

	return 'sha256-' + hashBase64;
}

//noinspection JSUnusedLocalSymbols
function getChecksum(file) {
	//noinspection JSUnresolvedFunction
	fs.readFile(file, 'utf8', (err, contents) => {
		return checksum(contents);
	});
}

function install(install_directory, dependency, version) {
	switch (dependency) {
		case '@allmarkedup/purl':
		case 'purl':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/purl.js', install_directory + libraries_directory + 'purl-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['purl'] = 'purl-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case '@babel/polyfill':
		case 'babel-polyfill':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/polyfill.min.js', install_directory + polyfills_directory + 'babel-polyfill-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['babel-polyfill'] = 'babel-polyfill-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/polyfill.js', install_directory + polyfills_directory + 'babel-polyfill-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case '@babel/standalone':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/babel.min.js', install_directory + libraries_directory + 'babel-standalone-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['babel-standalone'] = 'babel-standalone-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'babel-standalone-' + version + '.min.js',
						from: '(function(e){"use strict";',
						to: '(function(e){'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/babel.js', install_directory + libraries_directory + 'babel-standalone-' + version + '.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + 'babel-standalone-' + version + '.js',
										from: '(function (exports) { \'use strict\';',
										to: '(function (exports) {'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case '@coreui/coreui':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/js/coreui.min.js', install_directory + libraries_directory + 'coreui-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['@coreui/coreui'] = 'coreui-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/js/coreui.js', install_directory + libraries_directory + 'coreui-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/scss/', install_directory + scss_directory + 'coreui-' + version, copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + scss_directory + 'coreui-' + version + '/coreui.scss',
										from: 'node_modules/bootstrap/scss/bootstrap',
										to: 'bootstrap/bootstrap'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case '@coreui/icons':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/css/coreui-icons.min.css', install_directory + css_directory + 'coreui-icons-' + version + '.min.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/css/coreui-icons.css', install_directory + css_directory + 'coreui-icons-' + version + '.css', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/scss/', install_directory + scss_directory + 'coreui-icons-' + version, copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/fonts/', install_directory + fonts_directory, copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case '@fortawesome/fontawesome-free':
		case 'font-awesome':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/css/all.css', install_directory + css_directory + 'font-awesome-' + version + '.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + css_directory + 'font-awesome-' + version + '.css',
						from: /\.\.\/webfonts\//gi,
						to: '../fonts/'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/all.min.css', install_directory + css_directory + 'font-awesome-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + css_directory + 'font-awesome-' + version + '.min.css',
										from: /\.\.\/webfonts\//gi,
										to: '../fonts/'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/webfonts', install_directory + fonts_directory, copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/scss', install_directory + scss_directory + 'font-awesome-' + version, copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case '@webcomponents/custom-elements':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/custom-elements.min.js', install_directory + polyfills_directory + 'custom-elements-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['custom-elements'] = 'custom-elements-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + polyfills_directory + 'custom-elements-' + version + '.min.js',
						from: '//# sourceMappingURL=custom-elements.min.js.map',
						to: '//# sourceMappingURL=custom-elements-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/custom-elements.min.js.map', install_directory + polyfills_directory + 'custom-elements-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case '@webcomponents/html-imports':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/html-imports.min.js', install_directory + polyfills_directory + 'html-imports-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['html-imports'] = 'html-imports-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + polyfills_directory + 'html-imports-' + version + '.min.js',
						from: '//# sourceMappingURL=html-imports.min.js.map',
						to: '//# sourceMappingURL=html-imports-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/html-imports.min.js.map', install_directory + polyfills_directory + 'html-imports-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case '@webcomponents/webcomponentsjs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/webcomponents-bundle.js', install_directory + polyfills_directory + 'webcomponents-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['webcomponents'] = 'webcomponents-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + polyfills_directory + 'webcomponents-' + version + '.min.js',
						from: '//# sourceMappingURL=webcomponents-bundle.js.map',
						to: '//# sourceMappingURL=webcomponents-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/webcomponents-bundle.js.map', install_directory + polyfills_directory + 'webcomponents-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case 'airview':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.js',
						from: /\$\(img\)\.error\(function\(e\){/gi,
						to: '$(img).on(\'error\', function(e){'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/js/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
										from: /e\(i\)\.error\(function\(e\){/gi,
										to: 'e(i).on(\'error\',function(e){'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/css/' + dependency + '.min.css', install_directory + css_directory + dependency + '-' + version + '.min.css', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + css_directory + dependency + '-' + version + '.min.css',
														from: /@import url\("\.\/vendor\/normalize\.min\.css"\);@import url\("\.\/vendor\/animation\.min\.css"\);/gi,
														to: ''
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															// noinspection JSValidateTypes
															replace({
																files: install_directory + css_directory + dependency + '-' + version + '.min.css',
																from: /realtive/gi,
																to: 'relative'
															}, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			// noinspection JSValidateTypes
																			replace({
																				files: install_directory + css_directory + dependency + '-' + version + '.css',
																				from: /@import url\("\.\/vendor\/normalize\.css"\);/gi,
																				to: ''
																			}, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					// noinspection JSValidateTypes
																					replace({
																						files: install_directory + css_directory + dependency + '-' + version + '.css',
																						from: /@import url\("\.\/vendor\/animation\.css"\);/gi,
																						to: ''
																					}, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							// noinspection JSValidateTypes
																							replace({
																								files: install_directory + css_directory + dependency + '-' + version + '.css',
																								from: /realtive/gi,
																								to: 'relative'
																							}, (error) => {
																								if (error) {
																									log.error('Error occurred:', error);
																								} else {
																									log.log(dependency + ' version ' + version + ' installed!');
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'alameda':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + 'requirejs-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'animate.css':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/animate.min.css', install_directory + css_directory + 'animate-' + version + '.min.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/animate.css', install_directory + css_directory + 'animate-' + version + '.css', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'bootstrap':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.bundle.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: /\.bundle/gi,
						to: '-' + version
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.bundle.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.bundle.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + dependency + '-' + version + '.js',
												from: /\.bundle/gi,
												to: '-' + version
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.bundle.js.map', install_directory + libraries_directory + dependency + '-' + version + '.js.map', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															// noinspection JSValidateTypes
															replace({
																files: install_directory + libraries_directory + dependency + '-' + version + '.js.map',
																from: /\.bundle/gi,
																to: '-' + version
															}, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.min.css', install_directory + css_directory + dependency + '-' + version + '.min.css', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			// noinspection JSValidateTypes
																			replace({
																				files: install_directory + css_directory + dependency + '-' + version + '.min.css',
																				from: '/*# sourceMappingURL=bootstrap.min.css.map */',
																				to: '/*# sourceMappingURL=bootstrap-' + version + '.min.css.map */'
																			}, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					// noinspection JSValidateTypes
																					replace({
																						files: install_directory + css_directory + dependency + '-' + version + '.min.css',
																						from: 'button{border-radius:0}',
																						to: ''
																					}, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							//noinspection JSUnresolvedFunction
																							fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.min.css.map', install_directory + css_directory + dependency + '-' + version + '.min.css.map', copy_options, (error) => {
																								if (error) {
																									log.error('Error occurred:', error);
																								} else {
																									//noinspection JSUnresolvedFunction
																									fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
																										if (error) {
																											log.error('Error occurred:', error);
																										} else {
																											// noinspection JSValidateTypes
																											replace({
																												files: install_directory + css_directory + dependency + '-' + version + '.css',
																												from: '/*# sourceMappingURL=bootstrap.css.map */',
																												to: '/*# sourceMappingURL=bootstrap-' + version + '.css.map */'
																											}, (error) => {
																												if (error) {
																													log.error('Error occurred:', error);
																												} else {
																													// noinspection JSValidateTypes
																													replace({
																														files: install_directory + css_directory + dependency + '-' + version + '.css',
																														from: 'button {\n  border-radius: 0;\n}',
																														to: ''
																													}, (error) => {
																														if (error) {
																															log.error('Error occurred:', error);
																														} else {
																															//noinspection JSUnresolvedFunction
																															fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css.map', install_directory + css_directory + dependency + '-' + version + '.css.map', copy_options, (error) => {
																																if (error) {
																																	log.error('Error occurred:', error);
																																} else {
																																	//noinspection JSUnresolvedFunction
																																	fs.copy(nodemodules_directory + dependency + '/scss/', install_directory + scss_directory + dependency + '-' + version, copy_options, (error) => {
																																		if (error) {
																																			log.error('Error occurred:', error);
																																		} else {
																																			log.log(dependency + ' version ' + version + ' installed!');
																																		}
																																	});
																																}
																															});
																														}
																													});
																												}
																											});
																										}
																									});
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'bootstrap-less-port':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/less/', install_directory + less_directory + 'bootstrap-4.4.1', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'bootstrap-checkbox':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'bootstrap-colorpicker':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.min.css', install_directory + css_directory + dependency + '-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + css_directory + dependency + '-' + version + '.min.css',
										from: /\/img\/bootstrap-colorpicker\//gi,
										to: '/images/colorpicker/'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.min.css.map', install_directory + css_directory + dependency + '-' + version + '.min.css.map', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															// noinspection JSValidateTypes
															replace({
																files: install_directory + css_directory + dependency + '-' + version + '.css',
																from: /\/img\/bootstrap-colorpicker\//gi,
																to: '/images/colorpicker/'
															}, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css.map', install_directory + css_directory + dependency + '-' + version + '.css.map', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/src/sass/_colorpicker.scss', install_directory + scss_directory + '_colorpicker.scss', copy_options, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					//noinspection JSUnresolvedFunction
																					fs.copy(nodemodules_directory + dependency + '/dist/img/' + dependency, install_directory + images_directory + 'colorpicker', copy_options, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							log.log(dependency + ' version ' + version + ' installed!');
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'bootstrap-fileinput':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/fileinput.min.js', install_directory + libraries_directory + 'bootstrap-fileinput-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/fileinput.js', install_directory + libraries_directory + 'bootstrap-fileinput-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/fileinput.min.css', install_directory + css_directory + 'bootstrap-fileinput-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/fileinput.css', install_directory + css_directory + 'bootstrap-fileinput-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'bootstrap-slider':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + 'bootstrap-slider-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + 'bootstrap-slider-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.min.css', install_directory + css_directory + 'bootstrap-slider-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css', install_directory + css_directory + 'bootstrap-slider-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'bourbon':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/app/assets/stylesheets/', install_directory + scss_directory + dependency, copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'browserfs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=' + dependency + '.min.js.map',
						to: '//# sourceMappingURL=' + dependency + '-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
								from: /["|']use strict["|'];?/g,
								to: ''
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + libraries_directory + dependency + '-' + version + '.js',
														from: '//# sourceMappingURL=' + dependency + '.js.map',
														to: '//# sourceMappingURL=' + dependency + '-' + version + '.js.map'
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															// noinspection JSValidateTypes
															replace({
																files: install_directory + libraries_directory + dependency + '-' + version + '.js',
																from: /["|']use strict["|'];?/g,
																to: ''
															}, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js.map', install_directory + libraries_directory + dependency + '-' + version + '.js.map', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			log.log(dependency + ' version ' + version + ' installed!');
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'buzz':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: /\["catch"]\(function\(\){}\)/g,
						to: ''
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + dependency + '-' + version + '.js',
										from: /\.catch\(function\(\) {}\)/g,
										to: ''
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'bson':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.browser.umd.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version;
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.js',
						from: '//# sourceMappingURL=bson.js.map',
						to: '//# sourceMappingURL='+ dependency + '-' + version + '.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + libraries_directory + dependency + '-' + version + '.js',
								from: /exports\.default = BSON;\n/gi,
								to: 'exports.default = BSON; window.BSON = BSON;\n'
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.browser.umd.js.map', install_directory + libraries_directory + dependency + '-' + version + '.js.map', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + dependency + '-' + version + '.js.map',
												from: '"file":"bson.browser.umd.js"',
												to: '"file":"'+ dependency + '-' + version + '.js.map"'
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													log.log(dependency + ' version ' + version + ' installed!');
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'chart.js':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/Chart.min.js', install_directory + libraries_directory + 'chart-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/Chart.js', install_directory + libraries_directory + 'chart-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'clmtrackr':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/js/face_deformer.js', install_directory + libraries_directory + 'face_deformer.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/models', install_directory + libraries_directory + 'models', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'clippyjs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/clippy.js', install_directory + libraries_directory + 'clippy-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['clippy'] = 'clippy-' + version;
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'clippy-' + version + '.js',
						from: '//# sourceMappingURL=clippy.js.map',
						to: '//# sourceMappingURL=clippy-' + version + '.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/clippy.js.map', install_directory + libraries_directory + 'clippy-' + version + '.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case 'compass-mixins':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/lib/', install_directory + scss_directory + dependency + '-' + version, copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'custom-event-polyfill':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/polyfill.js', install_directory + polyfills_directory + 'custom-event-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['custom-event'] = 'custom-event-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'datatables.net':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/jquery.dataTables.min.js', install_directory + libraries_directory + 'datatables-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables'] = 'datatables-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/jquery.dataTables.js', install_directory + libraries_directory + 'datatables-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'datatables.net-plugins':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dataRender/ellipsis.js', install_directory + libraries_directory + 'datatables-ellipsis-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-ellipsis'] = 'datatables-ellipsis-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'datatables.net-bs4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.bootstrap4.min.js', install_directory + libraries_directory + 'datatables-bootstrap4-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-bootstrap4'] = 'datatables-bootstrap4-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.bootstrap4.js', install_directory + libraries_directory + 'datatables-bootstrap4-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/dataTables.bootstrap4.min.css', install_directory + css_directory + 'datatables-bootstrap4-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/dataTables.bootstrap4.css', install_directory + css_directory + 'datatables-bootstrap4-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-bs5':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.bootstrap5.min.js', install_directory + libraries_directory + 'datatables-bootstrap5-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-bootstrap5'] = 'datatables-bootstrap5-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.bootstrap5.js', install_directory + libraries_directory + 'datatables-bootstrap5-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/dataTables.bootstrap5.min.css', install_directory + css_directory + 'datatables-bootstrap5-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/dataTables.bootstrap5.css', install_directory + css_directory + 'datatables-bootstrap5-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-alteditor-updated':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/src/dataTables.altEditor.free.min.js', install_directory + libraries_directory + 'datatables-editor-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-editor'] = 'datatables-editor-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/src/dataTables.altEditor.free.js', install_directory + libraries_directory + 'datatables-editor-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'datatables.net-buttons':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.buttons.min.js', install_directory + libraries_directory + 'datatables-buttons-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-buttons'] = 'datatables-buttons-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.buttons.js', install_directory + libraries_directory + 'datatables-buttons-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							libraries['datatables-buttons-colvis'] = 'datatables-buttons-colvis-' + version + '.min';
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/js/buttons.colVis.min.js', install_directory + libraries_directory + 'datatables-buttons-colvis-' + version + '.min.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/js/buttons.colVis.js', install_directory + libraries_directory + 'datatables-buttons-colvis-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											libraries['datatables-buttons-flash'] = 'datatables-buttons-flash-' + version + '.min';
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/js/buttons.flash.min.js', install_directory + libraries_directory + 'datatables-buttons-flash-' + version + '.min.js', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/js/buttons.flash.js', install_directory + libraries_directory + 'datatables-buttons-flash-' + version + '.js', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															libraries['datatables-buttons-html5'] = 'datatables-buttons-html5-' + version + '.min';
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/js/buttons.html5.min.js', install_directory + libraries_directory + 'datatables-buttons-html5-' + version + '.min.js', copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/js/buttons.html5.js', install_directory + libraries_directory + 'datatables-buttons-html5-' + version + '.js', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			libraries['datatables-buttons-print'] = 'datatables-buttons-print-' + version + '.min';
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/js/buttons.print.min.js', install_directory + libraries_directory + 'datatables-buttons-print-' + version + '.min.js', copy_options, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					//noinspection JSUnresolvedFunction
																					fs.copy(nodemodules_directory + dependency + '/js/buttons.print.js', install_directory + libraries_directory + 'datatables-buttons-print-' + version + '.js', copy_options, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							log.log(dependency + ' version ' + version + ' installed!');
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-buttons-bs4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/buttons.bootstrap4.min.js', install_directory + libraries_directory + 'datatables-buttons-bootstrap4-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-buttons-bootstrap4'] = 'datatables-buttons-bootstrap4-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/buttons.bootstrap4.js', install_directory + libraries_directory + 'datatables-buttons-bootstrap4-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/buttons.bootstrap4.min.css', install_directory + css_directory + 'datatables-buttons-bootstrap4-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/buttons.bootstrap4.css', install_directory + css_directory + 'datatables-buttons-bootstrap4-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-buttons-bs5':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/buttons.bootstrap5.min.js', install_directory + libraries_directory + 'datatables-buttons-bootstrap5-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-buttons-bootstrap5'] = 'datatables-buttons-bootstrap5-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/buttons.bootstrap5.js', install_directory + libraries_directory + 'datatables-buttons-bootstrap5-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/buttons.bootstrap5.min.css', install_directory + css_directory + 'datatables-buttons-bootstrap5-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/buttons.bootstrap5.css', install_directory + css_directory + 'datatables-buttons-bootstrap5-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-colreorder':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.colReorder.min.js', install_directory + libraries_directory + 'datatables-colreorder-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-colreorder'] = 'datatables-colreorder-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.colReorder.js', install_directory + libraries_directory + 'datatables-colreorder-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'datatables.net-colreorder-bs4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/colReorder.bootstrap4.min.js', install_directory + libraries_directory + 'datatables-colreorder-bootstrap4-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-colreorder-bootstrap4'] = 'datatables-colreorder-bootstrap4-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/colReorder.bootstrap4.js', install_directory + libraries_directory + 'datatables-colreorder-bootstrap4-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/colReorder.bootstrap4.min.css', install_directory + css_directory + 'datatables-colreorder-bootstrap4-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/colReorder.bootstrap4.css', install_directory + css_directory + 'datatables-colreorder-bootstrap4-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-colreorder-bs5':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/colReorder.bootstrap5.min.js', install_directory + libraries_directory + 'datatables-colreorder-bootstrap5-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-colreorder-bootstrap5'] = 'datatables-colreorder-bootstrap5-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/colReorder.bootstrap5.js', install_directory + libraries_directory + 'datatables-colreorder-bootstrap5-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/colReorder.bootstrap5.min.css', install_directory + css_directory + 'datatables-colreorder-bootstrap5-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/colReorder.bootstrap5.css', install_directory + css_directory + 'datatables-colreorder-bootstrap5-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-fixedcolumns':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.fixedColumns.min.js', install_directory + libraries_directory + 'datatables-fixedcolumns-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-fixedcolumns'] = 'datatables-fixedcolumns-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.fixedColumns.js', install_directory + libraries_directory + 'datatables-fixedcolumns-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'datatables.net-fixedcolumns-bs4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/fixedColumns.bootstrap4.min.js', install_directory + libraries_directory + 'datatables-fixedcolumns-bootstrap4-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-fixedcolumns-bootstrap4'] = 'datatables-fixedcolumns-bootstrap4-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/fixedColumns.bootstrap4.js', install_directory + libraries_directory + 'datatables-fixedcolumns-bootstrap4-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/fixedColumns.bootstrap4.min.css', install_directory + css_directory + 'datatables-fixedcolumns-bootstrap4-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/fixedColumns.bootstrap4.css', install_directory + css_directory + 'datatables-fixedcolumns-bootstrap4-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-fixedcolumns-bs5':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/fixedColumns.bootstrap5.min.js', install_directory + libraries_directory + 'datatables-fixedcolumns-bootstrap5-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-fixedcolumns-bootstrap5'] = 'datatables-fixedcolumns-bootstrap5-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/fixedColumns.bootstrap5.js', install_directory + libraries_directory + 'datatables-fixedcolumns-bootstrap5-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/fixedColumns.bootstrap5.min.css', install_directory + css_directory + 'datatables-fixedcolumns-bootstrap5-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/fixedColumns.bootstrap5.css', install_directory + css_directory + 'datatables-fixedcolumns-bootstrap5-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-fixedheader':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.fixedHeader.min.js', install_directory + libraries_directory + 'datatables-fixedheader-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-fixedheader'] = 'datatables-fixedheader-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.fixedHeader.js', install_directory + libraries_directory + 'datatables-fixedheader-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'datatables.net-fixedheader-bs4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/fixedHeader.bootstrap4.min.js', install_directory + libraries_directory + 'datatables-fixedheader-bootstrap4-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-fixedheader-bootstrap4'] = 'datatables-fixedheader-bootstrap4-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/fixedHeader.bootstrap4.js', install_directory + libraries_directory + 'datatables-fixedheader-bootstrap4-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/fixedHeader.bootstrap4.min.css', install_directory + css_directory + 'datatables-fixedheader-bootstrap4-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/fixedHeader.bootstrap4.css', install_directory + css_directory + 'datatables-fixedheader-bootstrap4-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-fixedheader-bs5':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/fixedHeader.bootstrap5.min.js', install_directory + libraries_directory + 'datatables-fixedheader-bootstrap5-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-fixedheader-bootstrap5'] = 'datatables-fixedheader-bootstrap5-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/fixedHeader.bootstrap5.js', install_directory + libraries_directory + 'datatables-fixedheader-bootstrap5-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/fixedHeader.bootstrap5.min.css', install_directory + css_directory + 'datatables-fixedheader-bootstrap5-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/fixedHeader.bootstrap5.css', install_directory + css_directory + 'datatables-fixedheader-bootstrap5-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-responsive':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.responsive.min.js', install_directory + libraries_directory + 'datatables-responsive-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-responsive'] = 'datatables-responsive-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.responsive.js', install_directory + libraries_directory + 'datatables-responsive-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'datatables.net-responsive-bs4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/responsive.bootstrap4.min.js', install_directory + libraries_directory + 'datatables-responsive-bootstrap4-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-responsive-bootstrap4'] = 'datatables-responsive-bootstrap4-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/responsive.bootstrap4.js', install_directory + libraries_directory + 'datatables-responsive-bootstrap4-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/responsive.bootstrap4.min.css', install_directory + css_directory + 'datatables-responsive-bootstrap4-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/responsive.bootstrap4.css', install_directory + css_directory + 'datatables-responsive-bootstrap4-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-responsive-bs5':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/responsive.bootstrap5.min.js', install_directory + libraries_directory + 'datatables-responsive-bootstrap5-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-responsive-bootstrap5'] = 'datatables-responsive-bootstrap5-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/responsive.bootstrap5.js', install_directory + libraries_directory + 'datatables-responsive-bootstrap5-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/responsive.bootstrap5.min.css', install_directory + css_directory + 'datatables-responsive-bootstrap5-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/responsive.bootstrap5.css', install_directory + css_directory + 'datatables-responsive-bootstrap5-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-select':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/dataTables.select.min.js', install_directory + libraries_directory + 'datatables-select-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-select'] = 'datatables-select-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/dataTables.select.js', install_directory + libraries_directory + 'datatables-select-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'datatables.net-select-bs4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/select.bootstrap4.min.js', install_directory + libraries_directory + 'datatables-select-bootstrap4-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-select-bootstrap4'] = 'datatables-select-bootstrap4-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/select.bootstrap4.js', install_directory + libraries_directory + 'datatables-select-bootstrap4-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/select.bootstrap4.min.css', install_directory + css_directory + 'datatables-select-bootstrap4-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/select.bootstrap4.css', install_directory + css_directory + 'datatables-select-bootstrap4-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'datatables.net-select-bs5':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/js/select.bootstrap5.min.js', install_directory + libraries_directory + 'datatables-select-bootstrap5-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['datatables-select-bootstrap5'] = 'datatables-select-bootstrap5-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/select.bootstrap5.js', install_directory + libraries_directory + 'datatables-select-bootstrap5-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/select.bootstrap5.min.css', install_directory + css_directory + 'datatables-select-bootstrap5-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/select.bootstrap5.css', install_directory + css_directory + 'datatables-select-bootstrap5-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'dropbox':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-sdk.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: /["|']use strict["|'];?/g,
						to: ''
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-sdk.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + dependency + '-' + version + '.js',
										from: /["|']use strict["|'];?/g,
										to: ''
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-sdk.js.map', install_directory + libraries_directory + dependency + '-' + version + '.js.map', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + libraries_directory + dependency + '-' + version + '.js.map',
														from: '"file":"Dropbox-sdk.js"',
														to: '"file":"' + dependency + '-' + version + '.js"'
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'emularity':
			// TODO
			libraries[dependency] = dependency + '-' + version;
			break;
		case 'es6-promise':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.auto.min.js', install_directory + polyfills_directory + 'promise-auto-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['promise-auto'] = 'promise-auto-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.auto.min.map', install_directory + polyfills_directory + 'promise-auto-' + version + '.min.js.map', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + polyfills_directory + 'promise-auto-' + version + '.min.js.map',
								from: '"file":"es6-promise.auto.min.js"}',
								to: '"file":"' + 'promise-auto-' + version + '.min.js"}'
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.auto.js', install_directory + polyfills_directory + 'promise-auto-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.auto.map', install_directory + polyfills_directory + 'promise-auto-' + version + '.js.map', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + polyfills_directory + 'promise-auto-' + version + '.js.map',
														from: '"file":"es6-promise.auto.js"}',
														to: '"file":"' + 'promise-auto-' + version + '.js"}'
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + polyfills_directory + 'promise-' + version + '.min.js', copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	libraries['promise'] = 'promise-' + version + '.min';
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.map', install_directory + polyfills_directory + 'promise-' + version + '.min.js.map', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			// noinspection JSValidateTypes
																			replace({
																				files: install_directory + polyfills_directory + 'promise-' + version + '.min.js.map',
																				from: '"file":"es6-promise.min.js"}',
																				to: '"file":"' + 'promise-' + version + '.min.js"}'
																			}, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					//noinspection JSUnresolvedFunction
																					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + polyfills_directory + 'promise-' + version + '.js', copy_options, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							//noinspection JSUnresolvedFunction
																							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.map', install_directory + polyfills_directory + 'promise-' + version + '.js.map', copy_options, (error) => {
																								if (error) {
																									log.error('Error occurred:', error);
																								} else {
																									// noinspection JSValidateTypes
																									replace({
																										files: install_directory + polyfills_directory + 'promise-' + version + '.js.map',
																										from: '"file":"es6-promise.js"}',
																										to: '"file":"' + 'promise-' + version + '.js"}'
																									}, (error) => {
																										if (error) {
																											log.error('Error occurred:', error);
																										} else {
																											log.log(dependency + ' version ' + version + ' installed!');
																										}
																									});
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'fastclick':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/lib/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'file-saver':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/FileSaver.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/FileSaver.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
								from: '//# sourceMappingURL=FileSaver.min.js.map',
								to: '//# sourceMappingURL=' + dependency + '-' + version + '.min.js.map'
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/FileSaver.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'fingerprintjs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/fingerprint.js', install_directory + libraries_directory + 'fingerprint-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['fingerprint'] = 'fingerprint-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case '@fingerprintjs/fingerprintjs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/fp.umd.min.js', install_directory + libraries_directory + 'fingerprint-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					fs.copy(nodemodules_directory + dependency + '/dist/fp.umd.js', install_directory + libraries_directory + 'fingerprint-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							libraries['fingerprint'] = 'fingerprint-' + version;
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'firebug-lite-ie':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/build/firebug-lite-debug.js', install_directory + libraries_directory + 'firebug-lite-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['firebug-lite'] = 'firebug-lite-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'FlowType.JS':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/flowtype.js', install_directory + libraries_directory + 'flowtype-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'flag-icon-css':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/css/flag-icon.min.css', install_directory + css_directory + 'flag-icon-' + version + '.min.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + css_directory + 'flag-icon-' + version + '.min.css',
						from: /\.\.\/fonts\//gi,
						to: '../images/fonts/'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/flag-icon.css', install_directory + css_directory + 'flag-icon-' + version + '.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + css_directory + 'flag-icon-' + version + '.css',
										from: /\.\.\/fonts\//gi,
										to: '../images/fonts/'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/flags', install_directory + images_directory + 'flags', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/sass', install_directory + scss_directory + 'flag-icon-' + version, copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'gifshot':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'hammerjs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/hammer.min.js', install_directory + libraries_directory + 'hammer-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'hammer-timejs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/hammer-time.min.js', install_directory + libraries_directory + 'hammer-time-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'hjson':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/bundle/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/bundle/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + libraries_directory + dependency + '-' + version + '.js',
								from: 'keepComments ? comments = (',
								to: 'keepComments ? ('
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case 'html2canvas':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'howler':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency +  '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency +  '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.core.min.js', install_directory + libraries_directory + dependency + '-core-' + version + '.min.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									libraries[dependency + '-core'] = dependency + '-core-' + version + '.min';
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.spatial.min.js', install_directory + libraries_directory + dependency + '-spatial-' + version + '.min.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											libraries[dependency + '-spatial'] = dependency + '-spatial-' + version + '.min';
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'hybrids':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=hybrids.js.map',
						to: '//# sourceMappingURL=hybrids-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case 'i18next':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/umd/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/umd/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'ie11-custom-properties':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/ie11CustomProperties.js', install_directory + libraries_directory + 'css-vars-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'css-vars-' + version + '.js',
						from: ["'use strict';", "return value.replace(/ /g,'␣');", /function decodeValue(\w|\(|\)|{|;|=|\.|\/|␣|,|'|\[|]|\s)*}/, /\b(let|const)\s+/gi],
						to: ['', '', "function decodeValue(value){return value;}", 'var ']
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							libraries[dependency] = 'css-vars-' + version;
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'inobounce':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'jquery':
		case 'jquery-1.x':
		case 'jquery-2.x':
		case 'jquery-3.x':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/jquery.min.js', install_directory + libraries_directory + 'jquery-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = 'jquery-' + version + '.min';

					if (dependency === 'jquery-3.x') {
						libraries['jquery'] = 'jquery-' + version + '.min';
					}

					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'jquery-' + version + '.min.js',
						from: '//# sourceMappingURL=' + 'jquery-' + version + '.map',
						to: ''
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.appendFile(install_directory + libraries_directory + 'jquery-' + version + '.min.js', '//# sourceMappingURL=' + 'jquery-' + version + '.map', (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/jquery.min.map', install_directory + libraries_directory + 'jquery-' + version + '.map', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + 'jquery-' + version + '.map',
												from: 'jquery.js',
												to: 'jquery-' + version + '.js'
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + libraries_directory + 'jquery-' + version + '.map',
														from: 'jquery.min.js',
														to: 'jquery-' + version + '.min.js'
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/dist/jquery.js', install_directory + libraries_directory + 'jquery-' + version + '.js', copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	log.log(dependency + ' version ' + version + ' installed!');
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'jquery.ajax-retry':
		case 'jquery.ajax-retry-secured':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/jquery.ajax-retry.min.js', install_directory + libraries_directory + 'jquery-ajax-retry-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['jquery-ajax-retry'] = 'jquery-ajax-retry-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/jquery.ajax-retry.js', install_directory + libraries_directory + 'jquery-ajax-retry-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'jquery.hotkeys':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + 'jquery-hotkeys-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'jquery.panzoom':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + 'jquery-panzoom-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'jquery-form':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/jquery.form.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=jquery.form.min.js.map',
						to: ''
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/jquery.form.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + dependency + '-' + version + '.map',
										from: '../src/jquery.form.js',
										to: dependency + '-' + version + '.js'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + dependency + '-' + version + '.map',
												from: 'jquery.form.min.js',
												to: dependency + '-' + version + '.min.js'
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/src/jquery.form.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'jquery-hammerjs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/jquery.hammer.js', install_directory + libraries_directory + 'jquery-hammer-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'jquery-i18next':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/umd/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/umd/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'jquery-knob':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + 'jquery.knob.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/js/' + 'jquery.knob.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'jquery-migrate':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case 'jquery-mousewheel':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/jquery.mousewheel.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'jquery-resizable-dom':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/jquery-resizable.min.js', install_directory + libraries_directory + 'jquery-resizable-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['jquery-resizable'] = 'jquery-resizable-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'jquery-resizable-' + version + '.min.js',
						from: '//# sourceMappingURL=jquery-resizable.min.js.map',
						to: '//# sourceMappingURL=jquery-resizable-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/jquery-resizable.min.js.map', install_directory + libraries_directory + 'jquery-resizable-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + 'jquery-resizable-' + version + '.min.js.map',
										from: /jquery-resizable\.min\.js/g,
										to: 'jquery-resizable-' + version + '.min.js'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/dist/jquery-resizable.js', install_directory + libraries_directory + 'jquery-resizable-' + version + '.js', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													log.log(dependency + ' version ' + version + ' installed!');
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'jquery-ui':
		case 'jquery-ui-dist':
		case 'jquery-ui-1.11.x':
		case 'jquery-ui-1.12.x':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/jquery-ui.min.js', install_directory + libraries_directory + 'jquery-ui-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = 'jquery-ui-' + version + '.min';

					if (dependency === 'jquery-ui-1.12.x') {
						libraries['jquery-ui'] = 'jquery-ui-' + version + '.min';
					}

					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/jquery-ui.js', install_directory + libraries_directory + 'jquery-ui-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/jquery-ui.min.css', install_directory + css_directory + 'jquery-ui-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + css_directory + 'jquery-ui-' + version + '.min.css',
										from: /url\("images\//gi,
										to: 'url("../../../images/libraries/jquery-ui-' + version + '/base/'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/jquery-ui.css', install_directory + css_directory + 'jquery-ui-' + version + '.css', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + css_directory + 'jquery-ui-' + version + '.css',
														from: /url\("images\//gi,
														to: 'url("../../../images/libraries/jquery-ui-' + version + '/base/'
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/jquery-ui.structure.min.css', install_directory + css_directory + 'jquery-ui.structure-' + version + '.min.css', copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/jquery-ui.structure.css', install_directory + css_directory + 'jquery-ui.structure-' + version + '.css', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/jquery-ui.theme.min.css', install_directory + css_directory + 'jquery-ui.theme-' + version + '.min.css', copy_options, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					// noinspection JSValidateTypes
																					replace({
																						files: install_directory + css_directory + 'jquery-ui.theme-' + version + '.min.css',
																						from: /url\("images\//gi,
																						to: 'url("../../../images/libraries/jquery-ui-' + version + '/base/'
																					}, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							//noinspection JSUnresolvedFunction
																							fs.copy(nodemodules_directory + dependency + '/jquery-ui.theme.css', install_directory + css_directory + 'jquery-ui.theme-' + version + '.css', copy_options, (error) => {
																								if (error) {
																									log.error('Error occurred:', error);
																								} else {
																									// noinspection JSValidateTypes
																									replace({
																										files: install_directory + css_directory + 'jquery-ui.theme-' + version + '.css',
																										from: /url\("images\//gi,
																										to: 'url("../../../images/libraries/jquery-ui-' + version + '/base/'
																									}, (error) => {
																										if (error) {
																											log.error('Error occurred:', error);
																										} else {
																											//noinspection JSUnresolvedFunction
																											fs.copy(nodemodules_directory + dependency + '/images/', install_directory + images_directory + 'libraries/jquery-ui-' + version + '/base', copy_options, (error) => {
																												if (error) {
																													log.error('Error occurred:', error);
																												} else {
																													log.log(dependency + ' version ' + version + ' installed!');
																												}
																											});
																										}
																									});
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'js-cookie':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/src/js.cookie.js', install_directory + libraries_directory + 'js-cookie-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'js-dos':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=js-dos.js.map',
						to: '//# sourceMappingURL=js-dos-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
								from: 'this.instantiateWasm=t,this',
								to: 'this.instantiateWasm=t,e = e || window.WDOSBOX,this'
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
											//noinspection JSUnresolvedFunction
											/*fs.copy(nodemodules_directory + dependency + '/dist/wdosbox.js', install_directory + 'vfat/apps/dosbox/js/wdosbox.js', copy_options_overwrite, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/dist/wdosbox.wasm.js', install_directory + 'vfat/apps/dosbox/js/wdosbox.wasm.js', copy_options_overwrite, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/dist/wdosbox-emterp.js', install_directory + 'vfat/apps/dosbox/js/wdosbox-emterp.js', copy_options_overwrite, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/dist/wdosbox-emterp.wasm.js', install_directory + 'vfat/apps/dosbox/js/wdosbox-emterp.wasm.js', copy_options_overwrite, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/dist/wdosbox-nosync.js', install_directory + 'vfat/apps/dosbox/js/wdosbox-nosync.js', copy_options_overwrite, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					//noinspection JSUnresolvedFunction
																					fs.copy(nodemodules_directory + dependency + '/dist/wdosbox-nosync.wasm.js', install_directory + 'vfat/apps/dosbox/js/wdosbox-nosync.wasm.js', copy_options_overwrite, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							//noinspection JSUnresolvedFunction
																							fs.copy(nodemodules_directory + dependency + '/dist/dosbox.js', install_directory + 'vfat/apps/dosbox/js/dosbox.js', copy_options_overwrite, (error) => {
																								if (error) {
																									log.error('Error occurred:', error);
																								} else {
																									//noinspection JSUnresolvedFunction
																									fs.copy(nodemodules_directory + dependency + '/dist/dosbox-emterp.js', install_directory + 'vfat/apps/dosbox/js/dosbox-emterp.js', copy_options_overwrite, (error) => {
																										if (error) {
																											log.error('Error occurred:', error);
																										} else {
																											//noinspection JSUnresolvedFunction
																											fs.copy(nodemodules_directory + dependency + '/dist/dosbox-nosync.js', install_directory + 'vfat/apps/dosbox/js/dosbox-nosync.js', copy_options_overwrite, (error) => {
																												if (error) {
																													log.error('Error occurred:', error);
																												} else {
																													log.log(dependency + ' version ' + version + ' installed!');
																												}
																											});
																										}
																									});
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});*/
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'jsonpath':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'jsrsasign':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/lib/jsrsasign-all-min.js', install_directory + libraries_directory + 'jsrsasign-all-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['jsrsasign-all'] = 'jsrsasign-all-' + version + '.min';
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'jszip':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/jszip.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/jszip.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'lato-font':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/css/' + dependency + '.min.css', install_directory + css_directory + 'font-lato-' + version + '.min.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + css_directory + 'font-lato-' + version + '.min.css',
						from: /\.\.\/fonts\//gi,
						to: '../fonts/'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/' + dependency + '.css', install_directory + css_directory + 'font-lato-' + version + '.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + css_directory + 'font-lato-' + version + '.css',
										from: /\.\.\/fonts\//gi,
										to: '../fonts/'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/fonts', install_directory + fonts_directory, copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/scss', install_directory + scss_directory + 'font-lato-' + version, copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'less':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case 'lightgallery':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/modules/lg-autoplay.min.js', install_directory + libraries_directory + dependency + '-autoplay-' + version + '.min.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									libraries[dependency + '-autoplay'] = dependency + '-autoplay-' + version + '.min';
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/modules/lg-autoplay.js', install_directory + libraries_directory + dependency + '-autoplay-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/modules/lg-fullscreen.min.js', install_directory + libraries_directory + dependency + '-fullscreen-' + version + '.min.js', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													libraries[dependency + '-fullscreen'] = dependency + '-fullscreen-' + version + '.min';
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/modules/lg-fullscreen.js', install_directory + libraries_directory + dependency + '-fullscreen-' + version + '.js', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/modules/lg-hash.min.js', install_directory + libraries_directory + dependency + '-hash-' + version + '.min.js', copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	libraries[dependency + '-hash'] = dependency + '-hash-' + version + '.min';
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/modules/lg-hash.js', install_directory + libraries_directory + dependency + '-hash-' + version + '.js', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/modules/lg-pager.min.js', install_directory + libraries_directory + dependency + '-pager-' + version + '.min.js', copy_options, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					libraries[dependency + '-pager'] = dependency + '-pager-' + version + '.min';
																					//noinspection JSUnresolvedFunction
																					fs.copy(nodemodules_directory + dependency + '/modules/lg-pager.js', install_directory + libraries_directory + dependency + '-pager-' + version + '.js', copy_options, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							//noinspection JSUnresolvedFunction
																							fs.copy(nodemodules_directory + dependency + '/modules/lg-share.min.js', install_directory + libraries_directory + dependency + '-share-' + version + '.min.js', copy_options, (error) => {
																								if (error) {
																									log.error('Error occurred:', error);
																								} else {
																									libraries[dependency + '-share'] = dependency + '-share-' + version + '.min';
																									//noinspection JSUnresolvedFunction
																									fs.copy(nodemodules_directory + dependency + '/modules/lg-share.js', install_directory + libraries_directory + dependency + '-share-' + version + '.js', copy_options, (error) => {
																										if (error) {
																											log.error('Error occurred:', error);
																										} else {
																											//noinspection JSUnresolvedFunction
																											fs.copy(nodemodules_directory + dependency + '/modules/lg-thumbnail.min.js', install_directory + libraries_directory + dependency + '-thumbnail-' + version + '.min.js', copy_options, (error) => {
																												if (error) {
																													log.error('Error occurred:', error);
																												} else {
																													libraries[dependency + '-thumbnail'] = dependency + '-thumbnail-' + version + '.min';
																													//noinspection JSUnresolvedFunction
																													fs.copy(nodemodules_directory + dependency + '/modules/lg-thumbnail.js', install_directory + libraries_directory + dependency + '-thumbnail-' + version + '.js', copy_options, (error) => {
																														if (error) {
																															log.error('Error occurred:', error);
																														} else {
																															//noinspection JSUnresolvedFunction
																															fs.copy(nodemodules_directory + dependency + '/modules/lg-video.min.js', install_directory + libraries_directory + dependency + '-video-' + version + '.min.js', copy_options, (error) => {
																																if (error) {
																																	log.error('Error occurred:', error);
																																} else {
																																	libraries[dependency + '-video'] = dependency + '-video-' + version + '.min';
																																	//noinspection JSUnresolvedFunction
																																	fs.copy(nodemodules_directory + dependency + '/modules/lg-video.js', install_directory + libraries_directory + dependency + '-video-' + version + '.js', copy_options, (error) => {
																																		if (error) {
																																			log.error('Error occurred:', error);
																																		} else {
																																			//noinspection JSUnresolvedFunction
																																			fs.copy(nodemodules_directory + dependency + '/modules/lg-zoom.min.js', install_directory + libraries_directory + dependency + '-zoom-' + version + '.min.js', copy_options, (error) => {
																																				if (error) {
																																					log.error('Error occurred:', error);
																																				} else {
																																					libraries[dependency + '-zoom'] = dependency + '-zoom-' + version + '.min';
																																					//noinspection JSUnresolvedFunction
																																					fs.copy(nodemodules_directory + dependency + '/modules/lg-zoom.js', install_directory + libraries_directory + dependency + '-zoom-' + version + '.js', copy_options, (error) => {
																																						if (error) {
																																							log.error('Error occurred:', error);
																																						} else {
																																							//noinspection JSUnresolvedFunction
																																							fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.min.css', install_directory + css_directory + dependency + '-' + version + '.min.css', copy_options, (error) => {
																																								if (error) {
																																									log.error('Error occurred:', error);
																																								} else {
																																									//noinspection JSUnresolvedFunction
																																									fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
																																										if (error) {
																																											log.error('Error occurred:', error);
																																										} else {
																																											//noinspection JSUnresolvedFunction
																																											fs.copy(nodemodules_directory + dependency + '/dist/css/lg-transitions.min.css', install_directory + css_directory + dependency + '-transitions-' + version + '.min.css', copy_options, (error) => {
																																												if (error) {
																																													log.error('Error occurred:', error);
																																												} else {
																																													//noinspection JSUnresolvedFunction
																																													fs.copy(nodemodules_directory + dependency + '/dist/css/lg-transitions.css', install_directory + css_directory + dependency + '-transitions-' + version + '.css', copy_options, (error) => {
																																														if (error) {
																																															log.error('Error occurred:', error);
																																														} else {
																																															//noinspection JSUnresolvedFunction
																																															fs.copy(nodemodules_directory + dependency + '/dist/css/lg-fb-comment-box.min.css', install_directory + css_directory + dependency + '-fb-comment-box-' + version + '.min.css', copy_options, (error) => {
																																																if (error) {
																																																	log.error('Error occurred:', error);
																																																} else {
																																																	//noinspection JSUnresolvedFunction
																																																	fs.copy(nodemodules_directory + dependency + '/dist/css/lg-fb-comment-box.css', install_directory + css_directory + dependency + '-fb-comment-box-' + version + '.css', copy_options, (error) => {
																																																		if (error) {
																																																			log.error('Error occurred:', error);
																																																		} else {
																																																			//noinspection JSUnresolvedFunction
																																																			fs.copy(nodemodules_directory + dependency + '/src/sass/', install_directory + scss_directory + dependency + '-' + version, copy_options, (error) => {
																																																				if (error) {
																																																					log.error('Error occurred:', error);
																																																				} else {
																																																					//noinspection JSUnresolvedFunction
																																																					fs.copy(nodemodules_directory + dependency + '/src/fonts/', install_directory + fonts_directory, copy_options, (error) => {
																																																						if (error) {
																																																							log.error('Error occurred:', error);
																																																						} else {
																																																							log.log(dependency + ' version ' + version + ' installed!');
																																																						}
																																																					});
																																																				}
																																																			});
																																																		}
																																																	});
																																																}
																																															});
																																														}
																																													});
																																												}
																																											});
																																										}
																																									});
																																								}
																																							});
																																						}
																																					});
																																				}
																																			});
																																		}
																																	});
																																}
																															});
																														}
																													});
																												}
																											});
																										}
																									});
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'lightslider':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + css_directory + dependency + '-' + version + '.css',
										from: /\.\.\/img\//gi,
										to: '../../images/libraries/' + dependency + '-' + version + '/'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/dist/img/', install_directory + images_directory + 'libraries/' + dependency + '-' + version, copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													log.log(dependency + ' version ' + version + ' installed!');
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'localforage':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.nopromises.min.js', install_directory + libraries_directory + dependency + '-nopromise-' + version + '.min.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									libraries[dependency + '-nopromise'] = dependency + '-nopromise-' + version + '.min';
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.nopromises.js', install_directory + libraries_directory + dependency + '-nopromise-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'malihu-custom-scrollbar-plugin':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/jquery.mCustomScrollbar.concat.min.js', install_directory + libraries_directory + 'jquery-customscrollbar-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['jquery-custom-scrollbar'] = 'jquery-customscrollbar-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/jquery.mCustomScrollbar.js', install_directory + libraries_directory + 'jquery-customscrollbar-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/jquery.mCustomScrollbar.css', install_directory + css_directory + 'jquery-customscrollbar-' + version + '.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + css_directory + 'jquery-customscrollbar-' + version + '.css',
										from: 'mCSB_buttons.png',
										to: '../../../images/libraries/jquery-customscrollbar-' + version + '/mCSB_buttons.png'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/mCSB_buttons.png', install_directory + images_directory + 'libraries/jquery-customscrollbar-' + version + '/mCSB_buttons.png', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													log.log(dependency + ' version ' + version + ' installed!');
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'mithril':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=' + dependency + '.min.js.map',
						to: '//# sourceMappingURL=' + dependency + '-' + version + '.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/' + dependency + '.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + dependency + '-' + version + '.map',
										from: '"sources":["' + dependency + '.js"]',
										to: '"sources":["' + dependency + '-' + version + '.js"]'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + dependency + '-' + version + '.map',
												from: '"file":"' + dependency + '.min.js"',
												to: '"file":"' + dependency + '-' + version + '.min.js"'
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															// noinspection JSValidateTypes
															replace({
																files: install_directory + 'index.html',
																from: dependency + '.js',
																to: dependency + '-' + version + '.min.js'
															}, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	log.log(dependency + ' version ' + version + ' installed!');
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'mithril-n':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/n.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'moment':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/min/' + dependency + '-with-locales.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=moment-with-locales.min.js.map',
						to: '//# sourceMappingURL=' + dependency + '-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/min/' + dependency + '-with-locales.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/min/' + dependency + '-with-locales.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'moment-holiday':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '-pkg.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'moment-timezone':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/builds/' + dependency + '-with-data-2012-2022.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/builds/' + dependency + '-with-data-2012-2022.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'monaco-editor':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/min/vs', install_directory + libraries_directory +  dependency + '-' + version, copy_options_overwrite, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'nosleep.js':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/NoSleep.min.js', install_directory + libraries_directory + 'nosleep-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = 'nosleep-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/NoSleep.js', install_directory + libraries_directory + 'nosleep-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'normalize.css':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency, install_directory + css_directory + 'normalize-' + version + '.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'octokat':
			// TODO: find npm package and implement it
			libraries[dependency] = dependency + '-' + version;
			break;
		case 'open-sans-fontface':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/open-sans.css', install_directory + css_directory + 'font-open-sans-' + version + '.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + css_directory + 'font-open-sans-' + version + '.css',
						from: /\.\/fonts\/\w+\//gi,
						to: '../fonts/'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/fonts/Bold', install_directory + fonts_directory, copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/fonts/BoldItalic', install_directory + fonts_directory, copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/fonts/ExtraBold', install_directory + fonts_directory, copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/fonts/ExtraBoldItalic', install_directory + fonts_directory, copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/fonts/Italic', install_directory + fonts_directory, copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/fonts/Light', install_directory + fonts_directory, copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/fonts/LightItalic', install_directory + fonts_directory, copy_options, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					//noinspection JSUnresolvedFunction
																					fs.copy(nodemodules_directory + dependency + '/fonts/Regular', install_directory + fonts_directory, copy_options, (error) => {
																						if (error) {
																							log.error('Error occurred:', error);
																						} else {
																							//noinspection JSUnresolvedFunction
																							fs.copy(nodemodules_directory + dependency + '/fonts/Semibold', install_directory + fonts_directory, copy_options, (error) => {
																								if (error) {
																									log.error('Error occurred:', error);
																								} else {
																									//noinspection JSUnresolvedFunction
																									fs.copy(nodemodules_directory + dependency + '/fonts/SemiboldItalic', install_directory + fonts_directory, copy_options, (error) => {
																										if (error) {
																											log.error('Error occurred:', error);
																										} else {
																											//noinspection JSUnresolvedFunction
																											fs.copy(nodemodules_directory + dependency + '/sass', install_directory + scss_directory + 'font-open-sans-' + version, copy_options, (error) => {
																												if (error) {
																													log.error('Error occurred:', error);
																												} else {
																													log.log(dependency + ' version ' + version + ' installed!');
																												}
																											});
																										}
																									});
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'overthrow':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'pace-progress':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/pace.min.js', install_directory + libraries_directory + 'pace-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/pace.js', install_directory + libraries_directory + 'pace-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'pdfmake':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=pdfmake.min.js.map',
						to: '//# sourceMappingURL=pdfmake-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
								from: /["|']use strict["|'];?/g,
								to: ''
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.min.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + libraries_directory + dependency + '-' + version + '.js',
														from: '//# sourceMappingURL=pdfmake.js.map',
														to: '//# sourceMappingURL=pdfmake-' + version + '.js.map'
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															// noinspection JSValidateTypes
															replace({
																files: install_directory + libraries_directory + dependency + '-' + version + '.js',
																from: /["|']use strict["|'];?/g,
																to: ''
															}, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	//noinspection JSUnresolvedFunction
																	fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.js.map', install_directory + libraries_directory + dependency + '-' + version + '.js.map', copy_options, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/build/vfs_fonts.js', install_directory + libraries_directory + dependency + '-fonts-' + version + '.js', copy_options, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					libraries[dependency + '-fonts'] = dependency + '-fonts-' + version;
																					log.log(dependency + ' version ' + version + ' installed!');
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'pepjs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/pep.js', install_directory + polyfills_directory + 'pointer-events-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// noinspection JSValidateTypes
					replace({
						files: install_directory + polyfills_directory + 'pointer-events-' + version + '.js',
						from: /const /g,
						to: 'var '
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'perfect-scrollbar':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									log.log(dependency + ' version ' + version + ' installed!');
								}
							});
						}
					});
				}
			});
			break;
		case 'phaser':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-arcade-physics.min.js', install_directory + libraries_directory + dependency + '-arcade-physics-' + version + '.min.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									libraries[dependency + '-arcade-physics'] = dependency + '-arcade-physics-' + version + '.min';
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-arcade-physics.js', install_directory + libraries_directory + dependency + '-arcade-physics-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'popper.js':
		case '@popperjs/core':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/umd/popper.min.js', install_directory + libraries_directory + 'popper-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['popper'] = 'popper-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'popper-' + version + '.min.js',
						from: '//# sourceMappingURL=popper.min.js.map',
						to: '//# sourceMappingURL=popper-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/umd/popper.min.js.map', install_directory + libraries_directory + 'popper-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/umd/popper.js', install_directory + libraries_directory + 'popper-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + 'popper-' + version + '.js',
												from: '//# sourceMappingURL=popper.js.map',
												to: '//# sourceMappingURL=popper-' + version + '.js.map'
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/dist/umd/popper.js.map', install_directory + libraries_directory + 'popper-' + version + '.js.map', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'pre-loader':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'pretty-file-icons':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/svg/', install_directory + images_directory + 'files', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/require.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs-plugins':
		case 'requirejs-plugins-current':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/src/json.js', install_directory + libraries_directory + 'requirejs-json-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['requirejs-json'] = 'requirejs-json-' + version;
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/src/noext.js', install_directory + libraries_directory + 'requirejs-noext-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							libraries['requirejs-noext'] = 'requirejs-noext-' + version;
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'requirejs-text':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/text.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'requirejs-babel-plugin':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/es6.js', install_directory + libraries_directory + 'requirejs-es6-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'seedrandom':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'select2':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.full.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/js/' + dependency + '.full.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.min.css', install_directory + css_directory + dependency + '-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'select2-bootstrap4-theme':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/select2-bootstrap4.min.css', install_directory + css_directory + 'select2-bootstrap4-' + version + '.min.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/select2-bootstrap4.css', install_directory + css_directory + 'select2-bootstrap4-' + version + '.css', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'simple-line-icons':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/scss/', install_directory + scss_directory + dependency + '-' + version, copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							if (error) {
								log.error('Error occurred:', error);
							} else {
								//noinspection JSUnresolvedFunction
								fs.copy(nodemodules_directory + dependency + '/fonts/', install_directory + fonts_directory, copy_options, (error) => {
									if (error) {
										log.error('Error occurred:', error);
									} else {
										log.log(dependency + ' version ' + version + ' installed!');
									}
								});
							}
						}
					});
				}
			});
			break;
		case 'simplestorage.js':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/simplestorage.min.js', install_directory + libraries_directory + 'simplestorage-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['simplestorage'] = 'simplestorage-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/simplestorage.js', install_directory + libraries_directory + 'simplestorage-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'slick-carousel':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/slick/slick.min.js', install_directory + libraries_directory + 'slick-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/slick/slick.js', install_directory + libraries_directory + 'slick-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'socket.io-client':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/socket.io.slim.js', install_directory + libraries_directory + 'socket.io-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					// libraries['socket.io'] = 'socket.io-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'socket.io-' + version + '.min.js',
						from: '//# sourceMappingURL=socket.io.slim.js.map',
						to: '//# sourceMappingURL=socket.io-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/socket.io.slim.js.map', install_directory + libraries_directory + 'socket.io-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/socket.io.slim.dev.js', install_directory + libraries_directory + 'socket.io-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + 'socket.io-' + version + '.js',
												from: '//# sourceMappingURL=socket.io.slim.dev.js.map',
												to: '//# sourceMappingURL=socket.io-' + version + '.js.map'
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/dist/socket.io.slim.dev.js.map', install_directory + libraries_directory + 'socket.io-' + version + '.js.map', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'summernote':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-bs4.min.js', install_directory + libraries_directory + dependency + '-bs4-' + version + '.min.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-bs4.js', install_directory + libraries_directory + dependency + '-bs4-' + version + '.js', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + css_directory + dependency + '-' + version + '.css',
														from: /"\.\/font\//gi,
														to: '"../fonts/'
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '-bs4.css', install_directory + css_directory + dependency + '-bs4-' + version + '.css', copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	// noinspection JSValidateTypes
																	replace({
																		files: install_directory + css_directory + dependency + '-bs4-' + version + '.css',
																		from: /"\.\/font\//gi,
																		to: '"../fonts/'
																	}, (error) => {
																		if (error) {
																			log.error('Error occurred:', error);
																		} else {
																			//noinspection JSUnresolvedFunction
																			fs.copy(nodemodules_directory + dependency + '/dist/font/', install_directory + fonts_directory, copy_options, (error) => {
																				if (error) {
																					log.error('Error occurred:', error);
																				} else {
																					log.log(dependency + ' version ' + version + ' installed!');
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'tempusdominus-bootstrap-4':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/build/js/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/build/js/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/build/css/' + dependency + '.min.css', install_directory + css_directory + dependency + '-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/build/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/src/sass/', install_directory + scss_directory + dependency + '-' + version, copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													log.log(dependency + ' version ' + version + ' installed!');
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'toastr':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.min.css', install_directory + css_directory + dependency + '-' + version + '.min.css', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/build/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'twemoji':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.min.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'ui-contextmenu':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/jquery.ui-contextmenu.min.js', install_directory + libraries_directory + 'jquery-ui-contextmenu-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['jquery-ui-contextmenu'] = 'jquery-ui-contextmenu-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'jquery-ui-contextmenu-' + version + '.min.js',
						from: ',"jquery-ui/ui/widgets/menu"',
						to: ''
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/jquery.ui-contextmenu.js', install_directory + libraries_directory + 'jquery-ui-contextmenu-' + version + '.js', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + 'jquery-ui-contextmenu-' + version + '.js',
										from: ', "jquery-ui/ui/widgets/menu"',
										to: ''
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											//noinspection JSUnresolvedFunction
											fs.copy(nodemodules_directory + dependency + '/jquery.ui-contextmenu.min.js.map', install_directory + libraries_directory + 'jquery-ui-contextmenu-' + version + '.min.js.map', copy_options, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													// noinspection JSValidateTypes
													replace({
														files: install_directory + libraries_directory + 'jquery-ui-contextmenu-' + version + '.min.js.map',
														from: 'jquery.ui-contextmenu',
														to: 'jquery-ui-contextmenu-' + version
													}, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															log.log(dependency + ' version ' + version + ' installed!');
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'vanilla-lazyload':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/lazyload.min.js', install_directory + libraries_directory + 'lazyload-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					//noinspection JSUnresolvedFunction
					fs.copy(nodemodules_directory + dependency + '/dist/lazyload.js', install_directory + libraries_directory + 'lazyload-' + version + '.js', copy_options, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							log.log(dependency + ' version ' + version + ' installed!');
						}
					});
				}
			});
			break;
		case 'whatwg-fetch':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/fetch.umd.js', install_directory + polyfills_directory + 'fetch-' + version + '.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['fetch'] = 'fetch-' + version;
					log.log(dependency + ' version ' + version + ' installed!');
				}
			});
			break;
		case 'web-esheep':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/dist/esheep.min.js', install_directory + libraries_directory + 'esheep-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries['esheep'] = 'esheep-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + 'esheep-' + version + '.min.js',
						from: 'https://adrianotiger.github.io/desktopPet/Pets/esheep64/animations.xml',
						to: config_directory + 'esheep-animations-' + version + '.xml'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							// noinspection JSValidateTypes
							replace({
								files: install_directory + libraries_directory + 'esheep-' + version + '.min.js',
								from: 'https://adrianotiger.github.io/desktopPet/Pets/pets.json',
								to: config_directory + 'esheep-pets-' + version + '.json'
							}, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									// noinspection JSValidateTypes
									replace({
										files: install_directory + libraries_directory + 'esheep-' + version + '.min.js',
										from: 'z-index:2000;',
										to: 'z-index:20000;'
									}, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											// noinspection JSValidateTypes
											replace({
												files: install_directory + libraries_directory + 'esheep-' + version + '.min.js',
												from: 'console.log(json);',
												to: ''
											}, (error) => {
												if (error) {
													log.error('Error occurred:', error);
												} else {
													//noinspection JSUnresolvedFunction
													fs.copy(nodemodules_directory + dependency + '/pets/pets.json', install_directory + config_directory + 'esheep-pets-' + version + '.json', copy_options, (error) => {
														if (error) {
															log.error('Error occurred:', error);
														} else {
															//noinspection JSUnresolvedFunction
															fs.copy(nodemodules_directory + dependency + '/src/animation.xml', install_directory + config_directory + 'esheep-animations-' + version + '.xml', copy_options, (error) => {
																if (error) {
																	log.error('Error occurred:', error);
																} else {
																	log.log(dependency + ' version ' + version + ' installed!');
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
			break;
		case 'xterm':
			//noinspection JSUnresolvedFunction
			fs.copy(nodemodules_directory + dependency + '/lib/' + dependency + '.js', install_directory + libraries_directory + dependency + '-' + version + '.min.js', copy_options, (error) => {
				if (error) {
					log.error('Error occurred:', error);
				} else {
					libraries[dependency] = dependency + '-' + version + '.min';
					// noinspection JSValidateTypes
					replace({
						files: install_directory + libraries_directory + dependency + '-' + version + '.min.js',
						from: '//# sourceMappingURL=xterm.js.map',
						to: '//# sourceMappingURL=xterm-' + version + '.min.js.map'
					}, (error) => {
						if (error) {
							log.error('Error occurred:', error);
						} else {
							//noinspection JSUnresolvedFunction
							fs.copy(nodemodules_directory + dependency + '/lib/' + dependency + '.js.map', install_directory + libraries_directory + dependency + '-' + version + '.min.js.map', copy_options, (error) => {
								if (error) {
									log.error('Error occurred:', error);
								} else {
									//noinspection JSUnresolvedFunction
									fs.copy(nodemodules_directory + dependency + '/css/' + dependency + '.css', install_directory + css_directory + dependency + '-' + version + '.css', copy_options, (error) => {
										if (error) {
											log.error('Error occurred:', error);
										} else {
											log.log(dependency + ' version ' + version + ' installed!');
										}
									});
								}
							});
						}
					});
				}
			});
			break;
	}
}

log.trace('');
log.trace('Importing dependencies');
log.trace('');

for (let i = 0; i < dependencies.length; i++) {
	install(app_directory, dependencies[i], require(nodemodules_directory + dependencies[i] + '/package.json').version);

	if (i === dependencies.length - 1) {
		setTimeout(() => {
			log.trace('');
			log.trace('Importing dev dependencies');
			log.trace('');

			for (let j = 0; j < dev_dependencies.length; j++) {
				install(app_directory, dev_dependencies[j], require(nodemodules_directory + dev_dependencies[j] + '/package.json').version);

				if (j === dev_dependencies.length - 1) {
					setTimeout(() => {
						const paths = [
							'',
							'/beta/emuos/',
							'//$location$/beta/emuos/'
						]

						libraries['emularity'] = 'emularity';

						Object.keys(libraries).sort().forEach(key => {
							ordered[key] = paths.map(path => path === '' ? path + libraries_directory.replace('assets/js/', '') + libraries[key] : path + libraries_directory + libraries[key]);
						});

						libraries = ordered;

						libraries['desktop'] = 'desktop';
						libraries['emoticons'] = 'emoticons';
						libraries['emuos'] = 'emuos';
						libraries['router'] = 'router';
						libraries['filesystem'] = 'filesystem';
						libraries['lang-en'] = 'lang-en';
						// libraries['network'] = 'network';
						libraries['taskbar'] = 'taskbar';
						libraries['window'] = 'window';
						// libraries['socket'] = 'socket';

						Object.keys(libraries).forEach(key => {
							if (!Array.isArray(libraries[key])) {
								libraries[key] = paths.map(path => (path !== '' ? path + 'assets/js/' : path) + libraries[key]);
							}
						});

						libraries['socket'] = '//ws.$location$/server/app/u_socket_es5';
						libraries['network'] = '//ws.$location$/server/app/network_iframe';
						libraries['ga'] = '//www.google-analytics.com/analytics';

						// noinspection JSUnresolvedFunction
						fs.writeFile(app_directory + js_directory + 'libraries.js',
`// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {
	if (typeof global['$sys'] === 'undefined') {
		global['$sys'] = {};
	}

	var location = ~window.location.hostname.indexOf('emupedia.net') ? 'emupedia.net' : (~window.location.hostname.indexOf('emupedia.org') ? 'emupedia.org' : (~window.location.hostname.indexOf('emuos.net') ? 'emuos.net' : (~window.location.hostname.indexOf('emuos.org') ? 'emuos.org' : 'emupedia.net')))

	// region Libraries

	global['$sys']['lib'] = ${JSON.stringify(libraries, null, 4).split('"').join("'").split('    ').join('\t').replaceAll('$location$', "' + location + '")};

	// endregion
}(this));`, function (error) {
							if (error) {
								log.error('Error occurred:', error);
							} else {
								log.log(app_directory + js_directory + 'libraries.js written!');
							}
						});

						log.trace('');
						log.trace('Importing external dependencies');
						log.trace('');

						for (let k = 0; k < napa_dependencies.length; k++) {
							install(app_directory, napa_dependencies[k], require(nodemodules_directory + napa_dependencies[k] + '/package.json').version);
						}
					}, 500);
				}
			}
		}, 500);
	}
}