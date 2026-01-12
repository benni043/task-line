<script setup lang="ts">
	import { useFilteredTodos } from "~/composables/useFilteredTodos";

	const filteredTodos = useFilteredTodos();

	const {
		startDrag,
		endDrag,
		dropOnTodoHandler,
		dragLeave,
		dragOver,
		draggedTodo,
		hoveredTodo,
		hoveredState,
	} = useTodoDragging();
</script>

<template>
	<div class="flex justify-center" data-testid="todos-container">
		<div
			class="max-h-[calc(100dvh-5.75rem)] w-dvw max-w-200 overflow-auto px-1 md:max-h-[calc(100dvh-2.5rem)] pb-1"
		>
			<TransitionGroup
				leave-to-class="max-h-0! opacity-0 scale-y-0"
				enter-from-class="max-h-0! opacity-0 scale-y-0"
			>
				<div
					class="transition-all duration-300 relative"
					v-for="todo in filteredTodos"
					:key="todo.uuid"
					draggable="true"
					@dragstart="
            (event: DragEvent) => {
              startDrag(event, todo.uuid);
            }
          "
					@dragend="endDrag"
					@dragover="
            (event: DragEvent) => {
              dragOver(event, todo.uuid);
            }
          "
					@dragleave="dragLeave"
					@drop="
            (event: DragEvent) => {
              dropOnTodoHandler(event, todo.uuid);
            }
          "
				>
					<div
						v-if="hoveredState === 'above' && hoveredTodo === todo.uuid && draggedTodo !== todo.uuid"
						class="h-0.5 absolute w-full bg-primary-hover rounded-full"
					/>
					<Todo
						:data-dragged="draggedTodo === todo.uuid"
						:data-hovered="hoveredTodo === todo.uuid"
						class="max-h-18 transition-all duration-300 data-[dragged=true]:blur-[1px] data-[dragged=true]:grayscale-100"
						:data="todo"
					/>
					<div
						v-if="hoveredState === 'below' && hoveredTodo === todo.uuid && draggedTodo !== todo.uuid"
						class="h-0.5 absolute w-full bg-primary-hover rounded-full"
					/>
				</div>
			</TransitionGroup>
		</div>
	</div>
</template>
