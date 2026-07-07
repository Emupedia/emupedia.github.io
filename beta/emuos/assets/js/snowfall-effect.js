// noinspection ThisExpressionReferencesGlobalObjectJS
(function (global) {
	"use strict";

	var DEFAULT_FLAKE_BASE = "assets/images/effects/snowflakes/flake_";
	var FULL_2D_ROTATION_MAX = 440;
	var MIN_2D_ROTATION = 90;
	var SLIGHT_2D_ROTATION_MAX = 240;
	var SHAKE_PERIOD = 3;
	var SHAKE_AMPLITUDE = 80;
	var SAMPLE_INTERVAL = 0.3;
	var KEYFRAME_CACHE_LIMIT = 512;
	var keyframeCache = {};
	var keyframeCacheKeys = [];
	var flakePreloadPromise = null;

	function random(min, max) {
		return min + Math.random() * (max - min);
	}

	function getSpeedMultiplier(speed) {
		return 50 / speed;
	}

	function shouldSpin3d(spinRate) {
		return Math.random() * 100 < spinRate;
	}

	function randomSignedDegrees(minAbs, maxAbs) {
		var sign = Math.random() < 0.5 ? -1 : 1;

		return sign * Math.round(random(minAbs, maxAbs));
	}

	function randomFallRotate2d(spin3d) {
		if (spin3d) {
			return randomSignedDegrees(180, FULL_2D_ROTATION_MAX);
		}

		return randomSignedDegrees(MIN_2D_ROTATION, SLIGHT_2D_ROTATION_MAX);
	}

	function getFlakeSrc(flakeBase, flakeIndex) {
		return flakeBase + flakeIndex + ".png";
	}

	function preloadFlakeImages(flakeBase) {
		if (flakePreloadPromise) {
			return flakePreloadPromise;
		}

		flakePreloadPromise = Promise.all([1, 2, 3, 4, 5].map(function (flakeIndex) {
			return new Promise(function (resolve) {
				var image = new Image();

				image.decoding = "async";
				image.onload = image.onerror = function () {
					resolve();
				};
				image.src = getFlakeSrc(flakeBase, flakeIndex);
			});
		}));

		return flakePreloadPromise;
	}

	function applyFlakeSrc(image, flakeBase, flakeIndex) {
		var src = getFlakeSrc(flakeBase, flakeIndex);
		var indexKey = String(flakeIndex);

		if (image.dataset.flakeIndex !== indexKey) {
			image.dataset.flakeIndex = indexKey;
			image.src = src;
		}
	}

	function mergeOptions(options) {
		options = options || {};

		return {
			count: options.count != null ? options.count : 100,
			speed: options.speed != null ? options.speed : 25,
			spinRate: options.spinRate != null ? options.spinRate : 15,
			loop: options.loop !== false,
			fixed: options.fixed === true,
			flakeBase: options.flakeBase || DEFAULT_FLAKE_BASE
		};
	}

	function createFlakeElement() {
		var flake = document.createElement("div");
		var image = document.createElement("img");

		flake.className = "snowfall-flake";
		image.alt = "";
		image.decoding = "async";
		image.draggable = false;
		flake.appendChild(image);

		return flake;
	}

	function bucketMotion(duration, rotateEnd, shakeOffset, leftPercent) {
		return {
			duration: Math.round(duration * 4) / 4,
			rotateEnd: Math.round(rotateEnd / 15) * 15,
			shakeOffset: Math.round(shakeOffset * 4) / 4,
			leftPercent: Math.round(leftPercent / 5) * 5
		};
	}

	function setSpinState(flake, spin3d, image) {
		if (spin3d) {
			flake.classList.add("has-spin");
			image.style.animationDelay = random(0, 2).toFixed(2) + "s";
			image.style.animationPlayState = "running";
		} else {
			flake.classList.remove("has-spin");
			image.style.animationDelay = "";
			image.style.animation = "";
		}
	}

	function smoothstep(value) {
		return value * value * (3 - 2 * value);
	}

	function shakeX(elapsedSec) {
		var phase = elapsedSec % SHAKE_PERIOD;

		if (phase < 0) {
			phase += SHAKE_PERIOD;
		}

		var half = SHAKE_PERIOD * 0.5;

		if (phase <= half) {
			return SHAKE_AMPLITUDE * smoothstep(phase / half);
		}

		return SHAKE_AMPLITUDE * (1 - smoothstep((phase - half) / half));
	}

	function normalizeFlake(flake) {
		if (!flake || !isSnowfallFlake(flake)) {
			return createFlakeElement();
		}

		if (!flake.querySelector("img")) {
			return createFlakeElement();
		}

		return flake;
	}

	function getFallKeyframes(duration, rotateEnd, shakeOffset, leftPercent) {
		var cacheKey = duration.toFixed(2) + "|" + rotateEnd + "|" +
			shakeOffset.toFixed(2) + "|" + leftPercent;

		if (keyframeCache[cacheKey]) {
			return keyframeCache[cacheKey];
		}

		var keyframes = [];
		var steps = Math.max(4, Math.ceil(duration / SAMPLE_INTERVAL));
		var i;

		for (i = 0; i <= steps; i++) {
			var t = i / steps;
			var elapsed = t * duration + shakeOffset;
			var x = shakeX(elapsed);
			var yVh = (t * 130).toFixed(2);
			var rotate = (rotateEnd * t).toFixed(2);

			keyframes.push({
				offset: t,
				transform: "translate3d(calc(" + leftPercent + "vw + " + x.toFixed(2) +
					"px), " + yVh + "vh, 0) rotate(" + rotate + "deg)"
			});
		}

		keyframeCache[cacheKey] = keyframes;
		keyframeCacheKeys.push(cacheKey);

		if (keyframeCacheKeys.length > KEYFRAME_CACHE_LIMIT) {
			delete keyframeCache[keyframeCacheKeys.shift()];
		}

		return keyframes;
	}

	function configureFlake(flake, spin3d, speed, delay, flakeBase) {
		var image = flake.querySelector("img");

		if (!image) {
			return null;
		}

		var duration = random(4, 7) * getSpeedMultiplier(speed);
		var left = random(0, 100);
		var rotateEnd = randomFallRotate2d(spin3d);
		var shakeOffset = random(0, 3);
		var flakeIndex = 1 + Math.floor(Math.random() * 5);
		var size = random(12, 38);
		var opacity = random(0.5, 1.3);
		var motion = bucketMotion(duration, rotateEnd, shakeOffset, left);

		if (delay == null) {
			delay = 0;
		}

		flake.className = "snowfall-flake";
		flake.style.left = "0";
		flake.style.transform = "";

		setSpinState(flake, spin3d, image);
		applyFlakeSrc(image, flakeBase, flakeIndex);
		image.style.opacity = opacity.toFixed(5);
		image.style.width = size.toFixed(4) + "px";
		image.style.height = size.toFixed(4) + "px";

		return {
			duration: motion.duration,
			delay: Math.max(0, delay),
			rotateEnd: motion.rotateEnd,
			shakeOffset: motion.shakeOffset,
			leftPercent: motion.leftPercent
		};
	}

	function startFlakeAnimation(flake, config, onFinish) {
		if (flake._snowfallAnimation) {
			flake._snowfallAnimation.cancel();
			flake._snowfallAnimation = null;
		}

		flake._snowfallAnimation = flake.animate(
			getFallKeyframes(
				config.duration,
				config.rotateEnd,
				config.shakeOffset,
				config.leftPercent
			),
			{
				duration: config.duration * 1000,
				delay: config.delay * 1000,
				fill: "forwards",
				easing: "linear"
			}
		);

		flake._snowfallAnimation.onfinish = function () {
			onFinish(flake);
		};
	}

	function pauseFlake(flake) {
		if (flake._snowfallAnimation && flake._snowfallAnimation.playState === "running") {
			flake._snowfallAnimation.pause();
		}

		var image = flake.querySelector("img");

		if (image && flake.classList.contains("has-spin")) {
			image.style.animationPlayState = "paused";
		}
	}

	function resumeFlake(flake) {
		if (flake._snowfallAnimation && flake._snowfallAnimation.playState === "paused") {
			flake._snowfallAnimation.play();
		}

		var image = flake.querySelector("img");

		if (image && flake.classList.contains("has-spin")) {
			image.style.animationPlayState = "running";
		}
	}

	function stopFlakeAnimation(flake) {
		if (flake._snowfallAnimation) {
			flake._snowfallAnimation.cancel();
			flake._snowfallAnimation = null;
		}

		flake.classList.remove("has-spin");

		var image = flake.querySelector("img");

		if (image) {
			image.style.animationDelay = "";
			image.style.animation = "";
		}
	}

	function isSnowfallFlake(element) {
		return element.classList.contains("snowfall-flake");
	}

	function SnowfallEffect(root, options) {
		this.root = root;
		this.options = mergeOptions(options);
		this.container = null;
		this.activeFlakes = [];
		this.flakePool = [];
		this.running = false;
		this.onFlakeFinish = this.onFlakeFinish.bind(this);
		this.onVisibilityChange = this.onVisibilityChange.bind(this);
		document.addEventListener("visibilitychange", this.onVisibilityChange);
	}

	SnowfallEffect.prototype.ensureContainer = function () {
		if (this.container) {
			this.container.className = "snowfall-container" +
				(this.options.fixed ? " is-fixed" : "");
			return this.container;
		}

		var container = document.createElement("div");
		container.className = "snowfall-container";
		container.setAttribute("aria-hidden", "true");

		if (this.options.fixed) {
			container.classList.add("is-fixed");
		}

		this.root.appendChild(container);
		this.container = container;
		return container;
	};

	SnowfallEffect.prototype.ensureDomPool = function (targetSize) {
		while (this.flakePool.length < targetSize) {
			this.flakePool.push(createFlakeElement());
		}
	};

	SnowfallEffect.prototype.pauseAnimations = function () {
		this.activeFlakes.forEach(function (flake) {
			if (isSnowfallFlake(flake)) {
				pauseFlake(flake);
			}
		});
	};

	SnowfallEffect.prototype.resumeAnimations = function () {
		if (!this.running) {
			return;
		}

		this.activeFlakes.forEach(function (flake) {
			if (isSnowfallFlake(flake)) {
				resumeFlake(flake);
			}
		});
	};

	SnowfallEffect.prototype.onVisibilityChange = function () {
		if (!this.running) {
			return;
		}

		if (document.hidden) {
			this.pauseAnimations();
		} else {
			this.resumeAnimations();
		}
	};

	SnowfallEffect.prototype.clearFlakes = function (discardPool) {
		var poolFlakes = !discardPool;

		this.activeFlakes.slice().forEach(function (flake) {
			stopFlakeAnimation(flake);

			if (flake.parentNode) {
				flake.parentNode.removeChild(flake);
			}

			if (poolFlakes) {
				this.flakePool.push(flake);
			}
		}, this);

		this.activeFlakes = [];

		if (discardPool) {
			this.flakePool = [];
		}
	};

	SnowfallEffect.prototype.recycleFlake = function (flake) {
		stopFlakeAnimation(flake);
		flake.style.transform = "";

		if (flake.parentNode) {
			flake.parentNode.removeChild(flake);
		}

		this.flakePool.push(flake);
	};

	SnowfallEffect.prototype.onFlakeFinish = function (flake) {
		if (!this.running) {
			return;
		}

		var index = this.activeFlakes.indexOf(flake);
		if (index !== -1) {
			this.activeFlakes.splice(index, 1);
		}

		this.recycleFlake(flake);

		if (this.options.loop) {
			this.mountFlake(this.spawnFlake(0));
			this.fillPool();
		}
	};

	SnowfallEffect.prototype.spawnFlake = function (delay) {
		var flake = this.flakePool.pop();

		flake = normalizeFlake(flake);

		var spin3d = shouldSpin3d(this.options.spinRate);
		var config = configureFlake(flake, spin3d, this.options.speed, delay, this.options.flakeBase);

		if (!config) {
			flake = createFlakeElement();
			config = configureFlake(flake, spin3d, this.options.speed, delay, this.options.flakeBase);
		}

		this.activeFlakes.push(flake);
		return { flake: flake, config: config };
	};

	SnowfallEffect.prototype.mountFlake = function (entry) {
		this.ensureContainer().appendChild(entry.flake);
		startFlakeAnimation(entry.flake, entry.config, this.onFlakeFinish);
		return entry.flake;
	};

	SnowfallEffect.prototype.fillPool = function () {
		while (this.running && this.options.loop && this.activeFlakes.length < this.options.count) {
			this.ensureDomPool(1);
			this.mountFlake(this.spawnFlake(0));
		}
	};

	SnowfallEffect.prototype.spawnBurst = function () {
		var avgDuration = 5.5 * getSpeedMultiplier(this.options.speed);
		var container = this.ensureContainer();
		var fragment = document.createDocumentFragment();
		var entries = [];
		var i;

		this.ensureDomPool(this.options.count);

		for (i = 0; i < this.options.count; i++) {
			entries.push(this.spawnFlake((i / this.options.count) * avgDuration));
			fragment.appendChild(entries[entries.length - 1].flake);
		}

		container.appendChild(fragment);

		for (i = 0; i < entries.length; i++) {
			startFlakeAnimation(
				entries[i].flake,
				entries[i].config,
				this.onFlakeFinish
			);
		}
	};

	SnowfallEffect.prototype.start = function () {
		if (this.running) {
			return this;
		}

		this.running = true;

		preloadFlakeImages(this.options.flakeBase).then(function () {
			if (this.running) {
				this.spawnBurst();
			}
		}.bind(this));

		return this;
	};

	SnowfallEffect.prototype.stop = function () {
		this.running = false;
		this.clearFlakes();
		return this;
	};

	SnowfallEffect.prototype.restart = function () {
		this.running = false;
		this.clearFlakes();
		this.running = true;

		preloadFlakeImages(this.options.flakeBase).then(function () {
			if (this.running) {
				this.spawnBurst();
			}
		}.bind(this));

		return this;
	};

	SnowfallEffect.prototype.setOptions = function (options) {
		this.options = mergeOptions(Object.assign({}, this.options, options || {}));
		return this;
	};

	SnowfallEffect.prototype.destroy = function () {
		document.removeEventListener("visibilitychange", this.onVisibilityChange);
		this.stop();
		this.flakePool = [];

		if (this.container && this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
		}

		this.container = null;
		return this;
	};

	global.SnowfallEffect = {
		mount: function (root, options) {
			if (!root) {
				throw new Error("SnowfallEffect.mount requires a root element.");
			}

			return new SnowfallEffect(root, options);
		},
		preload: function (flakeBase) {
			return preloadFlakeImages(flakeBase || DEFAULT_FLAKE_BASE);
		}
	};
}(this));
