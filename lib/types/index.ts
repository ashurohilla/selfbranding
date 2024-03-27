    export type IBlog = {
		author: string | null
		coments_enables: boolean | null
		content: string | null
		created_at: string
		id: number
		image: string | null
		meta_description: string | null
		meta_tiltle: string | null
		published_at: string
		slug: string
		status: boolean
		title: string | null
};

export type IBlogDetial = {
	created_at: string;
	id: string;
	image: string;
	title: string;
	status:boolean;
	meta_description: string;
	meta_tiltle: string;
	coments_enabled: boolean;
	published_at: string;
	slug:string;
	content:string;
	author:string;
} | null;
export type Icourse ={
	author: string ;
	bannerImage: string;
	categoryId: string;
	description: string;
	instructor: string;
	name: string;
	price: string;
} | null;

export type IBlogForm = {
	created_at: string;
	id: string;
	image: string;
	is_premium: boolean;
	is_published: boolean;
	title: string;
	blog_content: {
		blog_id: string;
		content: string;
		created_at: string;
	};
};

export type Iuser = {
	created_at: string;
	display_name: string;
	email: string;
	id: string;
	image_url: string;
	role: string;
	stripe_customer_id: string | null;
	stripe_subscriptoin_id: string | null;
	subscription_status: boolean;
} | null;
