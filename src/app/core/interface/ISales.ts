export interface ISales {
  lastYear: {
    year?: number;
    totalSales?: number;
    monthly?: {
      month?: string;
      sales?: number;
    }[];
  };

  currentYear?: {
    year?: number;
    totalSales?: number;
    monthly?: {
      month?: string;
      sales?: number;
    }[];
  };

  nextYear: {
    year?: number;
    forecastSales?: number;
    monthlyForecast?: {
      month?: string;
      sales?: number;
    }[];
  };
}
