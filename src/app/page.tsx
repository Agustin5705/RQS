import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>RuneQuest</h1>

      <section>
        <h2>Character Sheets</h2>

        <Link href="/modules/basic">Basic</Link>
      </section>
    </main>
  );
}
