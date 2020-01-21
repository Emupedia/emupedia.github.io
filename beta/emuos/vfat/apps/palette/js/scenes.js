var scenes = [
	{
		name: 'CORAL',
		title: 'Aquarius - Day',
		sound: 'CORAL',
		maxVolume: 0.25
	},
	{
		monthIdx: 7,
		month: 'AugustClear',
		scpt: 'augclrscpt',
		name: 'CORAL',
		title: 'Aquarius - August - Clear',
		sound: 'CORAL',
		maxVolume: 0.25,
		remap: {
			0: [0,0,0]
		}
	},
	{
		name: 'V01',
		title: 'Island Fires - Dusk',
		sound: 'V29',
		maxVolumd: 0.25
	},
	{
		name: 'V02',
		title: 'Mountain Fortress - Dusk',
		sound: 'V02',
		maxVolume: 1.0
	},
	{
		name: 'V03',
		title: 'Swamp Cathedral - Day',
		sound: 'V03'
	},
	{
		name: 'V04',
		title: 'Highland Ruins - Rain',
		sound: 'V04'
	},
	{
		name: 'V05AM',
		title: 'Haunted Castle Ruins - Morning',
		sound: 'V03'
	},
	{
		name: 'V05PM',
		title: 'Haunted Castle Ruins - Evening',
		sound: 'V03'
	},
	{
		name: 'V05HAUNT',
		title: 'Haunted Castle Ruins - Night',
		sound: 'V05HAUNT'
	},
	{
		name: 'V05RAIN',
		title: 'Haunted Castle Ruins - Rain',
		sound: 'V05RAIN'
	},
	{
		monthIdx: 9,
		month: 'EarlyOctoberClear',
		scpt: 'octbegclrscpt',
		name: 'V05AM',
		title: 'Haunted Ruins - Early October - Clear',
		sound: 'V13',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		month: 'LateOctoberClear',
		scpt: 'octendclrscpt',
		name: 'V05AM',
		title: 'Haunted Ruins - Late October - Clear',
		sound: 'V13',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		month: 'LateOctober',
		scpt: 'octrainscpt',
		name: 'V05RAIN',
		title: 'Haunted Ruins - Late October - Rain',
		sound: 'V05RAIN',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		name: 'V07',
		title: 'Rough Seas - Day',
		sound: 'V07',
		maxVolume: 0.25
	},
	{
		name: 'V08AM',
		title: 'Jungle Waterfall - Morning',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V08',
		title: 'Jungle Waterfall - Afternoon',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V08RAIN',
		title: 'Jungle Waterfall - Rain',
		sound: 'V08RAIN'
	},
	{
		name: 'V08PM',
		title: 'Jungle Waterfall - Night',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		monthIdx: 4,
		month: 'MayClear',
		scpt: 'MAYCLRSCPT',
		name: 'V08',
		title: 'Jungle Waterfall - May - Clear',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: 'MayCloudy',
		scpt: 'MAYCLDYSCPT',
		name: 'V08',
		title: 'Jungle Waterfall - May - Cloudy',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: 'May',
		scpt: 'MAYRAINSCPT',
		name: 'V08RAIN',
		title: 'Jungle Waterfall - May - Rain',
		sound: 'V08RAIN'
	},
	{
		name: 'V09',
		title: 'Forest Edge - Day',
		sound: 'V09',
		maxVolume: 1.0
	},
	{
		name: 'V10',
		title: 'Deep Swamp - Day',
		sound: 'V10'
	},
	{
		name: 'V11AM',
		title: 'Approaching Storm - Dawn',
		// sound: 'V02',
		sound: 'V14',
		maxVolume: 1.0
	},
	{
		name: 'V12',
		title: 'Stone Henge - Day',
		sound: 'V13'
	},
	{
		monthIdx: 11,
		month: 'DecemberClear',
		scpt: 'DECCLRSCPT',
		name: 'V12BASIC',
		title: 'Winter Manor - December - Clear',
		sound: 'V13'
	},
	{
		name: 'V13',
		title: 'Pond Ripples - Dawn',
		sound: 'V13'
	},
	{
		name: 'V14',
		title: 'Mountain Storm - Day',
		sound: 'V14',
		maxVolume: 1.0
	},
	{
		name: 'V15',
		title: 'Harbor Town - Night',
		sound: 'V15'
	},
	{
		name: 'V16',
		title: 'Mirror Pond - Morning',
		sound: 'V16'
	},
	{
		name: 'V16RAIN',
		title: 'Mirror Pond - Rain',
		sound: 'V16RAIN'
	},
	{
		name: 'V16PM',
		title: 'Mirror Pond - Afternoon',
		sound: 'V16'
	},
	{
		monthIdx: 10,
		month: 'NovemberClear',
		scpt: 'novclrscpt',
		name: 'V16',
		title: 'Mirror Pond - November - Clear',
		sound: 'V16'
	},
	{
		month: 'November',
		scpt: 'novrainscpt',
		name: 'V16RAIN',
		title: 'Mirror Pond - November - Rain',
		sound: 'V16RAIN'
	},
	{
		name: 'V17',
		title: 'Ice Wind - Day',
		sound: 'V17',
		maxVolume: 0.25
	},
	{
		name: 'V18',
		title: 'Alpine Ruin - Dawn',
		sound: 'V17',
		maxVolume: 0.25
	},
	{
		name: 'V19',
		title: 'Mountain Stream - Morning',
		sound: 'V19'
	},
	{
		name: 'V19PM',
		title: 'Mountain Stream - Afternoon',
		sound: 'V19'
	},
	{
		name: 'V19AURA',
		title: 'Mountain Stream - Night',
		sound: 'V19'
	},
	{
		monthIdx: 1,
		month: 'FebruaryClear',
		scpt: 'febclrscpt',
		name: 'V19',
		title: 'Mountain Stream - February - Clear',
		sound: 'V19'
	},
	{
		month: 'FebruaryCloudy',
		scpt: 'febcldyscpt',
		name: 'V19',
		title: 'Mountain Stream - February - Cloudy',
		sound: 'V19'
	},
	{
		name: 'V20',
		title: 'Crystal Caves - Day',
		sound: 'V20',
		maxVolume: 0.25
	},
	{
		monthIdx: 5,
		month: 'JuneClear',
		scpt: 'jundayscpt',
		name: 'V20JOE',
		title: 'Crystal Caves - June - Clear',
		sound: 'V20'
	},
	{
		name: 'V21',
		title: 'Elvin City - Day',
		sound: 'V03'
	},
	{
		name: 'V22',
		title: 'Dark Castle - Night',
		sound: 'V05HAUNT'
	},
	{
		name: 'V23',
		title: 'Desert Twilight - Dawn',
		sound: 'V25HEAT'
	},
	{
		name: 'V24',
		title: 'Red Canyon - Day',
		sound: 'V25HEAT'
	},
	{
		name: 'V25',
		title: 'Desert Heat Wave - Morning',
		sound: 'V25HEAT'
	},
	{
		name: 'V25HEAT',
		title: 'Desert Heat Wave - Afternoon',
		sound: 'V25HEAT'
	},
	{
		name: 'V25PM',
		title: 'Desert Heat Wave - Dawn'
	},
	{
		monthIdx: 6,
		month: 'JulyClear',
		scpt: 'julyclearscpt',
		name: 'V25',
		title: 'Desert - July - Clear',
		sound: 'V25HEAT'
	},
	{
		month: 'JulyCloudy',
		scpt: 'julycloudyscpt',
		name: 'V25',
		title: 'Desert - July - Cloudy',
		sound: 'V25HEAT'
	},
	{
		name: 'V26',
		title: 'Winter Forest - Day',
		sound: 'V13'
	},
	{
		name: 'V26SNOW',
		title: 'Winter Forest - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		name: 'V26PM',
		title: 'Winter Forest - Evening',
		sound: 'V13'
	},
	{
		name: 'V26NIGHT',
		title: 'Winter Forest - Night',
		sound: 'V05HAUNT'
	},
	{
		month: 'JanuaryClear',
		scpt: 'janclrscpt',
		name: 'V26',
		title: 'Winter Forest - January - Clear',
		sound: 'V13'
	},
	{
		monthIdx: 0,
		month: 'January',
		scpt: 'jansnowscpt',
		name: 'V26SNOW',
		title: 'Winter Forest - January - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		name: 'V27',
		title: 'Magic Marsh Cave - Night',
		sound: 'V25HEAT'
	},
	{
		name: 'V28',
		title: 'Water City Gates - Fog',
		sound: 'V28'
	},
	{
		name: 'V29',
		title: 'Seascape - Day',
		sound: 'V29'
	},
	{
		name: 'V29FOG',
		title: 'Seascape - Fog',
		sound: 'V29'
	},
	{
		name: 'V29PM',
		title: 'Seascape - Sunset',
		sound: 'V29'
	},
	{
		monthIdx: 8,
		month: 'SeptemberClear',
		scpt: 'SEPTCLRCUMSCPT',
		name: 'V29',
		title: 'Seascape - September - Clear',
		sound: 'V29',
		remap: {
			252: [11,11,11]
		}
	},
	{
		month: 'SeptemberCloudy',
		scpt: 'SEPTCLDYSCPT',
		name: 'V29',
		title: 'Seascape - September - Cloudy',
		sound: 'V29',
		remap: {
			252: [11,11,11]
		}
	},
	{
		name: 'V30',
		title: 'Deep Forest - Day',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		name: 'V30RAIN',
		title: 'Deep Forest - Rain',
		sound: 'V30RAIN'
	},
	{
		monthIdx: 3,
		month: 'AprilClear',
		scpt: 'aprclrscpt',
		name: 'V30',
		title: 'Deep Forest - April - Clear',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		month: 'April',
		scpt: 'aprrainscpt',
		name: 'V30RAIN',
		title: 'Deep Forest - April - Rain',
		sound: 'V30RAIN'
	},
	{
		monthIdx: 2,
		month: 'MarchClear',
		scpt: 'MARCLRSCPT',
		name: 'VW3BASIC',
		title: 'Monolith Plains - March - Clear'
	},
	{
		name: 'TESTRAMP',
		title: 'Test Image'
	}
];

