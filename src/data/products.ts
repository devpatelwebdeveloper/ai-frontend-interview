export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export const products: Product[] = [
  { id: "p01", name: "Ridgeline 2 Tent", category: "Tents", price: 329 },
  { id: "p02", name: "Ridgeline 4 Tent", category: "Tents", price: 459 },
  { id: "p03", name: "Alpine Ascent Tent", category: "Tents", price: 649 },
  { id: "p04", name: "Trekker Ultralight Tent", category: "Tents", price: 399 },
  { id: "p05", name: "Summit 45 Backpack", category: "Packs", price: 189 },
  { id: "p06", name: "Summit 65 Backpack", category: "Packs", price: 249 },
  { id: "p07", name: "Trailrunner 20 Daypack", category: "Packs", price: 89 },
  { id: "p08", name: "Tote Trail Sling", category: "Packs", price: 45 },
  { id: "p09", name: "Basecamp Stove", category: "Cooking", price: 119 },
  { id: "p10", name: "Microburn Stove", category: "Cooking", price: 59 },
  { id: "p11", name: "Titanium Pot Set", category: "Cooking", price: 79 },
  { id: "p12", name: "Ember 20 Sleeping Bag", category: "Sleep", price: 279 },
  { id: "p13", name: "Drift 40 Sleeping Bag", category: "Sleep", price: 99 },
  { id: "p14", name: "Cloudrest Sleeping Pad", category: "Sleep", price: 149 },
  { id: "p15", name: "Stormshell Rain Jacket", category: "Clothing", price: 199 },
  { id: "p16", name: "Thermal Puffy Jacket", category: "Clothing", price: 229 },
  { id: "p17", name: "Trail Merino T-Shirt", category: "Clothing", price: 65 },
  { id: "p18", name: "Beam 400 Headlamp", category: "Lighting", price: 49 },
  { id: "p19", name: "Lantern Glow 300", category: "Lighting", price: 39 },
  { id: "p20", name: "Clearflow Water Filter", category: "Water", price: 39 },
  { id: "p21", name: "TrekPro Trekking Poles", category: "Accessories", price: 129 },
  { id: "p22", name: "Canyon Camp Chair", category: "Furniture", price: 69 },
  { id: "p23", name: "Tarp Shelter Pro", category: "Tents", price: 139 },
  { id: "p24", name: "Trail Mix Snack Pack", category: "Food", price: 12 },
];
