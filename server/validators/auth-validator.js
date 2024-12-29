const {z} = require('zod');


const loginSchema = z.object({
    email: z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'invalid email address'})
    .min(3, {message: 'Email must be atleast 3 characters'})
    .max(255, {message: 'Email must not be more than 255 characters'}),
    password: z
    .string({required_error: 'Passowrd is required'})
    .min(7, {message: 'Password must be atleast 7 characters'})
    .max(255, {message: 'Password must not be more than 255 characters'}),
})


const singupSchema = loginSchema.extend({
    username: z
    .string({required_error: 'Name is required'})
    .trim()
    .min(3, {message: 'Name must be atleast 3 characters'})
    .max(255, {message: 'Name must not be more than 255 characters'}),
    email: z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'invalid email address'})
    .min(3, {message: 'Email must be atleast 3 characters'})
    .max(255, {message: 'Email must not be more than 255 characters'}),
    password: z
    .string({required_error: 'Passowrd is required'})
    .min(7, {message: 'Password must be atleast 7 characters'})
    .max(255, {message: 'Password must not be more than 255 characters'}),
    phone: z
    .string({required_error: 'Phone number is required'})
    .trim()
    .min(10, {message: 'Phone number must be atleast 10 characters'})
    .max(10, {message: 'Invalid number'}),
   
});

module.exports = singupSchema;