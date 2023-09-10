import DashBoardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween";
import HeaderBox from "@/components/HeaderBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";

const Row2 = () => {

    const { palette } = useTheme();
    const { data: productsData } = useGetProductsQuery();
    const { data: kpisData } = useGetKpisQuery();

    const pieColors = [palette.primary[800], palette.primary[300]];
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



    /*** dummy data for pie charts
     * 
     */
    const pieData = [
        { name: "Group A", value: 600 },
        { name: "Group B", value: 400 },
    ];


    const productExpenseData = useMemo(() => {
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
            <DashBoardBox gridArea={'e'}
            >
                <HeaderBox
                    title="Campaigns and Targets"
                    sideText="+4%"
                />
                <FlexBetween
                    gap={'1.5rem'}
                    mt={'0.25rem'}
                // sx={{ backgroundColor: 'blue' }}
                >
                    <PieChart
                        // data={revenueExpenses}

                        margin={{
                            // top: 20,
                            left: 10,
                            // right: -10,
                            bottom: 0,
                        }}
                        width={110}
                        height={110}
                    >

                        <Pie
                            data={pieData}
                            dataKey="value"
                            cx={50}
                            cy={50}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={5}
                            fill={palette.primary.dark}
                        >
                            {pieData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                            ))}

                        </Pie>
                    </PieChart>
                    {/* Middle section */}
                    <Box ml="-0.7rem"
                        flexBasis="40%"
                        textAlign="center"
                    >
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
                            83
                        </Typography>
                        <Typography variant="h6">
                            Finance goals of the campaign that is desired
                        </Typography>
                    </Box>
                    {/* Right section */}
                    <Box flexBasis="40%">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant="h6">Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant="h5">
                            Profit Margins
                        </Typography>
                        <Typography variant="h6">
                            Margins are up by 30% from last month.
                        </Typography>
                    </Box>

                </FlexBetween>


            </DashBoardBox>
            {/*  Product Pices vs Expenses */}
            <DashBoardBox gridArea={'f'} >
                <HeaderBox title="Product Prices vs Expenses" sideText="+4%" />
                <ResponsiveContainer width={"100%"} height={"100%"}  >
                    <ScatterChart
                        width={730}
                        height={250}
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -10,
                        }}

                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <ZAxis type="number" range={[20]} />
                        <Tooltip formatter={(v) => `$${v}`} />
                        <Scatter
                            name="Product Expense Ratio"
                            data={productExpenseData}
                            fill={palette.tertiary[500]}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashBoardBox>
        </>
    )
}

export default Row2;