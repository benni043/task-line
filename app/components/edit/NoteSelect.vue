<script setup lang="ts">
import { marked } from "marked";

const { t } = useI18n();
const note = defineModel<string>("note");

const isEditing = ref(note.value === "");
const render = useTemplateRef("render");

watch(isEditing, async () => {
  if (!isEditing.value) {
    render.value!.innerHTML = await marked.parse(note.value ?? "");
  }
});

onMounted(async () => {
  render.value!.innerHTML = await marked.parse(note.value ?? "");
});
</script>

<template>
  <button
    class="top 0 hover:bg-secondary-hover bg-secondary absolute right-0 h-7 w-7 cursor-pointer rounded"
    @click.prevent="isEditing = !isEditing"
  >
    <div class="flex h-full items-center justify-center">
      <Icon v-if="isEditing" name="material-symbols:visibility" />
      <Icon v-else name="material-symbols:edit" />
    </div>
  </button>
  <div class="w-full flex-1">
    <textarea
      v-if="isEditing"
      v-model="note"
      data-testid="note-input"
      class="border-secondary h-full w-full resize-none rounded border-1 pl-1"
      :placeholder="t('note')"
    />
    <div ref="render" class="markdown" :hidden="isEditing"></div>
  </div>
</template>

<style>
@reference "~/assets/css/main.css";

.markdown h1 {
  @apply mt-6 mb-4 text-3xl leading-tight font-bold;
}
.markdown h2 {
  @apply mt-6 mb-3 text-2xl leading-snug font-semibold;
}
.markdown h3 {
  @apply mt-5 mb-2 text-xl leading-snug font-semibold;
}
.markdown h4 {
  @apply mt-4 mb-2 text-lg font-medium;
}
.markdown p {
  @apply mb-4 text-base leading-relaxed;
}
.markdown a {
  @apply text-primary hover:underline;
}
.markdown ul {
  @apply mb-4 list-inside list-disc space-y-1;
}
.markdown ol {
  @apply mb-4 list-inside list-decimal space-y-1;
}
.markdown blockquote {
  @apply my-4 border-l-4 border-gray-300 pl-4 text-gray-700 italic;
}
.markdown code {
  @apply rounded bg-gray-100 px-1 py-0.5 font-mono text-sm;
}
.markdown pre {
  @apply overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100;
}
.markdown img {
  @apply my-4 rounded-lg;
}
.markdown hr {
  @apply my-6 border-t border-gray-300;
}
</style>
