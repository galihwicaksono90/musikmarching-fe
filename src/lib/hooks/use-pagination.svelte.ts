export type UsePagination = {
  initialPage?: number
  limit?: number
  count: () => number
}

export const usePagination = ({ initialPage = 1, limit = 5, count }: UsePagination) => {
  let page = $state(initialPage)
  const showingRangeFrom = $derived(page * limit - limit + 1)
  const showingRangeTo = $derived(showingRangeFrom + limit - 1 - ((limit * page) > count() ? (limit * page) - count() : 0))

  const setPage = (newPage: number) => {
    page = newPage
  }

  return {
    get page() {
      return page
    },
    get showingRange() {
      return `${showingRangeFrom} - ${showingRangeTo}`
    },
    limit,
    setPage,
  }
}
