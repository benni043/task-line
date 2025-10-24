<script setup lang="ts">
	import { useFilteredTodos } from "~/composables/useFilteredTodos";

	const filterdTodos = useFilteredTodos();

	const { startDrag, endDrag, dropOnTodoHandler } = useTodoDragging();
</script>

<template>
	<div class="flex justify-center" data-testid="todos-container">
		<div
			class="max-h-[calc(100dvh-5.75rem)] w-dvw max-w-200 overflow-auto px-1 md:max-h-[calc(100dvh-2.5rem)]"
		>
			<TransitionGroup
				leave-to-class="max-h-0! opacity-0 scale-y-0"
				enter-from-class="max-h-0! opacity-0 scale-y-0"
			>
				<Todo
					v-for="todo in filterdTodos"
					:key="todo.uuid"
					draggable="true"
					class="max-h-18 transition-all duration-300 data-[dragged]:blur-[1px] data-[dragged]:grayscale-100"
					:data="todo"
					@dragstart="
            (event: DragEvent) => {
              startDrag(event, todo.uuid);
            }
          "
					@dragend="endDrag"
					@dragover="
            (event: DragEvent) => {
              event.preventDefault();
            }
          "
					@drop="
            (event: DragEvent) => {
              dropOnTodoHandler(event, todo.uuid);
            }
          "
				/>
			</TransitionGroup>
		</div>
	</div>
</template>
