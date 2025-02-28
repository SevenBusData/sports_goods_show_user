<template>
  <div class="login-container">
    <!-- 左侧 体育主题图片 -->
    <div class="login-left">
      <img src="@/assets/sports-theme.jpg" alt="Sports Theme" class="login-image" />
      <p>欢迎来到 <span class="highlight">体育用品展销系统</span></p>
    </div>

    <!-- 右侧 登录表单 -->
    <div class="login-right">
      <el-card class="login-card">
        <h2 class="login-title">用户登录</h2>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleLogin">登 录</el-button>
          </el-form-item>
        </el-form>
        <div class="login-links">
          <span @click="goRegister">免费注册</span> | <span @click="forgotPassword">忘记密码？</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const loginForm = ref({
      username: "",
      password: "",
    });

    const loginFormRef = ref(null);

    const rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };

    const handleLogin = () => {
      // 如果 loginFormRef.value 为 null，调用 validate 会报错
      loginFormRef.value.validate((valid) => {
        if (!valid) {
          ElMessage.error("请填写完整的登录信息！");
          return;
        }

        axios
            .post("/user/login", loginForm.value)
            .then((response) => {
              const { code, msg, token } = response.data;
              if (code === 200) {
                ElMessage.success("登录成功！");
                localStorage.setItem("token", token); // 存储 Token
                router.push("/"); // 登录成功后跳转到主页
              } else {
                ElMessage.error(msg || "登录失败，请检查用户名和密码！");
              }
            })
            .catch((error) => {
              ElMessage.error("网络错误，请稍后重试！");
              console.error("登录错误:", error);
            });
      });
    };
    onMounted(() => {
      // 组件挂载后再次检查 loginFormRef
      console.log('组件挂载后 loginFormRef.value:', loginFormRef.value);
    });

    return { loginForm, loginFormRef, rules, handleLogin };
  },
};
</script>

<style scoped>
/* 登录页面布局 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
}

/* 左侧 图片展示 */
.login-left {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-image {
  width: 80%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-left p {
  font-size: 18px;
  margin-top: 15px;
  color: #fff;
  font-weight: bold;
}

.highlight {
  color: #ffcc00;
}

/* 右侧 登录表单 */
.login-right {
  width: 40%;
  display: flex;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.login-title {
  text-align: center;
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  height: 42px;
  font-size: 16px;
}

/* 注册/忘记密码 链接 */
.login-links {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.login-links span {
  cursor: pointer;
  color: #ff6600;
}

.login-links span:hover {
  text-decoration: underline;
}
</style>
