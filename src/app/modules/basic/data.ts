export const weapons = [
  {
    name: "Sword",
    type: "Sword",
    damage: "d6",
    integrity: 6,
    size: 2,
    reach: 2,
    fatigue: 2,
    magic: 0,
    critical: "D/M/S",
  },
  {
    name: "Axe",
    type: "Axe",
    damage: "d8",
    integrity: 6,
    size: 2,
    reach: 2,
    fatigue: 3,
    magic: 0,
    critical: "D",
  },
];

export const stuff = [{ name: "Food" }];

export const skills = [
  {
    name: "Athletics",
    base: ["str", "con"],
  },
  {
    name: "Survival",
    base: ["dex", "int"],
  },
  {
    name: "Knowledge",
    base: ["int", "int"],
  },
  {
    name: "Communication",
    base: ["int", "pow"],
  },
  {
    name: "Evade",
    base: ["con", "dex"],
  },
  {
    name: "Willpower",
    base: ["pow", "pow"],
  },
  {
    name: "Wizardry",
    base: ["int", "dex"],
  },
  {
    name: "Spirit Magic",
    base: ["dex", "pow"],
  },
  {
    name: "Covenant",
    base: ["int", "pow"],
  },
  {
    name: "Blades",
    base: ["str", "dex"],
  },
  {
    name: "Heavies",
    base: ["str", "siz"],
  },
  {
    name: "Polearms",
    base: ["con", "dex"],
  },
  {
    name: "Bows",
    base: ["dex", "con"],
  },
  {
    name: "Ropes",
    base: ["dex", "dex"],
  },
  {
    name: "Shields",
    base: ["str", "con"],
  },
  {
    name: "Unarmed",
    base: ["dex", "pow"],
  },
];