/*
var scenesDef = [
	{
		monthIdx: 0,
		month: '01January',
		scpt: 'janclrscpt',
		name: 'V26',
		title: 'January - Winter Forest - Clear',
		sound: 'V13'
	},
	{

		month: '01January',
		scpt: 'jansnowscpt',
		name: 'V26SNOW',
		title: 'January - Winter Forest - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		monthIdx: 1,
		month: '02February',
		scpt: 'febclrscpt',
		name: 'V19',
		title: 'February - Mountain Stream - Clear',
		sound: 'V19'
	},
	{
		month: '02February',
		scpt: 'febcldyscpt',
		name: 'V19CLOUD',
		title: 'February - Mountain Stream - Cloudy',
		sound: 'V19'
	},
	{
		monthIdx: 2,
		month: '03March',
		scpt: 'MARCLRSCPT',
		name: 'VW3BASIC',
		title: 'March - Monolith Plains - Clear'
	},
	{
		monthIdx: 3,
		month: '04April',
		scpt: 'aprclrscpt',
		name: 'V30',
		title: 'April - Deep Forest - Clear',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		month: '04April',
		scpt: 'aprrainscpt',
		name: 'V30RAIN',
		title: 'April - Deep Forest - Rain',
		sound: 'V30RAIN'
	},
	{
		monthIdx: 4,
		month: '05May',
		scpt: 'MAYCLRSCPT',
		name: 'V08',
		title: 'May - Jungle Waterfall - Clear',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: '05May',
		scpt: 'MAYCLDYSCPT',
		name: 'V08CLOUD',
		title: 'May - Jungle Waterfall - Cloudy',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: '05May',
		scpt: 'MAYRAINSCPT',
		name: 'V08RAIN',
		title: 'May - Jungle Waterfall - Rain',
		sound: 'V08RAIN'
	},
	{
		monthIdx: 5,
		month: '06June',
		scpt: 'jundayscpt',
		name: 'V20JOE',
		title: 'June - Crystal Caves - Clear',
		sound: 'V20'
	},
	{
		monthIdx: 6,
		month: '07July',
		scpt: 'julyclearscpt',
		name: 'V25',
		title: 'July - Desert - Clear',
		sound: 'V25HEAT'
	},
	{
		month: '07July',
		scpt: 'julycloudyscpt',
		name: 'V25CLOUD',
		title: 'July - Desert - Cloudy',
		sound: 'V25HEAT'
	},
	{
		monthIdx: 7,
		month: '08August',
		scpt: 'augclrscpt',
		name: 'CORAL',
		title: 'August - Aquarius - Clear',
		sound: 'CORAL',
		maxVolume: 0.25,
		remap: {
			0: [0, 0, 0]
		}
	},
	{
		monthIdx: 8,
		month: '09September',
		scpt: 'SEPTCLRCUMSCPT',
		name: 'V29',
		title: 'September - Seascape - Clear',
		sound: 'V29',
		remap: {
			252: [11, 11, 11]
		}
	},
	{
		month: '09September',
		scpt: 'SEPTCLDYSCPT',
		name: 'V29CLOUD',
		title: 'September - Seascape - Cloudy',
		sound: 'V29',
		remap: {
			252: [11, 11, 11]
		}
	},
	{
		month: '10October',
		scpt: 'octbegclrscpt',
		name: 'V05AM',
		title: 'Early October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0, 0, 0],
			0: [11, 11, 11]
		}
	},
	{
		monthIdx: 9,
		month: '10October',
		scpt: 'octendclrscpt',
		name: 'V05AMLATE',
		title: 'Late October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0, 0, 0],
			0: [11, 11, 11]
		}
	},
	{
		month: '10October',
		scpt: 'octrainscpt',
		name: 'V05RAIN',
		title: 'Late October - Haunted Ruins - Rain',
		sound: 'V05RAIN',
		remap: {
			254: [0, 0, 0],
			0: [11, 11, 11]
		}
	},
	{
		monthIdx: 10,
		month: '11November',
		scpt: 'novclrscpt',
		name: 'V16',
		title: 'November - Mirror Pond - Clear',
		sound: 'V16'
	},
	{
		month: '11November',
		scpt: 'novrainscpt',
		name: 'V16RAIN',
		title: 'November - Mirror Pond - Rain',
		sound: 'V16RAIN'
	},
	// missing 640x480 LBM for december
	{
		monthIdx: 11,
		month: '12December',
		scpt: 'DECCLRSCPT',
		name: 'V12BASIC',
		title: 'December - Winter Manor - Clear',
		sound: 'V13'
	}
];

var scenesCloudy = [
	{
		monthIdx: 0,
		month: '01January',
		scpt: 'janclrscpt',
		name: 'V26',
		title: 'January - Winter Forest - Clear',
		sound: 'V13'
	},
	{
		monthIdx: 1,
		month: '02February',
		scpt: 'febcldyscpt',
		name: 'V19CLOUD',
		title: 'February - Mountain Stream - Cloudy',
		sound: 'V19'
	},
	{
		monthIdx: 2,
		month: '03March',
		scpt: 'MARCLRSCPT',
		name: 'VW3BASIC',
		title: 'March - Monolith Plains - Clear'
	},
	{
		monthIdx: 3,
		month: '04April',
		scpt: 'aprclrscpt',
		name: 'V30',
		title: 'April - Deep Forest - Clear',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		monthIdx: 4,
		month: '05May',
		scpt: 'MAYCLDYSCPT',
		name: 'V08CLOUD',
		title: 'May - Jungle Waterfall - Cloudy',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		monthIdx: 5,
		month: '06June',
		scpt: 'jundayscpt',
		name: 'V20JOE',
		title: 'June - Crystal Caves - Clear',
		sound: 'V20'
	},
	{
		monthIdx: 6,
		month: '07July',
		scpt: 'julycloudyscpt',
		name: 'V25CLOUD',
		title: 'July - Desert - Cloudy',
		sound: 'V25HEAT'
	},
	{
		monthIdx: 7,
		month: '08August',
		scpt: 'augclrscpt',
		name: 'CORAL',
		title: 'August - Aquarius - Clear',
		sound: 'CORAL',
		maxVolume: 0.25,
		remap: {
			0: [0, 0, 0]
		}
	},
	{
		monthIdx: 8,
		month: '09September',
		scpt: 'SEPTCLDYSCPT',
		name: 'V29CLOUD',
		title: 'September - Seascape - Cloudy',
		sound: 'V29',
		remap: {
			252: [11, 11, 11]
		}
	},
	{
		monthIdx: 9,
		month: '10October',
		scpt: 'octendclrscpt',
		name: 'V05AMLATE',
		title: 'Late October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0, 0, 0],
			0: [11, 11, 11]
		}
	},
	{
		monthIdx: 10,
		month: '11November',
		scpt: 'novclrscpt',
		name: 'V16',
		title: 'November - Mirror Pond - Clear',
		sound: 'V16'
	},
	// missing 640x480 LBM for december
	{
		monthIdx: 11,
		month: '12December',
		scpt: 'DECCLRSCPT',
		name: 'V12BASIC',
		title: 'December - Winter Manor - Clear',
		sound: 'V13'
	}
];

var scenesRainy = [
	{
		monthIdx: 0,
		month: '01January',
		scpt: 'jansnowscpt',
		name: 'V26SNOW',
		title: 'January - Winter Forest - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		monthIdx: 1,
		month: '02February',
		scpt: 'febcldyscpt',
		name: 'V19CLOUD',
		title: 'February - Mountain Stream - Cloudy',
		sound: 'V19'
	},
	{
		monthIdx: 2,
		month: '03March',
		scpt: 'MARCLRSCPT',
		name: 'VW3BASIC',
		title: 'March - Monolith Plains - Clear'
	},
	{
		monthIdx: 3,
		month: '04April',
		scpt: 'aprrainscpt',
		name: 'V30RAIN',
		title: 'April - Deep Forest - Rain',
		sound: 'V30RAIN'
	},
	{
		monthIdx: 4,
		month: '05May',
		scpt: 'MAYRAINSCPT',
		name: 'V08RAIN',
		title: 'May - Jungle Waterfall - Rain',
		sound: 'V08RAIN'
	},
	{
		monthIdx: 5,
		month: '06June',
		scpt: 'jundayscpt',
		name: 'V20JOE',
		title: 'June - Crystal Caves - Clear',
		sound: 'V20'
	},
	{
		monthIdx: 6,
		month: '07July',
		scpt: 'julycloudyscpt',
		name: 'V25CLOUD',
		title: 'July - Desert - Cloudy',
		sound: 'V25HEAT'
	},
	{
		monthIdx: 7,
		month: '08August',
		scpt: 'augclrscpt',
		name: 'CORAL',
		title: 'August - Aquarius - Clear',
		sound: 'CORAL',
		maxVolume: 0.25,
		remap: {
			0: [0, 0, 0]
		}
	},
	{
		monthIdx: 8,
		month: '09September',
		scpt: 'SEPTCLDYSCPT',
		name: 'V29CLOUD',
		title: 'September - Seascape - Cloudy',
		sound: 'V29',
		remap: {
			252: [11, 11, 11]
		}
	},
	{
		monthIdx: 9,
		month: '10October',
		scpt: 'octrainscpt',
		name: 'V05RAIN',
		title: 'Late October - Haunted Ruins - Rain',
		sound: 'V05RAIN',
		remap: {
			254: [0, 0, 0],
			0: [11, 11, 11]
		}
	},
	{
		monthIdx: 10,
		month: '11November',
		scpt: 'novrainscpt',
		name: 'V16RAIN',
		title: 'November - Mirror Pond - Rain',
		sound: 'V16RAIN'
	},
	// missing 640x480 LBM for december
	{
		monthIdx: 11,
		month: '12December',
		scpt: 'DECCLRSCPT',
		name: 'V12BASIC',
		title: 'December - Winter Manor - Clear',
		sound: 'V13'
	}
];

var scenesSunny = [
	{
		monthIdx: 0,
		month: '01January',
		scpt: 'janclrscpt',
		name: 'V26',
		title: 'January - Winter Forest - Clear',
		sound: 'V13'
	},
	{
		monthIdx: 1,
		month: '02February',
		scpt: 'febclrscpt',
		name: 'V19',
		title: 'February - Mountain Stream - Clear',
		sound: 'V19'
	},
	{
		monthIdx: 2,
		month: '03March',
		scpt: 'MARCLRSCPT',
		name: 'VW3BASIC',
		title: 'March - Monolith Plains - Clear'
	},
	{
		monthIdx: 3,
		month: '04April',
		scpt: 'aprclrscpt',
		name: 'V30',
		title: 'April - Deep Forest - Clear',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		monthIdx: 4,
		month: '05May',
		scpt: 'MAYCLRSCPT',
		name: 'V08',
		title: 'May - Jungle Waterfall - Clear',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		monthIdx: 5,
		month: '06June',
		scpt: 'jundayscpt',
		name: 'V20JOE',
		title: 'June - Crystal Caves - Clear',
		sound: 'V20'
	},
	{
		monthIdx: 6,
		month: '07July',
		scpt: 'julyclearscpt',
		name: 'V25',
		title: 'July - Desert - Clear',
		sound: 'V25HEAT'
	},
	{
		monthIdx: 7,
		month: '08August',
		scpt: 'augclrscpt',
		name: 'CORAL',
		title: 'August - Aquarius - Clear',
		sound: 'CORAL',
		maxVolume: 0.25,
		remap: {
			0: [0, 0, 0]
		}
	},
	{
		monthIdx: 8,
		month: '09September',
		scpt: 'SEPTCLRCUMSCPT',
		name: 'V29',
		title: 'September - Seascape - Clear',
		sound: 'V29',
		remap: {
			252: [11, 11, 11]
		}
	},
	{
		monthIdx: 9,
		month: '10October',
		scpt: 'octbegclrscpt',
		name: 'V05AM',
		title: 'Early October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0, 0, 0],
			0: [11, 11, 11]
		}
	},
	{
		monthIdx: 10,
		month: '11November',
		scpt: 'novclrscpt',
		name: 'V16',
		title: 'November - Mirror Pond - Clear',
		sound: 'V16'
	},
	{
		monthIdx: 11,
		month: '12December',
		scpt: 'DECCLRSCPT',
		name: 'V12BASIC',
		title: 'December - Winter Manor - Clear',
		sound: 'V13'
	}
];

var scenesRandom = [
	{
		name: 'V08AM',
		title: 'Jungle Waterfall - Morning',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V14',
		title: 'Mountain Storm - Day',
		sound: 'V14',
		maxVolume: 1.0
	},
	{
		name: 'V04',
		title: 'Highland Ruins - Rain',
		sound: 'V04'
	},
	{
		name: 'V07',
		title: 'Rough Seas - Day',
		sound: 'V07'
	},
	{
		name: 'V15',
		title: 'Harbor Town - Night',
		sound: 'V15'
	},
	{
		name: 'V02',
		title: 'Mountain Fortress - Dusk',
		sound: 'V02',
		maxVolume: 1.0
	},
	{
		name: 'V28',
		title: 'Water City Gates - Fog',
		sound: 'V28'
	},
	{
		name: 'V01',
		title: 'Island Fires - Dusk',
		sound: 'V29',
		maxVolumd: 0.25
	},
	{
		name: 'V09',
		title: 'Forest Edge - Day',
		sound: 'V09',
		maxVolume: 1.0
	},
	{
		name: 'V03',
		title: 'Swamp Cathedral - Day',
		sound: 'V03'
	},
	{
		name: 'V10',
		title: 'Deep Swamp - Day',
		sound: 'V10'
	},
	{
		name: 'V11AM',
		title: 'Approaching Storm - Day',
		sound: 'V02',
		maxVolume: 1.0
	},
	{
		name: 'V13',
		title: 'Pond Ripples - Dawn',
		sound: 'V13'
	},
	{
		name: 'V17',
		title: 'Ice Wind - Day',
		sound: 'V17',
		maxVolume: 0.25
	},
	{
		name: 'V25HEAT',
		title: 'Desert Heat Wave - Day',
		sound: 'V25HEAT'
	},
	{
		name: 'V27',
		title: 'Magic Marsh Cave - Night',
		sound: 'V25HEAT'
	}
];

*/

