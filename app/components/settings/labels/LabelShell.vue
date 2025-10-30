<script setup lang="ts">
	import {
		PopoverArrow,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "reka-ui";

	defineProps<{
		isUsed: boolean;
	}>();
	const emit = defineEmits<{ delete: [] }>();

	function onDeleteLabel() {
		emit("delete");
	}
</script>
<template>
	<div>
		<div class="text-nowrap flex">
			<slot/>
		</div>
		<PopoverRoot>
			<PopoverTrigger class="h-6">
				<div class="cursor-pointer">
					<Icon name="material-symbols:delete-outline-rounded" size="24"/>
				</div>
			</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent
					class="bg-popover z-50 mx-2 flex flex-col gap-2 rounded-lg p-2 drop-shadow-lg/30"
					side="top"
					:side-offset="5"
				>
					<span v-if="isUsed" class="flex gap-1">
						<Icon name="material-symbols:warning-outline-rounded" size="24"/>
						still used
					</span>
					<button
						v-if="!isUsed"
						class="h-6 cursor-pointer"
						@click="onDeleteLabel"
					>
						<Icon name="material-symbols:delete-outline-rounded" size="24"/>
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
</template>
