<script setup lang="ts">
	import {
		DialogContent,
		DialogDescription,
		DialogOverlay,
		DialogPortal,
		DialogRoot,
		DialogTitle,
		VisuallyHidden,
	} from "reka-ui";
	import {
		DrawerContent,
		DrawerDescription,
		DrawerHandle,
		DrawerOverlay,
		DrawerPortal,
		DrawerRoot,
		DrawerTitle,
	} from "vaul-vue";

	defineProps<{ isOpen: boolean; title: string }>();
	const emit = defineEmits<{ close: [] }>();

	const useModal = useMediaQuery("(min-width: 40rem)");
</script>

<template>
	<ClientOnly>
		<DrawerRoot v-if="!useModal" :open="isOpen" @close="emit('close')">
			<DrawerPortal>
				<DrawerOverlay
					class="fixed top-0 left-0 z-20 h-dvh w-dvw backdrop-blur-[1.5px]"
					@click="emit('close')"
				/>
				<DrawerContent
					class="bg-surface fixed bottom-0 z-30 flex h-96 w-dvw flex-col gap-2 rounded-t-lg pt-2 drop-shadow-lg"
				>
					<div class="h-full">
						<VisuallyHidden>
							<DrawerTitle>{{ title }}</DrawerTitle>
							<DrawerDescription>{{ title }}</DrawerDescription>
						</VisuallyHidden>
						<DrawerHandle class="" />
						<div class="h-full overflow-auto p-2 pt-0"><slot /></div>
					</div>
				</DrawerContent>
			</DrawerPortal>
		</DrawerRoot>
		<DialogRoot v-if="useModal" :open="isOpen" @close="emit('close')">
			<DialogPortal>
				<DialogOverlay
					class="fixed top-0 left-0 z-20 h-dvh w-dvw backdrop-blur-[1.5px]"
					@click="emit('close')"
				/>
				<Transition
					enter-from-class="opacity-0 scale-90"
					leave-to-class="opacity-0 scale-95"
				>
					<DialogContent
						class="bg-surface fixed top-1/2 left-1/2 z-30 h-128 w-9/10 max-w-196 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg p-1 drop-shadow-2xl duration-200"
					>
						<VisuallyHidden>
							<DialogTitle>{{ title }}</DialogTitle>
							<DialogDescription>{{ title }}</DialogDescription>
						</VisuallyHidden>
						<slot />
					</DialogContent>
				</Transition>
			</DialogPortal>
		</DialogRoot>
	</ClientOnly>
</template>
