'use strict';

module.exports = (sequelize, DataTypes) => {
    let tbUser = sequelize.define('tbUser',{
		userId: {
			field: 'userId',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		userName: {
			field: 'userName',
			type: DataTypes.STRING,
			allowNull: false
		},
        userEmail: {
			field: 'userEmail',
			type: DataTypes.STRING,
			allowNull: false
		},
		userPassword: {
			field: 'userPassword',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'tbUser', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return tbUser;
};