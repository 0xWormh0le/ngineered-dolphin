export interface HumanityProblem {
	shortName: string;
}

export interface Company {
	id: number;
	name: string;
	description: string;
	url: string;
	humanityProblems: HumanityProblem[];
}

export interface Location {
	id: number;
	name: string;
	city: string;
	state: string;
}

export interface Job {
	id: number;
	status?: any;
	title: string;
	description: string;
	url: string;
	sourceUrl: string;
	isActive: boolean;
	company: Company;
	jobType: number;
	location: Location;
	expiredAt?: any;
	isReferralEnabled: boolean;
	referringUserRewardUsd?: any;
	referredUserRewardUsd?: any;
}

export interface Result {
	storyType: number;
	icon: string;
	text: string;
	createdAt: Date;
	context?: any;
	job: Job;
}

export interface TrendingStories {
	results: Result[];
}


