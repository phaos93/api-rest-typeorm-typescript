import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../helpers/api-errors";

export class LoginController {
    async create(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await userRepository.findOneBy({ email });
        if (!user) {
            throw new BadRequestError('invalid e-mail or password')
        }

        const verifyPass = await bcrypt.compare(password, user.password);

        if (!verifyPass) {
            throw new BadRequestError('invalid e-mail or password')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '1d' });

            const {password:_, ...userLogin} = user

            return res.json({
                user: userLogin,
                token: token
            });
    }
}