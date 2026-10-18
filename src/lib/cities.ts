// Real Philippine regions + cities. The pageant frames "all 149 cities"; this is a
// representative real subset across every one of the 17 regions used for the demo.

export type Region = {
  id: string;
  name: string;
  short: string;
  slug: string;
};

export type City = {
  id: string;
  name: string;
  slug: string;
  regionId: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type RegionSeed = {
  name: string;
  short: string;
  cities: string[];
};

const SEED: RegionSeed[] = [
  {
    name: "National Capital Region",
    short: "NCR",
    cities: [
      "Manila", "Quezon City", "Makati", "Taguig", "Pasig", "Caloocan",
      "Parañaque", "Las Piñas", "Muntinlupa", "Marikina", "Pasay",
      "Mandaluyong", "San Juan", "Valenzuela", "Malabon", "Navotas",
    ],
  },
  {
    name: "Cordillera Administrative Region",
    short: "CAR",
    cities: ["Baguio", "Tabuk"],
  },
  {
    name: "Ilocos Region",
    short: "Region I",
    cities: [
      "Laoag", "Batac", "Vigan", "Candon", "San Fernando (La Union)",
      "Dagupan", "San Carlos (Pangasinan)", "Urdaneta", "Alaminos",
    ],
  },
  {
    name: "Cagayan Valley",
    short: "Region II",
    cities: ["Tuguegarao", "Ilagan", "Cauayan", "Santiago"],
  },
  {
    name: "Central Luzon",
    short: "Region III",
    cities: [
      "San Fernando (Pampanga)", "Angeles", "Mabalacat", "Olongapo",
      "Balanga", "Malolos", "Meycauayan", "San Jose del Monte",
      "Cabanatuan", "Gapan", "Palayan", "Muñoz", "Tarlac City",
    ],
  },
  {
    name: "CALABARZON",
    short: "Region IV-A",
    cities: [
      "Antipolo", "Calamba", "Santa Rosa", "Biñan", "Cabuyao", "San Pedro",
      "San Pablo", "Batangas City", "Lipa", "Tanauan", "Bacoor",
      "Dasmariñas", "Imus", "General Trias", "Trece Martires", "Tagaytay",
      "Cavite City", "Lucena",
    ],
  },
  {
    name: "MIMAROPA",
    short: "Region IV-B",
    cities: ["Calapan", "Puerto Princesa"],
  },
  {
    name: "Bicol Region",
    short: "Region V",
    cities: [
      "Legazpi", "Ligao", "Tabaco", "Naga (Camarines Sur)", "Iriga",
      "Sorsogon City", "Masbate City",
    ],
  },
  {
    name: "Western Visayas",
    short: "Region VI",
    cities: [
      "Iloilo City", "Passi", "Bacolod", "Bago", "Cadiz", "Kabankalan",
      "La Carlota", "Sagay", "San Carlos (Negros)", "Silay", "Talisay (Negros)",
      "Victorias", "Roxas",
    ],
  },
  {
    name: "Central Visayas",
    short: "Region VII",
    cities: [
      "Cebu City", "Mandaue", "Lapu-Lapu", "Talisay (Cebu)", "Toledo",
      "Carcar", "Danao", "Bogo", "Naga (Cebu)", "Tagbilaran", "Dumaguete",
      "Bais", "Bayawan", "Tanjay",
    ],
  },
  {
    name: "Eastern Visayas",
    short: "Region VIII",
    cities: [
      "Tacloban", "Ormoc", "Baybay", "Calbayog", "Catbalogan",
      "Borongan", "Maasin",
    ],
  },
  {
    name: "Zamboanga Peninsula",
    short: "Region IX",
    cities: ["Zamboanga City", "Dapitan", "Dipolog", "Pagadian", "Isabela City"],
  },
  {
    name: "Northern Mindanao",
    short: "Region X",
    cities: [
      "Cagayan de Oro", "Iligan", "El Salvador", "Gingoog", "Malaybalay",
      "Valencia", "Oroquieta", "Ozamiz", "Tangub",
    ],
  },
  {
    name: "Davao Region",
    short: "Region XI",
    cities: ["Davao City", "Digos", "Tagum", "Panabo", "Samal", "Mati"],
  },
  {
    name: "SOCCSKSARGEN",
    short: "Region XII",
    cities: ["General Santos", "Koronadal", "Tacurong", "Kidapawan"],
  },
  {
    name: "Caraga",
    short: "Region XIII",
    cities: [
      "Butuan", "Cabadbaran", "Surigao City", "Bislig", "Bayugan", "Tandag",
    ],
  },
  {
    name: "Bangsamoro",
    short: "BARMM",
    cities: ["Cotabato City", "Marawi", "Lamitan"],
  },
];

export const REGIONS: Region[] = SEED.map((r) => ({
  id: slugify(r.short),
  name: r.name,
  short: r.short,
  slug: slugify(r.name),
}));

export const CITIES: City[] = SEED.flatMap((r) => {
  const regionId = slugify(r.short);
  return r.cities.map((name) => ({
    id: slugify(name),
    name,
    slug: slugify(name),
    regionId,
  }));
});

/** The pageant's headline figure — every chartered city in the Philippines. */
export const TOTAL_PH_CITIES = 149;

export const regionById = (id: string) => REGIONS.find((r) => r.id === id);
export const cityById = (id: string) => CITIES.find((c) => c.id === id);
export const citiesInRegion = (regionId: string) =>
  CITIES.filter((c) => c.regionId === regionId);
