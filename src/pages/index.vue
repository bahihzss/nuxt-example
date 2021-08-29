<template>
  <div class="PageIndex">
    <form @submit.prevent>
      <input
        type="text"
        v-model="newTaskTitle"
      >
      <button
        @click="handleAddButtonClick()"
        :disabled="!newTaskTitle.length"
      >
        追加
      </button>
    </form>
    <ul>
      <li
        v-for="task in tasks"
        :key="task.id"
        :class="{'TaskList_item-done': task.isDone}"
      >
        <button
          @click="handleDoneButtonClick(task.id)"
          :disabled="task.isDone"
        >
          ✔️
        </button>
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTasks } from '~/compositions/tasks'

export default defineComponent({
  name: 'PageIndex',

  components: {},

  setup () {
    const { tasks, create, done } = useTasks()

    const newTaskTitle = ref('')

    const handleAddButtonClick = async () => {
      if (newTaskTitle.value) {
        await create(newTaskTitle.value)
        newTaskTitle.value = ''
      }
    }

    const handleDoneButtonClick = async (id: string) => {
      await done(id)
    }

    return {
      tasks,
      done,
      newTaskTitle,
      handleAddButtonClick,
      handleDoneButtonClick,
    }
  },
})
</script>

<style scoped>
.PageIndex .TaskList_item-done {
  text-decoration: line-through;
}
</style>