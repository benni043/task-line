<script setup lang="ts">
	import {
		PopoverArrow,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "reka-ui";
	import { useLoginID } from "~/composables/login/useLoginID";
	import { useLoginImageUrl } from "~/composables/login/useLoginImageUrl";
	import { authClient } from "~/utils/auth";

	const { t } = useI18n();

	const id = useLoginID();
	const userImage = useLoginImageUrl();

	const isLoggedIn = computed(() => {
		return !!id.value;
	});

	async function login() {
		const data = await authClient.signIn.social({
			provider: "google",
		});
	}

	async function logout() {
		await authClient.signOut();
	}
</script>

<template>
	<div v-if="!isLoggedIn" class="flex gap-1">
		<div class="border-secondary flex h-8 items-center rounded border px-1">
			<button class="flex cursor-pointer gap-1" @click="() => login()">
				{{ t("login") }}
				<img src="/img/google_logo.svg" alt="Google Logo">
			</button>
		</div>
	</div>
	<div v-if="isLoggedIn" class="flex gap-1">
		<div
			class="border-secondary flex h-8 items-center gap-1 rounded border px-1"
		>
			<PopoverRoot>
				<PopoverTrigger class="h-6 cursor-pointer">
					<div class="flex gap-1">
						<div class="text-nowrap">{{ t("logout") }}</div>

						<img :src="userImage!" class="h-6 w-6 rounded-full object-cover">
					</div>
				</PopoverTrigger>

				<PopoverPortal>
					<PopoverContent
						class="bg-popover z-50 mx-2 flex flex-col gap-2 rounded-lg p-2 drop-shadow-lg/30"
						side="top"
						:side-offset="5"
					>
						<button class="h-6 cursor-pointer" @click="logout()">
							{{ t("logout") }}
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
		</div>
	</div>
</template>
