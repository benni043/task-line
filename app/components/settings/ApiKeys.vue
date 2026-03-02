<script setup lang="ts">
	import {
		PopoverArrow,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "reka-ui";
	import { authClient } from "~/utils/authClient";

	const { t } = useI18n();

	const { data: keys, refresh } = useAsyncData("apiKeys", async () => {
		return (await authClient.apiKey.list()).data?.apiKeys ?? [];
	});

	const open = ref(false);
	const name = ref("");
	const isValid = computed(() => name.value.trim().length > 0);
	const tempKeyValues = ref<{ id: string; key: string }[]>([]);

	async function onCreateKey() {
		const key = await authClient.apiKey.create({ name: name.value });

		if (key.error || !key.data) {
			console.error(key.error);
			return;
		}

		tempKeyValues.value.push({ id: key.data.id, key: key.data.key });

		open.value = false;
		name.value = "";

		refresh();
	}

	async function onDeleteKey(keyId: string) {
		await authClient.apiKey.delete({ keyId: keyId });
		refresh();
	}

	function hasTempKey(keyId: string) {
		return tempKeyValues.value.some((k) => k.id === keyId);
	}

	async function onCopyKey(keyId: string) {
		const key = tempKeyValues.value.find((k) => k.id === keyId);
		if (!key) return;

		await navigator.clipboard.writeText(key.key);
	}
</script>

<template>
	<div data-testid="add-tag">
		<h2 class="text-muted-text text-lg">{{ t("apiKeys") }}</h2>
		<PopoverRoot v-model:open="open">
			<PopoverTrigger>
				<div
					data-testid="add-label-button"
					class="border-secondary flex cursor-pointer items-center gap-1 rounded border px-1"
				>
					<Icon name="material-symbols:add-2-rounded" size="20" />
					{{ t("create") }}
				</div>
				<slot name="display" />
			</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent
					data-testid="edit-label-modal"
					class="bg-popover z-50 mx-2 flex flex-col gap-2 rounded-lg p-2 drop-shadow-lg/30"
					side="top"
					:side-offset="5"
				>
					<input
						v-model="name"
						data-testid="edit-label-name-input"
						class="border-secondary-popover h-8 w-36 rounded border pl-1"
						:placeholder="t('name')"
						type="text"
					>
					<button
						type="button"
						data-testid="edit-label-save-button"
						class="bg-primary hover:bg-primary-hover border-secondary-popover disabled:bg-popover flex h-8 cursor-pointer items-center justify-center rounded border px-0.5 transition-colors"
						:disabled="!isValid"
						@click="onCreateKey"
					>
						<Icon
							name="material-symbols:add-2-rounded"
							class="transition-colors"
							size="20"
						/>
					</button>
					<PopoverArrow
						class="fill-popover"
						:height="10"
						:width="20"
						:rounded="true"
					/>
				</PopoverContent>
			</PopoverPortal>
		</PopoverRoot>

		<div>
			<div v-for="key in keys" class="flex gap-2">
				{{ key.name ?? "Unnamed" }}
				<span class="text-muted-text"> - {{ key.id }}</span>
				<div>
					<button
						type="button"
						v-if="hasTempKey(key.id)"
						@click="onCopyKey(key.id)"
						class="h-6 cursor-pointer"
					>
						<Icon
							name="material-symbols:content-copy-outline-rounded"
							size="20"
						/>
					</button>
					<button
						type="button"
						@click="onDeleteKey(key.id)"
						class="h-6 cursor-pointer"
					>
						<Icon name="material-symbols:delete-outline-rounded" size="20" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
