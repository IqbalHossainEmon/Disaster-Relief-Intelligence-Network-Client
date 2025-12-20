// Mock data for disaster zones and relief information

export const disasterZones = [
	{
		id: 1,
		name: 'Zone-1',
		location: 'Feni City',
		coordinates: [23.0239, 91.3996],
		radius: 8000,
		severity: 'critical', // critical, high, moderate, low, safe
		population: 48696,
		lastUpdated: '5 mins ago',
		affectedPeople: 48696,
		hasAssignedTeam: true,
	},
	{
		id: 2,
		name: 'Zone-2',
		location: 'Daganbhuiyan',
		coordinates: [23.05, 91.48],
		radius: 7000,
		severity: 'critical',
		population: 42000,
		lastUpdated: '10 mins ago',
		affectedPeople: 42000,
		hasAssignedTeam: true,
	},
	{
		id: 3,
		name: 'Zone-3',
		location: 'Sonagazi',
		coordinates: [22.85, 91.39],
		radius: 6000,
		severity: 'high',
		population: 35000,
		lastUpdated: '15 mins ago',
		affectedPeople: 32000,
		hasAssignedTeam: false,
	},
	{
		id: 5,
		name: 'Zone-5',
		location: 'Parshuram',
		coordinates: [23.15, 91.58],
		radius: 6500,
		severity: 'critical',
		population: 38000,
		lastUpdated: '8 mins ago',
		affectedPeople: 38000,
		hasAssignedTeam: true,
	},
	{
		id: 6,
		name: 'Zone-6',
		location: 'Chhagalnaiya',
		coordinates: [23.02, 91.52],
		radius: 5500,
		severity: 'high',
		population: 28000,
		lastUpdated: '20 mins ago',
		affectedPeople: 25000,
		hasAssignedTeam: true,
	},
	{
		id: 8,
		name: 'Zone-8',
		location: 'Fulchhari',
		coordinates: [22.95, 91.32],
		radius: 7500,
		severity: 'moderate',
		population: 32000,
		lastUpdated: '12 mins ago',
		affectedPeople: 18000,
		hasAssignedTeam: false,
	},
	{
		id: 10,
		name: 'Zone-10',
		location: 'Companiganj',
		coordinates: [22.78, 91.35],
		radius: 6000,
		severity: 'high',
		population: 30000,
		lastUpdated: '18 mins ago',
		affectedPeople: 28000,
		hasAssignedTeam: false,
	},
	{
		id: 12,
		name: 'Zone-12',
		location: 'Chatkhil',
		coordinates: [22.83, 91.65],
		radius: 6200,
		severity: 'moderate',
		population: 26000,
		lastUpdated: '25 mins ago',
		affectedPeople: 15000,
		hasAssignedTeam: true,
	},
	{
		id: 13,
		name: 'Zone-13',
		location: 'Begumganj',
		coordinates: [22.68, 91.05],
		radius: 8500,
		severity: 'moderate',
		population: 45000,
		lastUpdated: '30 mins ago',
		affectedPeople: 22000,
		hasAssignedTeam: true,
	},
	{
		id: 16,
		name: 'Zone-16',
		location: 'Safe Zone 1',
		coordinates: [23.1, 91.25],
		radius: 5000,
		severity: 'safe',
		population: 20000,
		lastUpdated: '1 hour ago',
		affectedPeople: 0,
		hasAssignedTeam: false,
	},
	{
		id: 21,
		name: 'Zone-21',
		location: 'Sakhipur',
		coordinates: [22.88, 90.95],
		radius: 7000,
		severity: 'moderate',
		population: 33000,
		lastUpdated: '35 mins ago',
		affectedPeople: 18000,
		hasAssignedTeam: false,
	},
	{
		id: 23,
		name: 'Safe Zone 2',
		location: 'Rampur',
		coordinates: [22.9, 91.75],
		radius: 5500,
		severity: 'safe',
		population: 18000,
		lastUpdated: '45 mins ago',
		affectedPeople: 0,
		hasAssignedTeam: false,
	},
];

