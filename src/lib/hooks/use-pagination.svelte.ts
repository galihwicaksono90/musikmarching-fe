export type UsePagination<T> = {
        initialPage?: number
        items: T[]
        limit?: number
        sort?: (a: T, b: T) => number
        filter?: (item: T, index?: number, array?: T[]) => boolean
}

export const usePagination = <T,>({ initialPage = 1, items = [], limit = 5, sort, filter }: UsePagination<T>) => {
        let page = $state(initialPage)
        const filteredItems = $derived(filter ? items.filter(filter) : items)
        const paginatedItems = $derived(filteredItems.sort(sort).slice((page - 1) * limit, page * limit))
        const showingRangeFrom = $derived(page * limit - limit + 1)
        const showingRangeTo = $derived(showingRangeFrom + paginatedItems.length - 1)

        const setPage = (newPage: number) => {
                page = newPage
        }

        return {
                get page() {
                        return page
                },
                get paginatedItems() {
                        return paginatedItems
                },
                get count() {
                        return filteredItems.length
                },
                get showingRange() {
                        return `${showingRangeFrom} - ${showingRangeTo}`
                },
                limit,
                setPage,
        }
}
