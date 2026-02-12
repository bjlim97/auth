<template>
  <header class="appbar">
    <div class="left" @click="goHome">
      <img :src="logo" alt="Company Logo" class="logo-img clickable" />
    </div>

    <div class="right">
      <div class="language-menu">
        <Globe class="icon-svg" />

        <div class="dropdown language-dropdown">
          <button @click="changeLanguage('en')">🇬🇧 English</button>
          <button @click="changeLanguage('zh')">🇨🇳 Mandarin</button>
        </div>
      </div>

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

          <button class="logout" @click="$emit('logout')">
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

defineProps<{
  user: User | null;
}>();

defineEmits(["profile", "logout"]);

const router = useRouter();

const goHome = () => {
  router.push("/dashboard");
};

const changeLanguage = (lang: string) => {
  console.log("Language changed to:", lang);
  // Later you can integrate i18n here
};
</script>

<style scoped>
.appbar {
  height: 70px;
  background: #dbe3ea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo-img {
  height: 45px;
  object-fit: contain;
}

.clickable {
  cursor: pointer;
}

.right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-svg {
  width: 20px;
  height: 20px;
  color: #374151;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #9ca3af;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.username {
  font-weight: 500;
  color: #111827;
}

/* Dropdown hidden by default */
.dropdown {
  position: absolute;
  top: 35px;
  right: 0;
  width: 160px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  display: none;
}

/* SHOW DROPDOWN ON HOVER */
.user-menu:hover .dropdown {
  display: block;
}

.language-menu {
  position: relative;
  cursor: pointer;
}

/* Hide by default */
.language-dropdown {
  display: none;
  position: absolute;
  top: 20px;
  right: 0;
  width: 150px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
}

/* Show on hover */
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
}

.dropdown button:hover {
  background: #f3f4f6;
  margin: 0;
}

.menu-icon {
  margin-right: 8px;
}

.logout {
  color: #ef4444;
}
</style>