/*
var scenes = [
	{
		name: 'CORAL',
		title: 'Aquarius - Day',
		sound: 'CORAL',
		maxVolume: 0.25
	},
	{
		name: 'V01',
		title: 'Island Fires - Dusk',
		sound: 'V29',
		maxVolumd: 0.25
	},
	{
		name: 'V02',
		title: 'Mountain Fortress - Dusk',
		sound: 'V02',
		maxVolume: 1.0
	},
	{
		name: 'V03',
		title: 'Swamp Cathedral - Day',
		sound: 'V03'
	},
	{
		name: 'V04',
		title: 'Highland Ruins - Rain',
		sound: 'V04'
	},
	{
		name: 'V05AM',
		title: 'Haunted Castle Ruins - Morning',
		sound: 'V03'
	},
	{
		name: 'V05PM',
		title: 'Haunted Castle Ruins - Evening',
		sound: 'V03'
	},
	{
		name: 'V05HAUNT',
		title: 'Haunted Castle Ruins - Night',
		sound: 'V05HAUNT'
	},
	{
		name: 'V05RAIN',
		title: 'Haunted Castle Ruins - Rain',
		sound: 'V05RAIN'
	},
	{
		name: 'V07',
		title: 'Rough Seas - Day',
		sound: 'V07',
		maxVolume: 0.25
	},
	{
		name: 'V08AM',
		title: 'Jungle Waterfall - Morning',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V08',
		title: 'Jungle Waterfall - Afternoon',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V08RAIN',
		title: 'Jungle Waterfall - Rain',
		sound: 'V08RAIN'
	},
	{
		name: 'V08PM',
		title: 'Jungle Waterfall - Night',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V09',
		title: 'Forest Edge - Day',
		sound: 'V09',
		maxVolume: 1.0
	},
	{
		name: 'V10',
		title: 'Deep Swamp - Day',
		sound: 'V10'
	},
	{
		name: 'V11AM',
		title: 'Approaching Storm - Dawn',
		// sound: 'V02',
		sound: 'V14',
		maxVolume: 1.0
	},
	{
		name: 'V12',
		title: 'Stone Henge - Day',
		sound: 'V13'
	},
	{
		name: 'V13',
		title: 'Pond Ripples - Dawn',
		sound: 'V13'
	},
	{
		name: 'V14',
		title: 'Mountain Storm - Day',
		sound: 'V14',
		maxVolume: 1.0
	},
	{
		name: 'V15',
		title: 'Harbor Town - Night',
		sound: 'V15'
	},
	{
		name: 'V16',
		title: 'Mirror Pond - Morning',
		sound: 'V16'
	},
	{
		name: 'V16RAIN',
		title: 'Mirror Pond - Rain',
		sound: 'V16RAIN'
	},
	{
		name: 'V16PM',
		title: 'Mirror Pond - Afternoon',
		sound: 'V16'
	},
	{
		name: 'V17',
		title: 'Ice Wind - Day',
		sound: 'V17',
		maxVolume: 0.25
	},
	{
		name: 'V18',
		title: 'Alpine Ruin - Dawn',
		sound: 'V17',
		maxVolume: 0.25
	},
	{
		name: 'V19',
		title: 'Mountain Stream - Morning',
		sound: 'V19'
	},
	{
		name: 'V19PM',
		title: 'Mountain Stream - Afternoon',
		sound: 'V19'
	},
	{
		name: 'V19AURA',
		title: 'Mountain Stream - Night',
		sound: 'V19'
	},
	{
		name: 'V20',
		title: 'Crystal Caves - Day',
		sound: 'V20',
		maxVolume: 0.25
	},
	{
		name: 'V21',
		title: 'Elvin City - Day',
		sound: 'V03'
	},
	{
		name: 'V22',
		title: 'Dark Castle - Night',
		sound: 'V05HAUNT'
	},
	{
		name: 'V23',
		title: 'Desert Twilight - Dawn',
		sound: 'V25HEAT'
	},
	{
		name: 'V24',
		title: 'Red Canyon - Day',
		sound: 'V25HEAT'
	},
	{
		name: 'V25',
		title: 'Desert Heat Wave - Morning',
		sound: 'V25HEAT'
	},
	{
		name: 'V25HEAT',
		title: 'Desert Heat Wave - Afternoon',
		sound: 'V25HEAT'
	},
	{
		name: 'V25PM',
		title: 'Desert Heat Wave - Dawn'
	},
	{
		name: 'V26',
		title: 'Winter Forest - Day',
		sound: 'V13'
	},
	{
		name: 'V26SNOW',
		title: 'Winter Forest - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		name: 'V26PM',
		title: 'Winter Forest - Evening',
		sound: 'V13'
	},
	{
		name: 'V26NIGHT',
		title: 'Winter Forest - Night',
		sound: 'V05HAUNT'
	},
	{
		name: 'V27',
		title: 'Magic Marsh Cave - Night',
		sound: 'V25HEAT'
	},
	{
		name: 'V28',
		title: 'Water City Gates - Fog',
		sound: 'V28'
	},
	{
		name: 'V29',
		title: 'Seascape - Day',
		sound: 'V29'
	},
	{
		name: 'V29FOG',
		title: 'Seascape - Fog',
		sound: 'V29'
	},
	{
		name: 'V29PM',
		title: 'Seascape - Sunset',
		sound: 'V29'
	},
	{
		name: 'V30',
		title: 'Deep Forest - Day',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		name: 'V30RAIN',
		title: 'Deep Forest - Rain',
		sound: 'V30RAIN'
	},
	{
		name: 'TESTRAMP',
		title: 'Test Image'
	}
];
*/