// Helper function to generate zone details
const generateZoneDetails = (id, name, zoneName, severity, population, coordinates, hasTeam = true) => ({
	id,
	name,
	zoneName,
	severity,
	population,
	lastUpdated: '5 mins ago',
	coordinates,
	// Zone-specific statistics for bottom panel
	zoneStats: {
		evacuationProgress: severity === 'critical' ? 55 : severity === 'high' ? 30 : 15,
		reliefDelivered: severity === 'critical' ? 40 : severity === 'high' ? 60 : 80,
		medicalTeamsActive: severity === 'critical' ? 3 : severity === 'high' ? 2 : 1,
		sheltersOperational: Math.floor(population / 5000),
		waterSupplyStatus: severity === 'critical' ? 'Critical' : severity === 'high' ? 'Low' : 'Adequate',
		communicationStatus: severity === 'critical' ? 'Weak' : severity === 'high' ? 'Moderate' : 'Good',
	},
	reliefNeeds: {
		waterSanitation: {
			category: 'Water & Sanitation',
			items: [
				{ name: 'Bottled Water', needed: Math.floor(population * 2.5), unit: 'Liters' },
				{ name: 'Water Purification Tablets', needed: Math.floor(population * 1.2), unit: 'units' },
				{ name: 'Portable Toilets', needed: Math.floor(population / 100), unit: 'units' },
				{ name: 'Sanitation Kits', needed: Math.floor(population / 5), unit: 'units' },
			],
		},
		foodNutrition: {
			category: 'Food & Nutrition',
			items: [
				{ name: 'Dry Food Packs', needed: Math.floor(population * 1.6), unit: 'packs' },
				{ name: 'Baby Food', needed: Math.floor(population * 0.1), unit: 'units' },
				{ name: 'Nutrition Supplements', needed: Math.floor(population * 0.3), unit: 'units' },
			],
		},
		medicalSupplies: {
			category: 'Medical Supplies',
			items: [
				{ name: 'First Aid Kits', needed: Math.floor(population * 0.25), unit: 'kits' },
				{ name: 'ORS Packs', needed: Math.floor(population * 0.8), unit: 'packs' },
				{ name: 'Antiseptics & Bandages', needed: Math.floor(population * 0.7), unit: 'units' },
				{
					name: 'Emergency Medicine',
					needed: Math.floor(population * 0.4),
					unit: 'units',
					subtext: '(Painkillers, Antibiotics)',
				},
			],
		},
		shelterClothing: {
			category: 'Shelter & Clothing',
			items: [
				{ name: 'Emergency Tents', needed: Math.floor(population / 10), unit: 'units' },
				{ name: 'Blankets', needed: Math.floor(population * 0.5), unit: 'units' },
				{ name: 'Clothing Sets', needed: Math.floor(population * 0.6), unit: 'sets' },
			],
		},
	},
	zoneSummary: {
		zoneName: `${name} (${zoneName})`,
		populationAffected: population,
		severityLevel:
			severity === 'critical'
				? '🔴 Critical'
				: severity === 'high'
				? '🟠 High'
				: severity === 'safe'
				? '🟢 Safe'
				: '🟡 Moderate',
		lastUpdated: '5 mins ago',
	},
	ongoingEfforts: {
		reliefDrop: severity === 'critical' ? 'In Progress' : severity === 'high' ? 'Planned' : 'Completed',
		evacuationStatus: severity === 'critical' ? '55% complete' : severity === 'high' ? '30% complete' : '10% complete',
		communicationStatus: severity === 'critical' ? 'Stable' : severity === 'high' ? 'Good' : 'Excellent',
	},
	challengesAlerts: {
		roadsBlocked: severity === 'critical' ? '3 major routes' : severity === 'high' ? '1 route' : 'None',
		powerOutage:
			severity === 'critical' ? 'Reported in 95% area' : severity === 'high' ? 'Reported in 60% area' : 'Minor outages',
		internetSignal:
			severity === 'critical' ? 'Weak signals' : severity === 'high' ? 'Moderate signals' : 'Strong signals',
	},
	assignedTeams: hasTeam
		? [
				{
					id: 1,
					name: 'Team A - Red Crescent',
					status: 'Active',
					members: 25,
				},
				{
					id: 2,
					name: `Team B - ${name} Volunteers`,
					status: 'Active',
					members: 18,
				},
				{
					id: 3,
					name: 'Team C - Dhaka Rescue',
					status: 'Pending Approval',
					members: 30,
				},
		  ]
		: [],
});

export const zoneDetails = {
	1: generateZoneDetails(1, 'Feni City', 'Zone-1', 'critical', 48696, [23.0239, 91.3996], true),
	2: generateZoneDetails(2, 'Daganbhuiyan', 'Zone-2', 'critical', 42000, [23.05, 91.48], true),
	3: generateZoneDetails(3, 'Sonagazi', 'Zone-3', 'high', 35000, [22.85, 91.39], false),
	5: generateZoneDetails(5, 'Parshuram', 'Zone-5', 'critical', 38000, [23.15, 91.58], true),
	6: generateZoneDetails(6, 'Chhagalnaiya', 'Zone-6', 'high', 28000, [23.02, 91.52], true),
	8: generateZoneDetails(8, 'Fulchhari', 'Zone-8', 'moderate', 32000, [22.95, 91.32], false),
	10: generateZoneDetails(10, 'Companiganj', 'Zone-10', 'high', 30000, [22.78, 91.35], false),
	12: generateZoneDetails(12, 'Chatkhil', 'Zone-12', 'moderate', 26000, [22.83, 91.65], true),
	13: generateZoneDetails(13, 'Begumganj', 'Zone-13', 'moderate', 45000, [22.68, 91.05], true),
	16: generateZoneDetails(16, 'Safe Zone 1', 'Zone-16', 'safe', 20000, [23.1, 91.25], false),
	21: generateZoneDetails(21, 'Sakhipur', 'Zone-21', 'moderate', 33000, [22.88, 90.95], false),
	23: generateZoneDetails(23, 'Rampur', 'Safe Zone 2', 'safe', 18000, [22.9, 91.75], false),
};

export const overallStats = {
	activeDisasterZones: 12,
	affectedPeople: 1648896,
	safeZones: 2,
	shelterCapacity: 648896,
	highUrgencyNeeds: 6,
	criticalResourceNeeds: 'Food, Water, Medicine',
	reliefDistributionProgress: 25,
	delivered: 60,
	pending: 15,
};
