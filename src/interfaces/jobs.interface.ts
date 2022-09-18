export interface jobs {
	count: number;
	next: string;
	previous: string;
	results: Result[];
}


interface Result {
	id: number;
	status: string;
	title: string;
	url: string;
	sourceUrl: string;
	isActive: boolean;
	company: number;
	jobType: number;
	location: string;
	expiredAt: Date;
	isReferralEnabled: boolean;
	referringUserRewardUsd: number;
	referredUserRewardUsd: number;
}


