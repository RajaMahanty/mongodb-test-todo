const { z } = require("zod");

const signUpSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" })
        .trim()
        .regex(/^[a-zA-Z\s]*$/, {
            message: "Name can only contain letters and spaces",
        }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .toLowerCase()
        .trim()
        .max(100, { message: "Email cannot exceed 100 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password cannot exceed 100 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
        }),
});

const signInSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .toLowerCase()
        .trim()
        .max(100, { message: "Email cannot exceed 100 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password cannot exceed 100 characters" }),
});

const todoSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title cannot be empty" })
        .max(1000, { message: "Title cannot exceed 1000 characters" })
        .trim(),
    done: z.boolean().default(false),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});

module.exports = { signUpSchema, signInSchema, todoSchema };
