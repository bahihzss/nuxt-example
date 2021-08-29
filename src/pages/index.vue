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
        :key="task.id"
        v-for="task in tasks"
      >
        {{ task.name }}
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
      }
    }

    return {
      tasks,
      done,
      newTaskTitle,
      handleAddButtonClick,
    }
  },
})
</script>

<style scoped>
.PageIndex {
}
</style>