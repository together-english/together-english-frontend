import Image from "next/image";
import "../../../styles/globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="bg-blue-500 dark:bg-blue-700 text-white py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Join English Together</h1>
          <p className="text-lg mb-8">
            Connect with fellow English learners and practice in local cafes.
            Find study partners of similar English levels and make your learning
            fun and effective!
          </p>
          <Link
            href="/register"
            className="bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 기능 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Find Study Partners
              </h3>
              <p>
                Search for local study partners based on your English level and
                schedule sessions at nearby cafes.
              </p>
            </div>
            {/* 기능 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Level-Based Matching
              </h3>
              <p>
                Match with other learners at your English proficiency level for
                effective and engaging study sessions.
              </p>
            </div>
            {/* 기능 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Practice Questions</h3>
              <p>
                Access tailored English questions and practice materials to
                guide your learning and improve your skills.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