/*
var scenes = [
	{
		monthIdx: 7,
		month: 'AugustClear',
		scpt: 'augclrscpt',
		name: 'CORAL',
		title: 'August - Aquarius - Clear',
		sound: 'CORAL',
		maxVolume: 0.25,
		remap: {
			0: [0,0,0]
		}
	},
	{
		monthIdx: 9,
		month: 'EarlyOctoberClear',
		scpt: 'octbegclrscpt',
		name: 'V05AM',
		title: 'Early October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		month: 'LateOctoberClear',
		scpt: 'octendclrscpt',
		name: 'V05AM',
		title: 'Late October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		month: 'LateOctober',
		scpt: 'octrainscpt',
		name: 'V05RAIN',
		title: 'Late October - Haunted Ruins - Rain',
		sound: 'V05RAIN',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		monthIdx: 4,
		month: 'MayClear',
		scpt: 'MAYCLRSCPT',
		name: 'V08',
		title: 'May - Jungle Waterfall - Clear',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: 'MayCloudy',
		scpt: 'MAYCLDYSCPT',
		name: 'V08',
		title: 'May - Jungle Waterfall - Cloudy',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: 'May',
		scpt: 'MAYRAINSCPT',
		name: 'V08RAIN',
		title: 'May - Jungle Waterfall - Rain',
		sound: 'V08RAIN'
	},
	{
		monthIdx: 11,
		month: 'DecemberClear',
		scpt: 'DECCLRSCPT',
		name: 'V12BASIC',
		title: 'December - Winter Manor - Clear',
		sound: 'V13'
	},
	{
		monthIdx: 10,
		month: 'NovemberClear',
		scpt: 'novclrscpt',
		name: 'V16',
		title: 'November - Mirror Pond - Clear',
		sound: 'V16'
	},
	{
		month: 'November',
		scpt: 'novrainscpt',
		name: 'V16RAIN',
		title: 'November - Mirror Pond - Rain',
		sound: 'V16RAIN'
	},
	{
		monthIdx: 1,
		month: 'FebruaryClear',
		scpt: 'febclrscpt',
		name: 'V19',
		title: 'February - Mountain Stream - Clear',
		sound: 'V19'
	},
	{
		month: 'FebruaryCloudy',
		scpt: 'febcldyscpt',
		name: 'V19',
		title: 'February - Mountain Stream - Cloudy',
		sound: 'V19'
	},
	{
		monthIdx: 5,
		month: 'JuneClear',
		scpt: 'jundayscpt',
		name: 'V20JOE',
		title: 'June - Crystal Caves - Clear',
		sound: 'V20'
	},
	{
		monthIdx: 6,
		month: 'JulyClear',
		scpt: 'julyclearscpt',
		name: 'V25',
		title: 'July - Desert - Clear',
		sound: 'V25HEAT'
	},
	{
		month: 'JulyCloudy',
		scpt: 'julycloudyscpt',
		name: 'V25',
		title: 'July - Desert - Cloudy',
		sound: 'V25HEAT'
	},
	{
		month: 'JanuaryClear',
		scpt: 'janclrscpt',
		name: 'V26',
		title: 'January - Winter Forest - Clear',
		sound: 'V13'
	},
	{
		monthIdx: 0,
		month: 'January',
		scpt: 'jansnowscpt',
		name: 'V26SNOW',
		title: 'January - Winter Forest - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		monthIdx: 8,
		month: 'SeptemberClear',
		scpt: 'SEPTCLRCUMSCPT',
		name: 'V29',
		title: 'September - Seascape - Clear',
		sound: 'V29',
		remap: {
			252: [11,11,11]
		}
	},
	{
		month: 'SeptemberCloudy',
		scpt: 'SEPTCLDYSCPT',
		name: 'V29',
		title: 'September - Seascape - Cloudy',
		sound: 'V29',
		remap: {
			252: [11,11,11]
		}
	},
	{
		monthIdx: 3,
		month: 'AprilClear',
		scpt: 'aprclrscpt',
		name: 'V30',
		title: 'April - Deep Forest - Clear',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		month: 'April',
		scpt: 'aprrainscpt',
		name: 'V30RAIN',
		title: 'April - Deep Forest - Rain',
		sound: 'V30RAIN'
	},
	{
		monthIdx: 2,
		month: 'MarchClear',
		scpt: 'MARCLRSCPT',
		name: 'VW3BASIC',
		title: 'March - Monolith Plains - Clear'
	}
];
*/

