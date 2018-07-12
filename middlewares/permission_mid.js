/**
 * 负责当前的用户的role，是否有权限操作当前的url
 * 将每种role和它有权限操作的url进行映射
 */

let role_permission = [
    {
        role: 0,//商家用户
        permission: [
            /.*\/product/,
            /.*\/order/,
            /.*\/category/
        ]
    },
    {
        role: 100,//超级管理员
        permission: [
            /.*/
        ]
    }
];

module.exports = (req, res, next) => {
    let user = req.user;
    //对象不为空才进行检查
    if (user) {
        let isLetGo = false;
        //遍历角色权限数组
        role_permission.forEach(obj => {
            //如果角色相同，则开始遍历权限数组
            if (user.role === obj.role) {
                obj.permission.forEach(p => {
                    //如果请求与权限匹配则放行，此处的test相同于java中的正则match
                    if (p.test(req.url)) {
                        isLetGo = true;
                    }
                });
            }
        });

        if (!isLetGo) {
            throw Error("当前用户权限不足");
        }
    }

    next();
};