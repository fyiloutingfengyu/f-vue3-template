import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const pageTitle = ref('')

  const setPageTitle = (title: string) => {
    pageTitle.value = title
  }

  return {
    pageTitle,
    setPageTitle
  }
})
