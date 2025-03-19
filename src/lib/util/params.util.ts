export class ParamsUtil {
	public url: URL;
	public limit: number = 6;

	constructor({ url, limit }: {
		url: URL,
		limit?: number,
	}) {
		this.url = url;
		this.limit = limit ?? this.limit;
	}

	public getPageFromParams() {
		const pageStr = this.url.searchParams.get('page') || '';
		const page: number | null = pageStr ? parseInt(pageStr, 10) : null;

		if (page !== null && !isNaN(page)) {
			return page;
		} else {
			return 1;
		}
	}

	public getPageOffset() {
		const page = this.getPageFromParams();
		return (page - 1) * this.limit;
	}

	public getParams(name: string) {
		return this.url.searchParams.getAll(name)
	}

	public getUrlParamsString() {
		this.url.searchParams.append('offset', this.getPageOffset().toString())
		this.url.searchParams.append('limit', this.limit.toString())
		const urlParams = this.url.searchParams.toString()
		return urlParams.length > 0 ? `?${urlParams}` : ''
	}

	public append(name: string, value: string) {
		this.url.searchParams.append(name, value)
	}

	public set(name: string, value: string) {
		this.url.searchParams.set(name, value)
	}
}
