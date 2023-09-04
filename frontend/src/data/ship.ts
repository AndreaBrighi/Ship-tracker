export interface ship {
    name: String,
	choosed_route: String,
	actual_position: coordinates,
	status: 'normal'|'alarm',
	owner: String
}

export interface coordinates {
    latitude: number,
    longitude: number
}