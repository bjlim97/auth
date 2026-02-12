<template>
  <header class="appbar">
    <div class="left" @click="goHome">
      <img :src="logo" alt="Company Logo" class="logo-img" />
    </div>

    <div class="right">
      <!-- Language -->
      <div class="language-menu">
        <div class="icon-circle">
          <Globe size="18" />
        </div>

        <div class="dropdown language-dropdown">
          <button @click="changeLanguage('en')">English</button>
          <button @click="changeLanguage('zh')">Mandarin</button>
        </div>
      </div>

      <!-- Theme Toggle -->
      <div class="theme-toggle" @click="toggleTheme">
        <div class="toggle-circle" :class="{ dark: isDark }">
          <span v-if="!isDark">☀️</span>
          <span v-else>🌙</span>
        </div>
      </div>

      <!-- User -->
      <div class="user-menu">
        <div class="avatar">
          <UserIcon size="18" />
        </div>

        <span class="username">{{ user?.name }}</span>

        <div class="dropdown">
          <button @click="$emit('profile')">
            <UserIcon size="16" class="menu-icon" />
            Profile
          </button>

          <button @click="$emit('logout')">
            <LogOut size="16" class="menu-icon" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Globe, User as UserIcon, LogOut } from "lucide-vue-next";
import logo from "../assets/logo.png";
import type { User } from "../types/User";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

defineProps<{
  user: User | null;
}>();

defineEmits(["profile", "logout"]);

const router = useRouter();
const isDark = ref(false);

onMounted(() => {
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;

  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const goHome = () => {
  router.push("/dashboard");
};

const changeLanguage = (lang: string) => {
  console.log("Language changed to:", lang);
};
</script>

<style scoped>
/* ============================= */
/* APPBAR */
/* ============================= */

.appbar {
  height: 70px;
  background: var(--appbar-bg);
  color: var(--text);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition:
    background 0.3s,
    color 0.3s;
}

.logo-img {
  height: 45px;
  object-fit: contain;
  cursor: pointer;
  transition: filter 0.3s ease;
}
html.dark .logo-img {
  filter: brightness(0) invert(1);
}

/* ============================= */
/* RIGHT SECTION */
/* ============================= */

.right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* ============================= */
/* ICON CIRCLES */
/* ============================= */

.icon-circle,
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #9ca3af;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.icon-circle:hover,
.avatar:hover {
  background: #6b7280;
}

/* ============================= */
/* THEME TOGGLE */
/* ============================= */

.theme-toggle {
  width: 60px;
  height: 30px;
  background: #d1d5db;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle-circle {
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.toggle-circle.dark {
  transform: translateX(28px);
}

/* ============================= */
/* USER MENU */
/* ============================= */

.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
}

.username {
  font-weight: 500;
  color: var(--text);
}

/* ============================= */
/* DROPDOWN */
/* ============================= */

.dropdown {
  position: absolute;
  top: 35px;
  right: 0;
  width: 160px;
  background: var(--dropdown-bg);
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  display: none;
}

.user-menu:hover .dropdown {
  display: block;
}

.language-menu {
  position: relative;
  cursor: pointer;
}

.language-dropdown {
  display: none;
  position: absolute;
  top: 35px;
  right: -20px;
  width: 150px;
  background: var(--dropdown-bg);
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
}

.language-menu:hover .language-dropdown {
  display: block;
}

.dropdown button {
  width: 100%;
  padding: 10px 15px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: var(--text);
}

.dropdown button:hover {
  background: var(--border);
}

.menu-icon {
  margin-right: 8px;
}
</style>
