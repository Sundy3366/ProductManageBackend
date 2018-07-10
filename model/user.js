const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "username不能为空"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "密码不能为空"]
    },
    age: {
        type: Number,
        min: [0, "年龄不能小于0"],
        max: [100, "年龄不能超过100岁"]
    },
    role: {
        type: Number,
        min: [0, "role不能小于0"],
        default: 0 //0: 普通用户，10表示商家用户，100表示超级管理员
    },
    created: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('user', schema);