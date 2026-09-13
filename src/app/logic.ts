export function rollD100() {
  return Math.floor(Math.random() * 100) + 1;
}

export function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

export function calculateSkillTarget(
  baseStat1: number,
  baseStat2: number,
  skill: number,
) {
  return Math.floor(baseStat1 + baseStat2 + skill);
}

export function rollDamage(dieSize: number, numberOfDice: number) {
  const rolls: number[] = [];

  for (let i = 0; i < numberOfDice; i++) {
    rolls.push(Math.floor(Math.random() * dieSize) + 1);
  }

  return {
    rolls,
    total: rolls.reduce((sum, roll) => sum + roll, 0),
  };
}

export function rollSkillCheck(
  baseStat1: number,
  baseStat2: number,
  skill: number,
) {
  const target = calculateSkillTarget(baseStat1, baseStat2, skill);
  const roll = rollD100();

  const criticalRange = Math.floor(target * 0.1);
  const failureRange = 100 - target;
  const fumbleRange = Math.ceil(failureRange * 0.1);

  const critical = roll <= criticalRange;
  const fumble = roll > 100 - fumbleRange;
  const success = roll <= target;

  return {
    target,
    roll,
    critical,
    fumble,
    success,
  };
}
