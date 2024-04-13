import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.ts';

const Cafe = sequelize.define('cafe', {
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    price:{type: DataTypes.INTEGER},
    image:{type: DataTypes.STRING}
})

const Employee = sequelize.define('employee', {
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    position:{type: DataTypes.STRING},
    exp:{type:DataTypes.INTEGER},
    salary:{type:DataTypes.INTEGER},
    image:{type: DataTypes.STRING}
})

const Game = sequelize.define('game', {
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    desc:{type: DataTypes.STRING},
    price:{type: DataTypes.INTEGER},
    image:{type: DataTypes.STRING}
})

export { Cafe, Employee, Game };
