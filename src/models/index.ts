import sequelize from "../helpers/db";
import { User } from "./user.modal";

const dbInit = async () => {
    await sequelize.sync({ force: false });
};

export { dbInit, User };
