export const huayraData = {
  brand: "PAGANI",
  model: "HUAYRA BC",
  edition: "MACCHINA VOLANTE",
  tagline: "The Flying Machine",
  year: "2017",
  price: "€2,600,000",
  units: "20",
  origin: "Modena, Italy",

  phases: [
    {
      id: "hero",
      scrollRange: [0, 0.25],
      label: "01 / ORIGIN",
      title: "HUAYRA BC",
      subtitle: "MACCHINA VOLANTE",
      description:
        "Named after Huayra-tata, the Andean god of wind. Born from 30 years of obsession. Each unit hand-assembled in Modena, Italy.",
      accent: "20 UNITS PRODUCED WORLDWIDE",
    },
    {
      id: "exterior",
      scrollRange: [0.25, 0.5],
      label: "02 / FORM",
      title: "CARBON SCULPTURE",
      subtitle: "AERODYNAMIC MASTERY",
      description:
        "The body carved from Carbotanium — a proprietary fusion of carbon fiber and titanium exclusive to Pagani. Drag coefficient: 0.31Cd.",
      accent: "CARBOTANIUM™ MONOCOQUE",
    },
    {
      id: "doors",
      scrollRange: [0.5, 0.75],
      label: "03 / RITUAL",
      title: "BUTTERFLY DOORS",
      subtitle: "THE THEATRE OF ENTRY",
      description:
        "Gullwing doors that rise 73° — titanium hinges, counterbalanced to perfection. Opening the Huayra BC is not an action. It is a ceremony.",
      accent: "TITANIUM HINGED GULLWING · 73°",
    },
    {
      id: "engine",
      scrollRange: [0.75, 1],
      label: "04 / POWER",
      title: "AMG V12 BITURBO",
      subtitle: "745 HP / 1,000 NM",
      description:
        "Mercedes-AMG M158 V12, hand-built. Twin turbos. 6.0 litres of pure mechanical theatre, fully visible through the open hood.",
      accent: "0–100 KM/H IN 2.8 SECONDS",
    },
  ],

  specs: [
    { label: "Engine", value: "V12 Biturbo", unit: "AMG" },
    { label: "Displacement", value: "6.0", unit: "Litres" },
    { label: "Power", value: "745", unit: "HP" },
    { label: "Torque", value: "1,000", unit: "NM" },
    { label: "Weight", value: "1,218", unit: "KG" },
    { label: "Top Speed", value: "380", unit: "KM/H" },
    { label: "0–100 KM/H", value: "2.8", unit: "SEC" },
    { label: "Units Built", value: "20", unit: "TOTAL" },
  ],

  features: [
    {
      number: "01",
      title: "Carbotanium Body",
      description:
        "A proprietary carbon-titanium composite developed exclusively for Pagani. 20% lighter than standard carbon fiber, 15% stronger.",
    },
    {
      number: "02",
      title: "Active Aerodynamics",
      description:
        "Four independent aerodynamic flaps respond to speed, braking, and cornering in real-time. Over 1,000 kg of downforce at 280 km/h.",
    },
    {
      number: "03",
      title: "Red Bespoke Interior",
      description:
        "Hand-stitched red leather, exposed titanium bolts, analog gauges — the interior is as mechanical and honest as the engine bay.",
    },
    {
      number: "04",
      title: "Track DNA",
      description:
        "Developed on the Nürburgring. Pushrod suspension, ceramic brakes, Pirelli P Zero Trofeo R — a race car with license plates.",
    },
  ],

  navLinks: ["STORY", "SPECS", "FEATURES", "CONTACT"],
} as const;
