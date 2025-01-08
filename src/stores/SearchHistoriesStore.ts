import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useSearchHistoryStore = defineStore('searchHistories', {
  // other options...
  state: () => ({
    value: "搜索历史",
    options: [
      {label: "", count: 0}
    ]
  }),

  getters: {
    // getters
    // getOptions: (state) => state.options.filter((item) => item !== undefined && Object.hasOwn(item, "label") && item.label !== undefined && item.label !== '') // Property 'hasOwn' does not exist on type 
    // 'ObjectConstructor'
    getOptions: (state) => state.options
  },

  actions: {
    // actions
    addOption(option: string) {
      this.dropOption()
      this.options = this.options.filter( (item) => item.label !== option)
      this.options.unshift({label: option, count: 0})
    },

    dropOption() {
      if (this.options.length >= 5) {  // 保持搜索历史记录不超过 5 条
        this.options.pop()
      }
    }
  },
}
)