import { ref } from 'vue'

const userID = ref(0)

export const useUserID = () => {
  return {
    userID,
  }
}
