import DashBoardBox from '@/components/DashboardBox'
import HeaderBox from '@/components/HeaderBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const Row1 = () => {

    const { palette } = useTheme();

    const { data } = useGetKpisQuery();
    const revenueExpenses = useMemo(() => {
        // console.log("data", data)
        return data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
            return { name: month.slice(0, 3), revenue, expenses }
        })
    }, [data])

    const revenueProfit = useMemo(() => {
        // console.log("data", data)
        return data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
            return { name: month.slice(0, 3), revenue, profit: revenue - expenses }
        })
    }, [data])

    const revenueMonth = useMemo(() => {
        return data && data[0].monthlyData.map(({ revenue, month }) => {
            return { month: month.slice(0, 3), revenue: revenue.toFixed(2) };
        })
    }, [data])

    console.log("data:", revenueExpenses)

    return (
        <>
            {/* Revenue vs Expenses */}
            <DashBoardBox gridArea={'a'}  >
                <HeaderBox
                    title='Revenue and Expenses'
                    subTitle='This is the revenue and expenses graph'
                    sideText='+5%'
                />
                <ResponsiveContainer width={"100%"}>
                    <AreaChart
                        data={revenueExpenses}
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

                        <XAxis
                            tickLine={false}
                            dataKey="name" style={{ fontSize: "10px" }} />
                        <YAxis style={{ fontSize: "10px" }}
                            tickLine={false}
                            domain={[9000, 23000]}
                            strokeWidth={0}
                        />
                        <Area dot type="monotone" dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area dot type="monotone" dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                        <Tooltip />
                    </AreaChart>
                </ResponsiveContainer>

            </DashBoardBox >
            {/* Profit vs Revenue */}
            <DashBoardBox gridArea={'b'} >
                <HeaderBox
                    subTitle='top line represents profit, bottom line represents revenue'
                    title="Profit and Revenue"
                    sideText='+4%'
                />
                <ResponsiveContainer width={"100%"} height={"100%"} >
                    <LineChart
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 60,
                        }}
                    >

                        <CartesianGrid vertical={false} color={palette.grey[800]} />
                        <XAxis
                            tickLine={false}
                            dataKey="name" style={{ fontSize: "10px" }} />
                        <YAxis style={{ fontSize: "10px" }}

                            tickLine={false}
                            strokeWidth={0}
                            yAxisId={"left"}
                        />
                        <YAxis style={{ fontSize: "10px" }}
                            tickLine={false}
                            strokeWidth={0}
                            yAxisId={"right"}
                            orientation='right'
                        />
                        <Line yAxisId={"left"} dot type="monotone" dataKey="profit" stroke={palette.tertiary[400]} fillOpacity={1} />
                        <Line yAxisId={"right"} dot type="monotone" dataKey="revenue" stroke={palette.primary.light} fillOpacity={1} />
                        <Legend height={0} wrapperStyle={{
                            marginBottom: '10px',
                        }} />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </DashBoardBox>
            {/* Revenue Month by Month  */}
            <DashBoardBox gridArea={'c'} >
                <HeaderBox
                    title='Revenue Month by Month'
                    subTitle='graph representing the revenue month by month'
                    sideText='+4%'
                />
                <ResponsiveContainer
                    width={"100%"}
                    height={"100%"}
                >
                    <BarChart
                        data={revenueMonth}
                        margin={{
                            top: 20,
                            right: 15,
                            left: -10,
                            bottom: 60,
                        }}

                    >
                        {/* gradients */}
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary.dark} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={palette.primary.dark} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis
                            dataKey="month"
                            fontSize={"10px"}
                            tickLine={false}
                            axisLine={false} />
                        <YAxis
                            fontSize={"10px"}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />

                    </BarChart>
                </ResponsiveContainer>
            </DashBoardBox>
        </>
    )
}

export default Row1