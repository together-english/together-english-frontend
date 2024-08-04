import Image from "next/image";
import "../../styles/globals.css";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
    </main>
  );
}
