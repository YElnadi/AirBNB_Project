'use strict';
const bcrypt = require('bcryptjs');
// const {Review} = require('../models/review')
// const{Spot} = require('../models/spot')
// const{Booking} = require('../models/booking')

const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject(){
      const {id,firstName,lastName,email, username} = this;
      return{id, firstName,lastName, email,username};
    }

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id){
      return User.scope('currentUser').findByPk(id);
    }

    static async login({credential, password}){
      const {Op} = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where:{
          [Op.or]:{
            username:credential,
            email:credential
          }
        }
      });
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup ({firstName, lastName, username, email, password}){
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName, 
        lastName, 
        
      });
      //console.log("user:", user)
      return await User.scope('currentUser').findByPk(user.id);
    
    }
    static associate(models) {
      // define association here
      User.hasMany(
        models.Booking,
        {
          foreignKey:"userId",
          onDelete:"CASCADE"
        }
      )
      User.hasMany(
        models.Spot,
        {
          foreignKey:"ownerId",
          onDelete:"CASCADE"
        }
      )

      User.hasMany(
        models.Review,
        {
          foreignKey:"userId",
          onDelete:"CASCADE"
        }
      )

    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        len:[4,30],
        isNotEmail(username){
          if(Validator.isEmail(username)){
            throw new Error ('cannot be an email')
          }
        }
      }
    },
    email:{ 
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        len:[3,256],
        isEmail:true
        
      }
    },
    hashedPassword: {
      type:DataTypes.STRING.BINARY,
      allowNull:false,
      validate:{
        len:[60, 60]
      }
    },
    firstName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes:{
        exclude:['hashedPassword','email','createdAt','updatedAt']
      }
    },
    scopes:{
      currentUser:{
        attributes:{
          exclude:['hashedPassword','createdAt','updatedAt'],
        }
      },
      loginUser:{
        attributes:{}
      }
    },

    
  });
  return User;
};