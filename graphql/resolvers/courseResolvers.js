import Course from "../../models/courseModel.js";

const courseResolvers = {
  Query: {
    courses: async () => {
      const courses = await Course.find({});
      return courses;
    },
    course: async (parent, arg) => {
      const course = await Course.findById(arg.id);
      console.log(arg.id);
      return course;
    },
  },
};

export default courseResolvers;