/*
var scenes = [
	{
		"id": "CORAL",
		"name": "Aquarius",
		"month": "08August",
		"script": "augclrscpt",
		"remap": {
			"0": [0,0,0]
		}
	},
	{
		"id": "V05AM",
		"name": "Haunted Ruins - Clear",
		"month": "10October",
		"script": "octbegclrscpt",
		"remap": {
			"254": [0,0,0],
			"0": [11,11,11]
		}
	},
	{
		"id": "V05AM",
		"name": "Haunted Ruins - Fall",
		"month": "10October",
		"script": "octendclrscpt",
		"remap": {
			"254": [0,0,0],
			"0": [11,11,11]
		}
	},
	{
		"id": "V05RAIN",
		"name": "Haunted Ruins - Rain",
		"month": "10October",
		"script": "octrainscpt",
		"remap": {
			"254": [0,0,0],
			"0": [11,11,11]
		}
	},
	{
		"id": "V08",
		"name": "Jungle Waterfall - Clear",
		"month": "05May",
		"script": "MAYCLRSCPT"
	},
	{
		"id": "V08",
		"name": "Jungle Waterfall - Cloudy",
		"month": "05May",
		"script": "MAYCLDYSCPT"
	},
	{
		"id": "V08RAIN",
		"name": "Jungle Waterfall - Rain",
		"month": "05May",
		"script": "MAYRAINSCPT"
	},
	{
		"id": "V12BASIC",
		"name": "Winter Manor",
		"month": "12December",
		"script": "DECCLRSCPT"
	},
	{
		"id": "V16",
		"name": "Mirror Pond - Clear",
		"month": "11November",
		"script": "novclrscpt"
	},
	{
		"id": "V16RAIN",
		"name": "Mirror Pond - Rain",
		"month": "11November",
		"script": "novrainscpt"
	},
	{
		"id": "V19",
		"name": "Mountain Stream - Clear",
		"month": "02February",
		"script": "febclrscpt"
	},
	{
		"id": "V19",
		"name": "Mountain Stream - Cloudy",
		"month": "02February",
		"script": "febcldyscpt"
	},
	{
		"id": "V20JOE",
		"name": "Crystal Caves",
		"month": "06June",
		"script": "jundayscpt"
	},
	{
		"id": "V25",
		"name": "Desert - Clear",
		"month": "07July",
		"script": "julyclearscpt"
	},
	{
		"id": "V25",
		"name": "Desert - Cloudy",
		"month": "07July",
		"script": "julycloudyscpt"
	},
	{
		"id": "V26",
		"name": "Winter Forest Clear",
		"month": "01January",
		"script": "janclrscpt"
	},
	{
		"id": "V26SNOW",
		"name": "Winter Forest Snow",
		"month": "01January",
		"script": "jansnowscpt"
	},
	{
		"id": "V29",
		"name": "Seascape - Clear",
		"month": "09September",
		"script": "SEPTCLRCUMSCPT",
		"remap": {
			"252": [11,11,11]
		}
	},
	{
		"id": "V29",
		"name": "Seascape - Cloudy",
		"month": "09September",
		"script": "SEPTCLDYSCPT",
		"remap": {
			"252": [11,11,11]
		}
	},
	{
		"id": "V30",
		"name": "Deep Forest - Clear",
		"month": "04April",
		"script": "aprclrscpt"
	},
	{
		"id": "V30RAIN",
		"name": "Deep Forest Rain",
		"month": "04April",
		"script": "aprrainscpt"
	},
	{
		"id": "VW3BASIC",
		"name": "Monolith Plains",
		"month": "03March",
		"script": "MARCLRSCPT"
	}
];
*/

