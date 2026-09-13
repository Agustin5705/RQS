"use client";

import { useState } from "react";
import Link from "next/link";
import { rollSkillCheck, rollDamage, rollD20 } from "./logic";

export default function Home() {
  const [dieSize, setDieSize] = useState(6);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [damageResult, setDamageResult] = useState<
    (ReturnType<typeof rollDamage> & { location: number }) | null
  >(null);
  const [baseStat1, setBaseStat1] = useState(10);
  const [baseStat2, setBaseStat2] = useState(10);
  const [skill, setSkill] = useState(20);
  const [result, setResult] = useState<ReturnType<
    typeof rollSkillCheck
  > | null>(null);

  function handleSkillRoll() {
    const skillResult = rollSkillCheck(baseStat1, baseStat2, skill);
    setResult(skillResult);
  }

  return (
    <main>
      <h1>RuneQuest</h1>

      <section>
        <h2>Character Sheets</h2>

        <Link href="/modules/basic">Basic</Link>
      </section>

      <section>
        <h2>Custom Skill Roll</h2>

        <p>
          Base Stat 1:{" "}
          <input
            type="number"
            value={baseStat1}
            onChange={(e) => setBaseStat1(Number(e.target.value))}
          />
        </p>

        <p>
          Base Stat 2:{" "}
          <input
            type="number"
            value={baseStat2}
            onChange={(e) => setBaseStat2(Number(e.target.value))}
          />
        </p>

        <p>
          Skill:{" "}
          <input
            type="number"
            value={skill}
            onChange={(e) => setSkill(Number(e.target.value))}
          />
        </p>

        <button onClick={handleSkillRoll}>Roll Skill</button>

        {result && (
          <div>
            <p>Target: {result.target}</p>
            <p>Roll: {result.roll}</p>

            {result.critical && <p>CRITICAL</p>}
            {!result.critical && result.fumble && <p>FUMBLE</p>}
            {!result.critical && !result.fumble && result.success && (
              <p>SUCCESS</p>
            )}
            {!result.critical && !result.fumble && !result.success && (
              <p>FAILURE</p>
            )}
          </div>
        )}
      </section>
      <section>
        <h2>Custom Weapon Damage</h2>

        <p>
          Die Size:{" "}
          <input
            type="number"
            value={dieSize}
            onChange={(e) => setDieSize(Number(e.target.value))}
          />
        </p>

        <p>
          Number of Dice:{" "}
          <input
            type="number"
            value={numberOfDice}
            onChange={(e) => setNumberOfDice(Number(e.target.value))}
          />
        </p>

        <button
          onClick={() => {
            const damage = rollDamage(dieSize, numberOfDice);
            const location = rollD20();

            setDamageResult({
              ...damage,
              location,
            });
          }}
        >
          Roll Damage
        </button>

        {damageResult && (
          <div>
            <p>Rolls: {damageResult.rolls.join(", ")}</p>
            <p>Total: {damageResult.total}</p>
            <p>Hit Location: {damageResult.location}</p>
          </div>
        )}
      </section>
    </main>
  );
}
