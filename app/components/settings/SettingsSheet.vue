<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";
import Categories from "./Categories.vue";
import GoogleLogin from "./GoogleLogin.vue";
import Tags from "./Tags.vue";
import { useI18n } from "vue-i18n";
import type { Locale } from "vue-i18n";

const { t } = useI18n();

const isOpen = defineModel<boolean>("isOpen", { required: true });

function close() {
  isOpen.value = false;
}

const { settings } = useSettings();

const { locale, locales, setLocale } = useI18n();
const supportedLocales = locales.value.map((l) => l.code);

function onLanguageChange(newLocale: string) {
  if ((supportedLocales as string[]).includes(newLocale)) {
    setLocale(newLocale as Locale);
  } else {
    console.error("Unknown locale");
  }
}
</script>

<template>
  <Sheet :is-open="isOpen" title="Settings Sheet" @close="close">
    <div data-testid="settings-sheet">
      <div class="flex">
        <div class="p-1 pt-0">
          <h2 class="text-muted-text text-lg">{{ t("login") }}</h2>
          <GoogleLogin />
        </div>

        <div class="p-1 pt-0">
          <h2 class="text-muted-text text-lg">{{ t("languages") }}</h2>
          <select
            data-testid="language-select"
            class="bg-surface border-secondary h-8 cursor-pointer rounded border px-2 text-white"
            :value="locale"
            @change="
              onLanguageChange(($event.target as HTMLSelectElement).value)
            "
          >
            <option v-for="lang in locales" :key="lang.code" :value="lang.code">
              {{ t(`languageNames.${lang.code}`) }}
            </option>
          </select>
        </div>

        <div class="p-1 pt-0">
          <h2 class="text-muted-text text-lg">{{ t("insertionPoint") }}</h2>
          <select
            v-model="settings.insertionPoint"
            class="bg-surface border-secondary h-8 cursor-pointer rounded border px-2 text-white"
          >
            <option value="top">
              {{ t(`top`) }}
            </option>
            <option value="bottom">
              {{ t(`bottom`) }}
            </option>
          </select>
        </div>
      </div>
      <Categories />
      <Tags />
    </div>
  </Sheet>
</template>