/*
var scenes = [{
	"id": "CORAL",
	"name": "Aquarius - Day"
} , {
	"id": "V01",
	"name": "Island Fires - Dusk"
} , {
	"id": "V02",
	"name": "Mountain Fortress - Dusk"
} , {
	"id": "V03",
	"name": "Swamp Cathedral - Day"
} , {
	"id": "V04",
	"name": "Highland Ruins - Rain"
} , {
	"id": "V05AM",
	"name": "Haunted Castle Ruins - Morning"
} , {
	"id": "V05RAIN",
	"name": "Haunted Castle Ruins - Rain"
} , {
	"id": "V05PM",
	"name": "Haunted Castle Ruins - Evening"
} , {
	"id": "V05HAUNT",
	"name": "Haunted Castle Ruins - Night"
} , {
	"id": "V07",
	"name": "Rough Seas - Day"
} , {
	"id": "V08",
	"name": "Jungle Waterfall - Afternoon"
} , {
	"id": "V08AM",
	"name": "Jungle Waterfall - Morning"
} , {
	"id": "V08RAIN",
	"name": "Jungle Waterfall - Rain"
} , {
	"id": "V08PM",
	"name": "Jungle Waterfall - Night"
} , {
	"id": "V09",
	"name": "Forest Edge - Day"
} , {
	"id": "V10",
	"name": "Deep Swamp - Day"
} , {
	"id": "V11AM",
	"name": "Approaching Storm - Day"
} , {
	"id": "V12",
	"name": "Stone Henge"
} , {
	"id": "V13",
	"name": "Pond Ripples - Dawn"
} , {
	"id": "V14",
	"name": "Mountain Storm - Day"
} , {
	"id": "V15",
	"name": "Harbor Town - Night"
} , {
	"id": "V16",
	"name": "Mirror Pond - Morning"
} , {
	"id": "V16RAIN",
	"name": "Mirror Pond - Rain"
} , {
	"id": "V16PM",
	"name": "Mirror Pond - Afternoon"
} , {
	"id": "V17",
	"name": "Ice Wind - Day"
} , {
	"id": "V18",
	"name": "Alpine Ruin"
} , {
	"id": "V19",
	"name": "Mountain Stream - Morning"
} , {
	"id": "V19PM",
	"name": "Mountain Stream - Afternoon"
} , {
	"id": "V19AURA",
	"name": "Mountain Stream - Night"
} , {
	"id": "V20",
	"name": "Crystal Caves - Day"
} , {
	"id": "V21",
	"name": "Elvin City"
} , {
	"id": "V22",
	"name": "Dark Castle"
} , {
	"id": "V23",
	"name": "Desert Twilight"
} , {
	"id": "V24",
	"name": "Red Canyon"
} , {
	"id": "V25",
	"name": "Desert Heat Wave - Still"
} , {
	"id": "V25HEAT",
	"name": "Desert Heat Wave - Day"
} , {
	"id": "V25PM",
	"name": "Desert Heat Wave - Night"
} , {
	"id": "V26",
	"name": "Winter Forest"
} , {
	"id": "V26SNOW",
	"name": "Winter Forest - Snow"
} , {
	"id": "V26PM",
	"name": "Winter Forest - Evening"
} , {
	"id": "V26NIGHT",
	"name": "Winter Forest - Night"
} , {
	"id": "V27",
	"name": "Magic Marsh Cave - Night"
} , {
	"id": "V28",
	"name": "Water City Gates - Fog"
} , {
	"id": "V29",
	"name": "Seascape - Day"
} , {
	"id": "V29FOG",
	"name": "Seascape - Fog"
} , {
	"id": "V29PM",
	"name": "Seascape - Sunset"
} , {
	"id": "V30",
	"name": "Deep Forest - Day"
} , {
	"id": "V30RAIN",
	"name": "Deep Forest - Rain"
}];
*/

