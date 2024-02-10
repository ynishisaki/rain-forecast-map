export interface Data {
	ResultInfo: any;
	Feature: Array<{
		Geometry: any;
		Property: {
			WeatherAreaCode: number;
			WeatherList: {
				Weather: Array<{
					Date: string; // "202402041600"
					Type: string;
					Rainfall: number;
				}>;
			};
		};
		Id: string;
		Name: string;
	}>;
}
