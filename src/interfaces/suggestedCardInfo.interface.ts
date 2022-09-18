export interface suggestedCardInfo {
	count: number
	results: result[]
	jobSuggestionDt: string
}

interface result {
	id: number
	status: number
	suggestedAt: string
	title: string
	description: string
	url: string
	isActive: boolean
	company: company
}

interface company {
	id: number
	name: string
	description: string
	url: string
	humanityProblems: humanityProblem[]
}

interface humanityProblem {
	shortName: string
}

interface JobType {
	id: number
	name: string
}

interface location {
	id: number
	name: String
	city: String
	state: String
}

