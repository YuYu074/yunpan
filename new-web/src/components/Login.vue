<template>

    <body id="poster" class="login-view">
        <el-form class="login-container" ref="form" :model="form" label-width="40px" style="background-color: #a5cbef;">
            <h2 style="text-align: center;">小 鱼 网 盘</h2>
            <el-form-item label="账户">
                <el-input v-model="form.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label-width="0" style="text-align: center;">
                <el-button type="primary" round @click="onSubmit" style="width: 60%;">登陆</el-button>
            </el-form-item>
        </el-form>
    </body>
</template>
<script>
export default {
    data() {
        return {
            form: {
                account: '13208112801',
                password: '123456'
            }
        }
    },
    methods: {
        onSubmit() {
            this.$http.post('/login', this.form)
                .then(response => {
                    const { code } = response.data
                    if (code === 200) {
                        // localStorage.setItem('token', JSON.stringify(response.data.data.token))
                        localStorage.setItem('token', 'testToken')
                        this.$router.push('/FirstPage')
                    } else {
                        alert('用户名或密码错误')
                    }
                })
                .catch(error => {
                    console.log(error) // 输出错误信息，以便更好地调试错误
                    alert('登录失败，请检查账号和密码后重试')
                })
        }
    }
}
</script>
<style>
#poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

body {
    margin: 0px;
    padding: 0%;
}

.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    position: fixed;
    left: 15%;
    top: 50%;
    transform: translateY(-50%);
    width: 25%;
    min-width: 250px;
    padding: 35px 35px 35px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cacaca;
}

.login-view {
    background-image: url('../assets/login3.png');
}
</style>