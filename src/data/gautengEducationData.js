// All metrics are sourced from public GDE, SA Government, and SAnews data.
// See sources.js for full citation details.

export const GAUTENG_METRICS = {
  learnerScale: {
    totalEnrolled: 2832716,
    publicOrdinaryLearners: 2356056,
    growthSince1995Pct: 70.4,
    annualGrowthRatePct: 2,
    source: "GDE NCOP Briefing · March 2025",
  },

  admissions2026: {
    totalPlaced: 392224,
    lateApplications: 33650,
    lateApplicationPct: 8.5,
    placementRatePct: 98,
    yearsOnline: 10,
    fullyPlacedBy: "3 March 2026",
    newSchoolsAnnounced: 18,
    lateWindowStart: "17 December 2025",
    lateWindowEnd: "30 January 2026",
    applicationWindowStart: "24 July 2025",
    applicationWindowEnd: "29 August 2025",
    source: "SA Government · 4 March 2026",
  },

  januarySnapshot: {
    snapshotDate: "6 January 2026",
    totalUnplaced: 4858,
    completeApplications: 358574,
    unplacedPct: 1.5,
    grade1Unplaced: 1381,
    grade8Unplaced: 3477,
    ekurhuleniUnplaced: 3169,
    jhbEastUnplaced: 1173,
    lateApplicationsAtDate: 11183,
    appealsLodged: 6736,
    source: "SAnews · 7 January 2026",
  },

  capacity: {
    satelliteSpaces: 4417,
    source: "GDE · 12 February 2025",
  },

  districts: [
    { name: "Ekurhuleni",          pressure: "High",      unplacedJan: 3169, source: "SAnews · Jan 2026" },
    { name: "Johannesburg East",   pressure: "High",      unplacedJan: 1173, source: "SAnews · Jan 2026" },
    { name: "Tshwane",             pressure: "Medium",    unplacedJan: null,  source: "SAnews · Jan 2026" },
    { name: "West Rand",           pressure: "Available", unplacedJan: null,  source: "SAnews · Jan 2026" },
    { name: "Sedibeng",            pressure: "Available", unplacedJan: null,  source: "SAnews · Jan 2026" },
  ],
};
