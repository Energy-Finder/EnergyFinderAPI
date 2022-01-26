'use strict';

module.exports = (sequelize, DataTypes) => {
    let tbProvider = sequelize.define('tbProvider',{
		providerId: {
			field: 'providerId',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		providerName: {
			field: 'providerName',
			type: DataTypes.STRING,
			allowNull: false
		},
        providerLogo: {
			field: 'providerLogo',
			type: DataTypes.STRING,
			allowNull: false
		},
		providerUf: {
			field: 'providerUf',
			type: DataTypes.CHAR,
			allowNull: false
		},
        providerKwhPrice: {
			field: 'providerKwhPrice',
			type: DataTypes.FLOAT,
			allowNull: false
		},
        providerKwhLimit: {
			field: 'providerKwhLimit',
			type: DataTypes.FLOAT,
			allowNull: false
		}
	}, 
	{
		tableName: 'tbProvider', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return tbProvider;
};