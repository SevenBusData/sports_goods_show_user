<template>
  <div class="login-container">
    <el-container>
      <el-header class="header">
        <span class="logo">体育用品展销系统</span>
        <div class="accessibility-links">
          <a href="#">网站无障碍</a>
          <a href="#">“登录页面”改进建议</a>
        </div>
      </el-header>
      <el-main class="login-content">
        <div class="left-section">
          <h2>体育用品展示</h2>
          <img :src="imageUrl" alt="体育用品" class="display-image">
        </div>
        <div class="right-section">
          <el-tabs v-model:active-name="activeTab">
            <el-tab-pane label="密码登录" name="password">
              <el-form @submit.prevent="handlePasswordLogin">
                <el-form-item prop="username">
                  <el-input v-model="username" placeholder="账号名/邮箱/手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="password" type="password" placeholder="请输入登录密码"></el-input>
                  <el-link type="primary" style="float: right" href="#">忘记密码</el-link>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
              </el-form>
              <div class="other-login-methods">
                <el-link type="primary">支付宝登录</el-link>
                <el-link type="primary">钉钉登录</el-link>
                <el-link type="primary">忘记账号</el-link>
                <el-link type="primary">免费注册</el-link>
              </div>
            </el-tab-pane>
            <el-tab-pane label="短信登录" name="sms">
              <el-form @submit.prevent="handleSmsLogin">
                <el-form-item prop="phone">
                  <el-input v-model="phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit">获取验证码</el-button>
                </el-form-item>
                <el-form-item prop="verificationCode">
                  <el-input v-model="verificationCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const phone = ref('');
const verificationCode = ref('');
const activeTab = ref('password');
const imageUrl = '/src/assets/sports_image.jpg';

const handlePasswordLogin = async () => {
  try {
    const data = {
      username: username.value,
      password: password.value
    };
    const response = await useAppContext().appContext.config.globalProperties.$axios.post('/user/login', data);
    console.log('密码登录成功:', response.data);
    // 这里可以添加登录成功后的跳转逻辑等
  } catch (error) {
    console.error('密码登录失败:', error);
    // 可以在这里添加错误提示给用户
  }
};

const handleSmsLogin = async () => {
  try {
    const data = {
      phone: phone.value,
      verificationCode: verificationCode.value
    };
    const response = await useAppContext().appContext.config.globalProperties.$axios.post('/user/login-phone', data);
    console.log('短信登录成功:', response.data);
    // 这里可以添加登录成功后的跳转逻辑等
  } catch (error) {
    console.error('短信登录失败:', error);
    // 可以在这里添加错误提示给用户
  }
};
</script>

<style scoped>
.login-container {
  width: 800px;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
}

.logo {
  font-size: 24px;
  color: #007bff;
  font-weight: bold;
}

.accessibility-links a {
  color: #666;
  text-decoration: none;
  margin-left: 15px;
}

.login-content {
  display: flex;
}

.left-section {
  flex: 1;
  padding: 20px;
}

.left-section h2 {
  margin-bottom: 20px;
}

.display-image {
  width: 100%;
  height: auto;
}

.right-section {
  flex: 1;
  padding: 20px;
}

.other-login-methods {
  margin-top: 20px;
  text-align: center;
}
</style>
