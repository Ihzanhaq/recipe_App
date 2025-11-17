import React from 'react'

const About = () => {
  return (
    <div className="container pb-5">
      <h1 style={{ fontSize: "4rem" }} className="font-color1 text-center">
        Our Story
      </h1>

      <p className="w-75 mx-auto fs-5 text-center">
        TastyBites was born from a simple idea: make cooking accessible,
        enjoyable, and delicious for everyone. We believe that great food brings
        people together and creates lasting memories.
      </p>
      <div className="img-container p-5">
        <img
          src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
          alt="about"
          width={"100%"}
          height={"500px"}
          style={{ objectFit: "cover" }}
          className="rounded-4"
        />
      </div>
      <div className="mission text-center bg-white p-5 rounded-4 shadow mb-5    ">
        <h3>Our Mission</h3>
        <p>
          We're on a mission to inspire home cooks to create delicious,
          wholesome meals that bring joy to their tables. Through easy-to-follow
          recipes, beautiful photography, and a supportive community, we make
          cooking an adventure worth taking.
        </p>
      </div>
    </div>
  );
}

export default About