import { Table, Model, Column, DataType } from "sequelize-typescript";

// 管理者
@Table({
    tableName: "admin",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
})
export default class Admin extends Model {
    @Column({
        field: "admin_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "管理者ID",
    })
    adminId!: number;

    @Column({
        field: "account",
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        comment: "帳號",
    })
    account!: string;

    @Column({
        field: "password",
        type: DataType.STRING,
        allowNull: false,
        comment: "密碼",
    })
    password!: string;

    @Column({
        field: "name",
        type: DataType.STRING,
        allowNull: false,
        comment: "名稱",
    })
    name!: string;

    @Column({
        field: "status",
        type: DataType.BOOLEAN,
        allowNull: false,
        comment: "狀態",
    })
    status!: number;
}
