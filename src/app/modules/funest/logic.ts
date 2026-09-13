export function calculateHP(con: number, siz: number) {
  const base = Math.floor(con + siz);

  return {
    total: base,
    chest: Math.floor(base / 2),
    abdomen: Math.floor(base / 3),
    leftLeg: Math.floor(base / 3),
    rightLeg: Math.floor(base / 3),
    leftArm: Math.floor(base / 4),
    rightArm: Math.floor(base / 4),
    head: Math.floor(base / 5),
  };
}

export function calculateNaturalSkill(
  base: string[],
  attributes: Record<string, number>,
) {
  return base.reduce((total, attribute) => {
    return total + (attributes[attribute] ?? 0);
  }, 0);
}

export function calculateFatigue(con: number, str: number) {
  return Math.floor((con + str) / 2);
}

export function calculateMagic(pow: number) {
  return Math.floor(pow / 2);
}

export function calculateInitiative(siz: number, dex: number, int: number) {
  return siz + dex + int;
}

export function calculateDamageModifier(str: number, siz: number) {
  return Math.round((str + siz) / 10);
}

export function calculateMagicModifier(int: number, pow: number) {
  return Math.round((int + pow) / 10);
}

export function calculateFatigueRecovery(con: number) {
  return Math.floor(con / 5);
}

export function calculateMagicRecovery(pow: number) {
  return Math.floor(pow / 10);
}

export function calculateMovementRate(dex: number, str: number, siz: number) {
  return dex + str + siz;
}

export function calculateActionsPerTurn(dex: number, int: number) {
  return Math.floor((int + dex) / 15);
}

export function calculateSkillRanges(target: number) {
  const criticalRange = Math.floor(target / 10);

  if (target >= 100) {
    return {
      target,
      criticalRange,
      fumbleRange: 0,
    };
  }

  const missRange = 100 - target;
  const fumbleRange = Math.ceil(missRange / 10);

  return {
    target,
    criticalRange,
    fumbleRange,
  };
}

export function calculateRollResult(roll: number, target: number) {
  const { criticalRange, fumbleRange } = calculateSkillRanges(target);

  if (target >= 100) {
    if (roll === 100) {
      return "failure";
    }

    if (roll <= criticalRange) {
      return "critical";
    }

    return "success";
  }

  if (roll <= criticalRange) {
    return "critical";
  }

  if (roll <= target) {
    return "success";
  }

  if (roll >= 101 - fumbleRange) {
    return "fumble";
  }

  return "failure";
}

export function rollD100() {
  return Math.floor(Math.random() * 100) + 1;
}

export function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

export function rollWeaponDamage(damage: string, numberOfDice: number) {
  const dieSize = Number(damage.slice(1));
  const rolls: number[] = [];

  for (let i = 0; i < numberOfDice; i++) {
    rolls.push(Math.floor(Math.random() * dieSize) + 1);
  }

  return {
    rolls,
    total: rolls.reduce((sum, roll) => sum + roll, 0),
  };
}

export function calculateArmorAllowance(con: number, str: number) {
  return Math.floor((con + str) / 4);
}
