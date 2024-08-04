import Link from "next/link";

export const metadata = {
  title: "About us",
};

export default function aboutUs() {
  return (
    <div>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* About Us 섹션 */}
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-12">About Us</h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
              <p className="mb-6">
                English Together aims to connect English learners in their local
                communities and help them practice English in a relaxed,
                informal setting. We believe that learning English should be
                engaging and practical, and what better way to achieve that than
                by practicing with others who share the same goals?
              </p>
              <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
              <p className="mb-6">
                Founded by a group of passionate English educators and
                technology enthusiasts, English Together started with the vision
                of creating a platform that makes language learning more
                accessible and enjoyable. We saw the potential in combining
                technology with real-world interactions, and thus, our platform
                was born.
              </p>
              <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">John Doe</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Co-Founder & CEO
                  </p>
                  <p className="mt-2">
                    John has a background in education and technology, and he
                    leads the team with a vision to transform language learning.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Jane Smith</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Co-Founder & CTO
                  </p>
                  <p className="mt-2">
                    Jane is a tech enthusiast who is passionate about building
                    innovative solutions that make learning more effective.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Alice Johnson</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Community Manager
                  </p>
                  <p className="mt-2">
                    Alice connects with users to ensure their needs are met and
                    their feedback is heard, making sure our platform remains
                    user-centric.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
