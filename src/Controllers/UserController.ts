import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import { BadRequestError } from "../helpers/api-errors";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        const userExists = await userRepository.findOneBy({ email });
        if (userExists) {
            throw new BadRequestError('user already exists')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
                name,
                email,
                password: hashPassword
            });

            await userRepository.save(newUser);

            return res.status(200).json({ message: 'user created successfully' });
    }
}