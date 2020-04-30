import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                street: Sequelize.STRING,
                number: Sequelize.STRING,
                complement: Sequelize.STRING,
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                cep: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Recipient;
