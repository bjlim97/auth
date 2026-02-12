import { ref } from "vue";

export type Language = "en" | "zh";

export const currentLanguage = ref<Language>(
    (localStorage.getItem("lang") as Language) || "en"
);

export const messages = {
    en: {
        //Login Page
        welcomeBackTitle: "Welcome Back",
        loginSubtitle: "Login to your account",
        email: "Email",
        password: "Password",
        loggingIn: "Logging in...",
        login: "Login",
        createAccount: "Create Account",
        forgotPassword: "Forgot Password?",
        logout: "Logout",
        profile: "Profile",
        welcomeBack: "Welcome Back",

        //Forgot Password Page
        forgotPasswordTitle: "Forgot Password",
        forgotPasswordSubtitle: "Enter your email to reset your password",
        emailPlaceholder: "Enter your email",
        processing: "Processing...",
        resetPassword: "Reset Password",
        emailNotFound: "Email not found",
        resetLinkGenerated: "Reset link generated successfully.",
        clickToReset: "Click here to reset password",
        backToLogin: "Back to Login",

        //Reset Password Page
        resetPasswordTitle: "Reset Password",
        resetPasswordSubtitle: "Enter your new password below",
        newPassword: "New Password",
        newPasswordPlaceholder: "Enter new password",
        resetting: "Resetting...",
        passwordResetSuccess: "Password reset successful! Redirecting...",
        invalidResetLink: "Invalid reset link",

        //authService.ts
        invalidCredentials: "Invalid email or password",
        userNotFound: "User not found",

        //Register Step 1 Page
        step1Title: "Step 1: Account Details",
        next: "Next",
        alreadyHaveAccount: "Already have an account? Login",
        emailAlreadyRegistered: "Email already registered",

        //Register Step 2 Page
        step2PersonalInfo: "Step 2: Personal Information",
        selectGender: "Select Gender",
        back: "Back",

        //Register Step 3 Page
        step3ConfirmDetails: "Step 3: Confirm Your Details",
        confirmRegister: "Confirm & Register",
        registering: "Registering...",
        registrationSuccess: "Registration Successful! Redirecting...",

        // AppBar
        english: "English",
        mandarin: "Mandarin",

        // Profile Page
        updateProfile: "Update Profile",
        editPersonalInfo: "Edit your personal information",
        name: "Name",
        phone: "Phone",
        address: "Address",
        age: "Age",
        gender: "Gender",
        male: "Male",
        female: "Female",
        updating: "Updating...",
        profileUpdated: "Profile Updated Successfully! Redirecting...",

        //Dashboard
        dashboard: "Dashboard",
        welcomeBackUser: "Welcome back, {name}",
    },
    zh: {
        //Login Page
        welcomeBackTitle: "欢迎回来",
        loginSubtitle: "登录到您的账户",
        email: "邮箱",
        password: "密码",
        loggingIn: "登录中...",
        login: "登录",
        createAccount: "创建账户",
        forgotPassword: "忘记密码？",
        profile: "个人资料",
        logout: "登出",
        welcomeBack: "欢迎回来",

        //Forgot Password Page
        forgotPasswordTitle: "忘记密码",
        forgotPasswordSubtitle: "输入您的邮箱以重置密码",
        emailPlaceholder: "请输入您的邮箱",
        processing: "处理中...",
        resetPassword: "重置密码",
        emailNotFound: "邮箱未找到",
        resetLinkGenerated: "重置链接已生成。",
        clickToReset: "点击这里重置密码",
        backToLogin: "返回登录",

        //Reset Password Page
        resetPasswordTitle: "重置密码",
        resetPasswordSubtitle: "请输入您的新密码",
        newPassword: "新密码",
        newPasswordPlaceholder: "请输入新密码",
        resetting: "重置中...",
        passwordResetSuccess: "密码重置成功！正在跳转...",
        invalidResetLink: "无效的重置链接",

        //authService.ts
        invalidCredentials: "邮箱或密码错误",
        userNotFound: "用户不存在",

        //Register Step 1 Page
        step1Title: "步骤 1：账户信息",
        next: "下一步",
        alreadyHaveAccount: "已有账户？去登录",
        emailAlreadyRegistered: "邮箱已注册",

        //Register Step 2 Page
        step2PersonalInfo: "步骤 2：个人信息",
        selectGender: "请选择性别",
        back: "返回",

        //Register Step 3 Page
        step3ConfirmDetails: "步骤 3：确认您的信息",
        confirmRegister: "确认并注册",
        registering: "注册中...",
        registrationSuccess: "注册成功！正在跳转...",

        // AppBar
        english: "英语",
        mandarin: "中文",

        // Profile Page
        updateProfile: "更新资料",
        editPersonalInfo: "编辑您的个人信息",
        name: "姓名",
        phone: "电话",
        address: "地址",
        age: "年龄",
        gender: "性别",
        male: "男",
        female: "女",
        updating: "更新中...",
        profileUpdated: "资料更新成功！正在跳转...",

        //Dashboard
        dashboard: "主页面",
        welcomeBackUser: "欢迎回来，{name}",
    },
} as const;

export const setLanguage = (lang: Language) => {
    currentLanguage.value = lang;
    localStorage.setItem("lang", lang);
};

type MessageSchema = typeof messages.en;
export type MessageKey = keyof MessageSchema;

export const t = (
    key: MessageKey,
    params?: Record<string, string>
): string => {
    const lang = currentLanguage.value;
    let text: string = messages[lang][key]; // <-- FIX HERE

    if (params) {
        for (const param in params) {
            const value = params[param] ?? "";
            text = text.replace(`{${param}}`, value);
        }
    }

    return text;
};



