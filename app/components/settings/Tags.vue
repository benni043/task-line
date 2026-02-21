<script setup lang="ts">
	import { useTagStore } from "~/stores/useTagStore";
	import type { Label as LabelType } from "~~/shared/types";
	import AddLabel from "./labels/AddLabel.vue";
	import Tag from "./labels/Tag.vue";

	const { t } = useI18n();

	const tagStore = useTagStore();
	const todoStore = useTodoStore();

	function onAddTag(tag: LabelType) {
		tagStore.add(tag.name, tag.color);
	}

	function onSaveTag(tag: LabelType) {
		tagStore.update(tag.uuid, tag.color, tag.name);
	}

	function onDeleteTag(tag: LabelType) {
		tagStore.delete(tag.uuid);
	}

	function isUsed(tag: LabelType): boolean {
		return todoStore.isTagUsed(tag.uuid);
	}
</script>

<template>
	<div data-testid="add-tag">
		<h2 class="text-muted-text text-lg">{{ t("tags") }}</h2>
		<AddLabel @add="onAddTag" />
		<div data-testid="tag-list">
			<div
				v-for="tag in tagStore.data"
				:key="tag.uuid"
				class="inline-block pr-1 pb-1"
			>
				<Tag
					:tag="tag"
					:is-used="isUsed(tag)"
					@save="onSaveTag"
					@delete="onDeleteTag"
				/>
			</div>
		</div>
	</div>
</template>
