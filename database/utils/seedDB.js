const { Campus, Student } = require('../models');

const seedDB = async () => {
  // Create campuses
  const dummy_campus = await Campus.create({
    name: "Hunter College",
    address: "695 Park Ave, New York, NY 10065",
    description: "This is a school in New York, New York."
  });
  
  const dummy_campus2 = await Campus.create({
    name: "Queens College",
    address: "65-30 Kissena Blvd, Queens, NY 11367",
    description: "This is a school in Queens, New York."
  });

  // Create students with all fields
  const dummy_student = await Student.create({
    firstname: "Joe",
    lastname: "Smith",
    email: "joe.smith@example.com",
    gpa: 3.5,
    imageUrl: "/student1.jpg"
  });

  const dummy_student2 = await Student.create({
    firstname: "Mary",
    lastname: "Johnson",
    email: "mary.johnson@example.com",
    gpa: 3.8,
    imageUrl: "/student2.jpg"
  });

  // Add students to campuses
  await dummy_student.setCampus(dummy_campus);
  await dummy_student2.setCampus(dummy_campus2);
}

module.exports = seedDB;