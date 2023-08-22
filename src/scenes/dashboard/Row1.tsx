import DashBoardBox from '@/components/DashboardBox'
import HeaderBox from '@/components/HeaderBox'
import { useGetKpisQuery } from '@/state/api'
import { BookOnline } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {}

const Row1 = (props: Props) => {

    const { palette } = useTheme();

    const { data } = useGetKpisQuery();
    const monthlyData = useMemo(() => {
        // console.log("data", data)
        return data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
            return { name: month.slice(0, 3), revenue, expenses }
        })
    }, [data])

    console.log("data:", monthlyData)

    return (
        <>
            {/* Monthly Data Graph */}

            <DashBoardBox gridArea={'a'}  >
                <HeaderBox
                    title='This is title'
                    subTitle='this is subtitle'
                    icon={<BookOnline />}
                />
                <ResponsiveContainer width={"100%"}>
                    <AreaChart
                        data={monthlyData}
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

            <DashBoardBox gridArea={'b'} ></DashBoardBox>
            <DashBoardBox gridArea={'c'} ></DashBoardBox>
        </>
    )
}

export default Row1