import { Model, Table, Column, AutoIncrement, PrimaryKey, Unique, AllowNull } from "sequelize-typescript";

export interface IUser {
    id?: number | null;
    name: string;
    email: string;
    password: string;
}

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model implements IUser {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;


    @AllowNull(false)
    @Column
    name!: string;

    @Unique
    @AllowNull(false)
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    password!: string;
}
