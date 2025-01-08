import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useSearchSuggestionStore = defineStore('searchSuggestions', {
  // other options...
  state: () => ({
    value: "猜你想搜",
    options: [
        {
            label: '世界旅游胜地',
            count: 0
        },
        {
            label: '八大奇迹',
            count: 0
        },
    ]
  }),

  getters: {
    // getters
    getOptions: (state) => state.options
  },

  actions: {
    // actions
    outputOptions() {
        console.log("Current search suggestions are: \n" + this.options)
    },

    setOptions(options: any[]) {
        this.options = options
    }
  }
})