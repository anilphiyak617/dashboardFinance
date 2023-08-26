export interface GetKpisResponse {
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  totalProfit: number;
  totalRevenue: number;
  dailyData: Array<DayData>;
  monthlyData: Array<MonthData>;
  __v: number;
  _id: string;
}

export interface DayData {
  date: string;
  expenses: number;
  id: string;
  revenue: number;
  _id: string;
}

export interface MonthData {
  expenses: number;
  id: string;
  month: string;
  nonOperationalExpenses: number;
  operationalExpenses: number;
  revenue: number;
  _id: string;
}

export interface ExpensesByCategory {
  salaries: number;
  services: number;
  supplies: number;
}


/**
 * Represents the response from the API endpoint for retrieving a list of products.
 */
export interface GetProductsResponse {
    _id: string;
    price: number;
    expense: number;
    transactions: string[];
    __v: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}