/*var scenes = [
	{
		"name": "Seascape",
		"images": [
			{
				"id": "V29FOG",
				"startHour": "6"
			},
			{
				"id": "V29",
				"startHour": "10"
			},
			{
				"id": "V29PM",
				"startHour": "18"
			}
		]
	},
	{
		"name": "Waterfall",
		"images": [
			{
				"id": "V08AM",
				"startHour": "6"
			},
			{
				"id": "V08",
				"startHour": "11"
			},
			{
				"id": "V08RAIN",
				"startHour": "16"
			},
			{
				"id": "V08PM",
				"startHour": "18"
			}
		]
	},
	{
		"name": "Mirror Pond",
		"images": [
			{
				"id": "V16",
				"startHour": "6"
			},
			{
				"id": "V16RAIN",
				"startHour": "15"
			},
			{
				"id": "V16PM",
				"startHour": "18"
			}
		]
	},
	{
		"name": "Mountain Stream",
		"images": [
			{
				"id": "V19",
				"startHour": "6"
			},
			{
				"id": "V19PM",
				"startHour": "12"
			},
			{
				"id": "V19AURA",
				"startHour": "21"
			}
		]
	},
	{
		"name": "Snowy Wood",
		"images": [
			{
				"id": "V26",
				"startHour": "6"
			},
			{
				"id": "V26SNOW",
				"startHour": "12"
			},
			{
				"id": "V26PM",
				"startHour": "17"
			},
			{
				"id": "V26NIGHT",
				"startHour": "21"
			}
		]
	},
	{
		"name": "Desert Heat",
		"images": [
			{
				"id": "V25",
				"startHour": "6"
			},
			{
				"id": "V25HEAT",
				"startHour": "11"
			},
			{
				"id": "V25PM",
				"startHour": "17"
			}
		]
	},
	{
		"name": "Ghost Castle",
		"images": [
			{
				"id": "V05AM",
				"startHour": "7"
			},
			{
				"id": "V05RAIN",
				"startHour": "12"
			},
			{
				"id": "V05PM",
				"startHour": "16"
			},
			{
				"id": "V05HAUNT",
				"startHour": "20"
			}
		]
	}
];*/

