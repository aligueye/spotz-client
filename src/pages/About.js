import React from "react";

const About = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">About CampusHome</h1>
      <p className="text-lg mb-4">
        CampusHome is a startup dedicated to bridging the gap between
        college-aged renters and landlords. Our platform is designed to create a
        seamless and stress-free experience for both parties involved in the
        rental process.
      </p>
      <p className="text-lg mb-4">
        We understand that finding a suitable place to live while attending
        college can be a daunting task for students. At the same time, landlords
        may struggle to find responsible and reliable tenants. CampusHome aims
        to address these challenges by offering a user-friendly platform that
        simplifies the rental process for both students and landlords.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
      <p className="text-lg mb-4">
        Our mission is to provide a safe, efficient, and transparent platform
        for college students to find and secure their perfect home away from
        home. We strive to make the rental experience enjoyable and hassle-free
        for both students and landlords, enabling them to focus on what truly
        matters: education and personal growth.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Why Choose CampusHome?</h2>
      <ul className="list-disc pl-8 mb-4">
        <li className="text-lg mb-2">
          Easy-to-use platform tailored to the unique needs of college-aged
          renters and landlords
        </li>
        <li className="text-lg mb-2">
          In-depth listings with detailed descriptions, photos, and virtual
          tours
        </li>
        <li className="text-lg mb-2">
          Secure messaging system to facilitate communication between students
          and landlords
        </li>
        <li className="text-lg mb-2">
          Trusted and verified landlords offering quality housing options
        </li>
        <li className="text-lg mb-2">
          Dedicated support team committed to ensuring a positive user
          experience
        </li>
      </ul>
      <p className="text-lg">
        CampusHome is here to help you find the perfect rental property near
        your college or university. Join us today and experience the difference.
      </p>
    </div>
  );
};

export default About;
