"use client";

import "./styles.css";

import { useState } from "react";
import {
  calculateHP,
  calculateFatigue,
  calculateMagic,
  calculateInitiative,
  calculateDamageModifier,
  calculateMagicModifier,
  calculateFatigueRecovery,
  calculateMagicRecovery,
  calculateMovementRate,
  calculateActionsPerTurn,
  calculateNaturalSkill,
  calculateRollResult,
  calculateSkillRanges,
  rollD100,
  rollD20,
  rollWeaponDamage,
} from "./logic";

import { skills, weapons, stuff } from "./data";

export default function BasicPage() {
  const [str, setStr] = useState(10);
  const [con, setCon] = useState(10);
  const [siz, setSiz] = useState(10);
  const [dex, setDex] = useState(10);
  const [int, setInt] = useState(10);
  const [pow, setPow] = useState(10);

  const [skillValues, setSkillValues] = useState<Record<string, number>>({});

  const [preparedRoll, setPreparedRoll] = useState<{
    skill: string;
    natural: number;
    skillValue: number;
    target: number;
    criticalRange: number;
    fumbleRange: number;
  } | null>(null);

  const [rollResult, setRollResult] = useState<{
    roll: number;
    result: string;
  } | null>(null);

  const [weaponDamage, setWeaponDamage] = useState<
    ({
      weapon: string;
      rolls: number[];
      total: number;
      location: number;
    } | null)[]
  >([null, null, null, null]);

  const hp = calculateHP(con, siz);
  const fatigue = calculateFatigue(con, str);
  const magic = calculateMagic(pow);
  const [currentFatigue, setCurrentFatigue] = useState(fatigue);
  const [currentMagic, setCurrentMagic] = useState(magic);
  const initiative = calculateInitiative(siz, dex, int);
  const damageModifier = calculateDamageModifier(str, siz);
  const magicModifier = calculateMagicModifier(int, pow);
  const fatigueRecovery = calculateFatigueRecovery(con);
  const magicRecovery = calculateMagicRecovery(pow);
  const movementRate = calculateMovementRate(dex, str, siz);
  const actionsPerTurn = calculateActionsPerTurn(int, dex);

  const [currentHP, setCurrentHP] = useState({
    head: hp.head,
    chest: hp.chest,
    leftArm: hp.leftArm,
    rightArm: hp.rightArm,
    abdomen: hp.abdomen,
    leftLeg: hp.leftLeg,
    rightLeg: hp.rightLeg,
  });

  const attributes = {
    str,
    con,
    siz,
    dex,
    int,
    pow,
  };

  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const [selectedStuff, setSelectedStuff] = useState<
    { name: string; quantity: number }[]
  >([
    { name: "", quantity: 0 },
    { name: "", quantity: 0 },
    { name: "", quantity: 0 },
    { name: "", quantity: 0 },
    { name: "", quantity: 0 },
  ]);

  function handleRoll() {
    if (!preparedRoll) return;

    const roll = rollD100();
    const result = calculateRollResult(roll, preparedRoll.target);

    setRollResult({
      roll,
      result,
    });
  }

  return (
    <main className="sheet">
      <h1 className="text-center sheet-title">RUNEQUEST BASIC</h1>

      <section className="character">
        <h2>Information</h2>
        <div className="character-info">
          <label>
            Name
            <input type="string" onChange={(e) => String(e.target.value)} />
          </label>
          <label>
            Player
            <input type="string" onChange={(e) => String(e.target.value)} />
          </label>
          <label>
            Main Background
            <input type="string" onChange={(e) => String(e.target.value)} />
          </label>
          <label>
            Secondary Background
            <input type="string" onChange={(e) => String(e.target.value)} />
          </label>
        </div>
      </section>

      <section className="attributes">
        <h2>Attributes</h2>

        <div className="attribute-list">
          <label>
            STR
            <input
              type="number"
              value={str}
              onChange={(e) => setStr(Number(e.target.value))}
            />
          </label>

          <label>
            CON
            <input
              type="number"
              value={con}
              onChange={(e) => setCon(Number(e.target.value))}
            />
          </label>

          <label>
            SIZ
            <input
              type="number"
              value={siz}
              onChange={(e) => setSiz(Number(e.target.value))}
            />
          </label>

          <label>
            DEX
            <input
              type="number"
              value={dex}
              onChange={(e) => setDex(Number(e.target.value))}
            />
          </label>

          <label>
            INT
            <input
              type="number"
              value={int}
              onChange={(e) => setInt(Number(e.target.value))}
            />
          </label>

          <label>
            POW
            <input
              type="number"
              value={pow}
              onChange={(e) => setPow(Number(e.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="skills">
        <h2>Skills</h2>

        {skills.map((skill) => {
          const natural = calculateNaturalSkill(skill.base, attributes);
          const skillValue = skillValues[skill.name] ?? 0;
          const total = natural + skillValue;

          return (
            <div className="skill-row" key={skill.name}>
              <span>{skill.name} </span>

              <input
                className="skill-input"
                type="number"
                value={skillValue}
                onChange={(e) =>
                  setSkillValues({
                    ...skillValues,
                    [skill.name]: Number(e.target.value),
                  })
                }
              />

              <span>
                Natural: {skill.base.join(" + ")} ({natural}) total = {total}
              </span>

              <button
                onClick={() => {
                  const ranges = calculateSkillRanges(total);

                  setPreparedRoll({
                    skill: skill.name,
                    natural,
                    skillValue,
                    target: total,
                    criticalRange: ranges.criticalRange,
                    fumbleRange: ranges.fumbleRange,
                  });
                }}
              >
                Prepare Roll
              </button>
            </div>
          );
        })}
      </section>

      <section className="derived">
        <h2>Derived Stats</h2>

        <p>
          Head: {hp.head} /{" "}
          <input
            type="number"
            value={currentHP.head}
            onChange={(e) =>
              setCurrentHP({
                ...currentHP,
                head: Number(e.target.value),
              })
            }
          />
        </p>
        <p>
          Chest: {hp.chest}/{" "}
          <input
            type="number"
            value={currentHP.chest}
            onChange={(e) =>
              setCurrentHP({
                ...currentHP,
                head: Number(e.target.value),
              })
            }
          />
        </p>
        <p>
          Left Arm: {hp.leftArm}/{" "}
          <input
            type="number"
            value={currentHP.leftArm}
            onChange={(e) =>
              setCurrentHP({
                ...currentHP,
                head: Number(e.target.value),
              })
            }
          />
        </p>
        <p>
          Right Arm: {hp.rightArm}/{" "}
          <input
            type="number"
            value={currentHP.rightArm}
            onChange={(e) =>
              setCurrentHP({
                ...currentHP,
                head: Number(e.target.value),
              })
            }
          />
        </p>
        <p>
          Abdomen: {hp.abdomen}/{" "}
          <input
            type="number"
            value={currentHP.abdomen}
            onChange={(e) =>
              setCurrentHP({
                ...currentHP,
                head: Number(e.target.value),
              })
            }
          />
        </p>
        <p>
          Left Leg: {hp.leftLeg}/{" "}
          <input
            type="number"
            value={currentHP.leftLeg}
            onChange={(e) =>
              setCurrentHP({
                ...currentHP,
                head: Number(e.target.value),
              })
            }
          />
        </p>
        <p>
          Right Leg: {hp.rightLeg}/{" "}
          <input
            type="number"
            value={currentHP.rightLeg}
            onChange={(e) =>
              setCurrentHP({
                ...currentHP,
                head: Number(e.target.value),
              })
            }
          />
        </p>

        <p>
          Fatigue: {fatigue} /
          <input
            type="number"
            value={currentFatigue}
            onChange={(e) => setCurrentFatigue(Number(e.target.value))}
          />
        </p>
        <p>
          Magic: {magic} /{" "}
          <input
            type="number"
            value={currentMagic}
            onChange={(e) => setCurrentMagic(Number(e.target.value))}
          />
        </p>
        <p>Initiative: {initiative}</p>
        <p>Damage Modifier: {damageModifier}</p>
        <p>Magic Modifier: {magicModifier}</p>
        <p>Fatigue Recovery: {fatigueRecovery}</p>
        <p>Magic Recovery: {magicRecovery}</p>
        <p>Movement Rate: {movementRate}</p>
        <p>Actions Per Turn: {actionsPerTurn}</p>
      </section>

      <section className="prepared-roll">
        <h2>Prepared Roll</h2>

        {preparedRoll ? (
          <div>
            <p>Skill: {preparedRoll.skill}</p>
            <p>Natural: {preparedRoll.natural}</p>
            <p>Skill Value: {preparedRoll.skillValue}</p>
            <p>Target: {preparedRoll.target}</p>
            <p>Critical Range: {preparedRoll.criticalRange}</p>
            <p>Fumble Range: {preparedRoll.fumbleRange}</p>

            <button onClick={handleRoll}>Roll</button>

            {rollResult && (
              <div>
                <p>Roll: {rollResult.roll}</p>
                <p>Result: {rollResult.result}</p>
              </div>
            )}
          </div>
        ) : (
          <p>No roll prepared.</p>
        )}
      </section>

      <section className="weapons">
        <h2>Weapons</h2>

        {selectedWeapons.map((selectedWeapon, index) => {
          const weapon = weapons.find(
            (weapon) => weapon.name === selectedWeapon,
          );

          return (
            <div key={index}>
              <select
                value={selectedWeapon}
                onChange={(e) => {
                  const updatedWeapons = [...selectedWeapons];
                  updatedWeapons[index] = e.target.value;
                  setSelectedWeapons(updatedWeapons);
                }}
              >
                <option value="">Select weapon</option>

                {weapons.map((weapon) => (
                  <option key={weapon.name} value={weapon.name}>
                    {weapon.name}
                  </option>
                ))}
              </select>

              {weapon && (
                <div className="weapon-details">
                  <p>Type: {weapon.type}</p>
                  <p>Damage: {weapon.damage}</p>
                  <p>Integrity: {weapon.integrity}</p>
                  <p>Size: {weapon.size}</p>
                  <p>Reach: {weapon.reach}</p>
                  <p>Fatigue: {weapon.fatigue}</p>
                  <p>Magic: {weapon.magic}</p>
                  <p>Critical: {weapon.critical}</p>

                  <button
                    onClick={() => {
                      const damage = rollWeaponDamage(
                        weapon.damage,
                        damageModifier,
                      );

                      const updatedDamage = [...weaponDamage];

                      const location = rollD20();

                      updatedDamage[index] = {
                        weapon: weapon.name,
                        rolls: damage.rolls,
                        total: damage.total,
                        location,
                      };

                      setWeaponDamage(updatedDamage);
                    }}
                  >
                    Roll Damage
                  </button>

                  {weaponDamage[index] && (
                    <div className="damage-result">
                      <p>Damage Roll: {weaponDamage[index]!.weapon}</p>
                      <p>
                        {weaponDamage[index]!.rolls.join(" + ")} ={" "}
                        {weaponDamage[index]!.total}
                      </p>
                      <p>Location: {weaponDamage[index]!.location}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section className="stuff">
        <h2>Stuff</h2>

        {selectedStuff.map((item, index) => (
          <div key={index}>
            <select
              value={item.name}
              onChange={(e) => {
                const updatedStuff = [...selectedStuff];
                updatedStuff[index].name = e.target.value;
                setSelectedStuff(updatedStuff);
              }}
            >
              <option value="">Select item</option>

              {stuff.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const updatedStuff = [...selectedStuff];
                updatedStuff[index].quantity = Number(e.target.value);
                setSelectedStuff(updatedStuff);
              }}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
