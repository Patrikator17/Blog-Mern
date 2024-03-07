import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-12 px-6 sm:px-12 lg:px-24 xl:px-36">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Welcome to Our Blog Application
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Our blog application is designed to offer an immersive experience for
          both users and administrators. Here's a glimpse of what we offer:
        </p>

        <div className="flex flex-col space-y-8">
          {/* Key Features */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <ul className="list-disc list-inside">
              <li>Authentication and Authorization</li>
              <li>User Roles and Privileges</li>
              <li>Firebase Integration for Image Storage</li>
              <li>Redux-Persist for State Management</li>
              <li>OAuth and Dark Theme Support</li>
              <li>Dashboard for Administrators</li>
              <li>Search Functionality with Filters</li>
              <li>Granular Access Control</li>
            </ul>
          </div>

          {/* Technical Stack */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Technical Stack
            </h2>
            <ul className="list-disc list-inside">
              <li>Frontend: Vite React, React Router DOM, Redux Toolkit</li>
              <li>Backend: Node.js, Express.js, MongoDB, Mongoose</li>
              <li>State Management: Redux-Persist</li>
              <li>Authentication: JWT Tokenization, Cookie Parsing</li>
              <li>Image Storage: Firebase</li>
              <li>OAuth Integration: Firebase</li>
              <li>Dark Theme: Tailwind CSS, Redux Toolkit</li>
              <li>Dashboard: React Components, Axios for API calls</li>
              <li>Search Functionality: MongoDB queries, React Components</li>
              <li>Access Control: Middleware in Express.js</li>
            </ul>
          </div>

          {/* Additional Content */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Additional Content
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our mission is to provide a seamless and secure blogging
              experience to our users while empowering administrators with
              robust management capabilities. Through the integration of
              cutting-edge technologies and careful attention to user
              experience, we deliver a feature-rich application that meets the
              diverse needs of our audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
