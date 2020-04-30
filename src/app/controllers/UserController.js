import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res
                .status(400)
                .json({ error: 'This email is already in use.' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res
                    .status(400)
                    .json({ error: 'This email is already in use.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    async findOne(req, res) {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(400).json({
                error: 'User not find',
            });
        }
        return res.json(user);
    }

    async findAll(req, res) {
        const users = await User.findAll({ order: ['id'] });
        if (!users) {
            return res.status(400).json({
                error: 'There are not any user',
            });
        }
        return res.json(users);
    }

    async delete(req, res) {
        const user = await User.destroy({
            where: { id: req.params.id },
        });
        if (user === 0) {
            return res.status(400).json({
                error: `There is not a user with id ${req.params.id}`,
            });
        }
        if (user === 1) {
            return res.status(200).json({
                success: `User with id ${req.params.id} was succesful deleted`,
            });
        }
        return user;
    }
}

export default new UserController();
