const { z } = require("zod");

// Creating an object schema

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(50, { message: "Username must be less than 20 characters long" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be atleast 5 characters long" })
    .max(255, { message: "Email must be less than 50 characters long" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 characters long" })
    .max(10, { message: "Phone must be less than 10 characters long" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be atleast 6 characters long" })
    .max(1024, { message: "Password must be less than 255 characters long" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be atleast 5 characters long" })
    .max(255, { message: "Email must be less than 50 characters long" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be atleast 6 characters long" })
    .max(1024, { message: "Password must be less than 255 characters long" }),
});

module.exports = { signupSchema, loginSchema };
