import DashBoardBox from "@/components/DashboardBox"
import HeaderBox from "@/components/HeaderBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api"
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {}

const Row2 = (props: Props) => {

    const { palette } = useTheme();
    const { data: productsData } = useGetProductsQuery();
    const { data: kpisData } = useGetKpisQuery();

    /**
 * This function processes the `kpisData` to extract monthly operational and
 * non-operational expenses, and then memoizes the result for improved performance.
 * @param kpisData - The input array of KPIs data.
 * @returns An array of objects containing operational, non-operational expenses, and month.
 */
    const operationalData = useMemo(() => {
        return kpisData && kpisData[0].monthlyData.map(({ nonOperationalExpenses, operationalExpenses, month }) => {
            return {
                operationalExpenses,
                nonOperationalExpenses,
                month: month.slice(0, 3)
            }
        })
    }, [kpisData])



    const campaignsData = useMemo(() => {
        return productsData && productsData.map(({ expense, price }) => {
            return {
                expense, price
            }
        });
    }, [productsData])


    return (
        <>
            {/* Operational vs Non operational expenses */}

            <DashBoardBox gridArea={'d'} >
                <HeaderBox
                    title="Operational vs Non-Operational Expenses"
                    sideText="+4%"
                />
                <ResponsiveContainer width={"100%"} height={"100%"}  >
                    <LineChart
                        data={operationalData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 40,
                        }}
                    >

                        <CartesianGrid vertical={false} color={palette.grey[800]} />
                        <XAxis
                            tickLine={false}
                            dataKey="month" style={{ fontSize: "10px" }} />
                        <YAxis style={{ fontSize: "10px" }}
                            orientation="left"
                            axisLine={false}
                            tickLine={false}
                            strokeWidth={0}
                            yAxisId={"left"}
                        />
                        <YAxis style={{ fontSize: "10px" }}
                            tickLine={false}
                            axisLine={false}
                            strokeWidth={0}
                            yAxisId={"right"}
                            orientation='right'
                        />
                        <Line yAxisId={"left"} dot type="monotone" dataKey="operationalExpenses" stroke={palette.tertiary[400]} fillOpacity={1} />
                        <Line yAxisId={"right"} dot type="monotone" dataKey="nonOperationalExpenses" stroke={palette.primary.light} fillOpacity={1} />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </DashBoardBox>

            {/* Campaigns and Targets PIE-CHARTS */}
            <DashBoardBox gridArea={'e'} >
                <HeaderBox
                    title="Operational vs Non-Operational Expenses"
                    sideText="+4%"
                />
                <ResponsiveContainer width={"100%"}>
                    <PieChart
                        // data={revenueExpenses}
                        margin={{ top: 15, right: 20, left: -10, bottom: 60 }}
                    >
                        {/* gradients */}
                        <defs>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary.dark} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={palette.primary.dark} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Pie type="monotone" dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Pie type="monotone" dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                        {/* <Tooltip /> */}
                    </PieChart>
                </ResponsiveContainer>
            </DashBoardBox>


            {/*  Product Pices vs Expenses */}
            <DashBoardBox gridArea={'f'} >
                            
            </DashBoardBox>
        </>
    )
}

export default Row2;