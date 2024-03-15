<template>
    <body id="poster" class="login-view">
        <el-form class="login-container" ref="form" :model="form" label-width="80px" style="background-color: bisque;">
            <h2>书豪自习室</h2>
            <el-form-item label="账户">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
        </el-form>
    </body>
</template>
<script>
export default {
    data() {
        return {
            form: {
                username: 'admin',
                password: '123456'
            }
        }
    },
    methods: {
        onSubmit() {
            this.$http.post('/admin/employee/login', this.form)
                .then(response => {
                    const { code } = response.data
                    if (code === 1) {
                        localStorage.setItem('token',JSON.stringify(response.data.data.token))
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
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 35px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cacaca;
}

.login-view {
    background-image: url('../assets/login3.jpg');
}
</style>