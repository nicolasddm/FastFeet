import Sequelize from 'sequelize';
import Recipient from '../models/Recipient';

const { gt, lte } = Sequelize.Op;

class RecipientController {
    async store(req, res) {
        const userExists = await Recipient.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res
                .status(400)
                .json({ error: 'This email is already in use.' });
        }

        const recipient = await Recipient.create(req.body);

        return res.json(recipient);
    }

    async update(req, res) {
        const recipient = await Recipient.findByPk(req.params.id);

        const { email } = req.body;

        if (email !== recipient.email) {
            const recipientExists = await Recipient.findOne({
                where: { email },
            });

            if (recipientExists) {
                return res
                    .status(400)
                    .json({ error: 'This email is already in use.' });
            }
        }
        const {
            name,
            street,
            number,
            complement,
            state,
            city,
            cep,
        } = await recipient.update(req.body);

        return res.json({
            name,
            email,
            street,
            number,
            complement,
            state,
            city,
            cep,
        });
    }

    async findOne(req, res) {
        const recipient = await Recipient.findByPk(req.params.id);
        if (!recipient) {
            return res.status(400).json({
                error: 'Recipient not find',
            });
        }
        return res.json(recipient);
    }

    async findAll(req, res) {
        const recipients = await Recipient.findAll({ order: ['id'] });
        if (!recipients) {
            return res.status(400).json({
                error: 'There are not any recipients',
            });
        }
        return res.json(recipients);
    }

    async delete(req, res) {
        const recipient = await Recipient.destroy({
            where: { id: req.params.id },
        });
        if (recipient === 0) {
            return res.status(400).json({
                error: `There is not a recipient with id ${req.params.id}`,
            });
        }
        if (recipient === 1) {
            return res.status(200).json({
                success: `Recipient with id ${req.params.id} was succesful deleted`,
            });
        }
        return recipient;
    }
}

export default new RecipientController();
