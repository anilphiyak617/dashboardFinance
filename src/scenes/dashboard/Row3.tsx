import DashBoardBox from '@/components/DashboardBox'
import HeaderBox from '@/components/HeaderBox'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { useMemo } from 'react'
import FlexBetween from '@/components/FlexBetween'
import { Cell, Pie, PieChart } from 'recharts'
type Props = {}

const Row3 = (props: Props) => {

    const { palette } = useTheme();
    const { data: kpisData } = useGetKpisQuery();
    const { data: productsData } = useGetProductsQuery();
    const { data: transactionsData } = useGetTransactionsQuery();

    console.log("Row-3 rendered :")

    const transactionRows = useMemo(() => {
        return transactionsData && transactionsData.map(({ id, amount, buyer, productIds }) => {
            return {
                id, amount, buyer, count: productIds?.length
            }
        })
    }, [transactionsData])

    const productColumns: GridColDef[] = [
        { field: 'id', headerName: 'id', flex: 1 },
        { field: 'expense', headerName: 'Expense', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
    ];

    const transactionColumns: GridColDef[] = [
        { field: 'id', headerName: 'id', flex: 1 },
        { field: 'buyer', headerName: 'Buyer', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 1 },
    ];

    const pieChartData = useMemo(() => {
        if (kpisData) {
            const dataObj = kpisData[0].expensesByCategory;
            const totalExpenses = kpisData[0].totalExpenses;
            return Object.entries(dataObj).map(([key, value]) => {
                console.log(key, value);
                return [
                    { name: key, value },
                    { name: `${key} of Total`, value: totalExpenses - value },
                ]
            });
        }
    }, [kpisData]);
    const pieColors = [palette.primary[800], palette.primary[300]];

    return (
        <>
            {/*  products expense price */}
            <DashBoardBox gridArea={'g'} >
                {/* Todo: change the hard coded sideText */}
                <HeaderBox
                    title='List of Products'
                    sideText={`${productsData?.length} products`} />
                <Box
                    mt={"0.5rem"}
                    p={'0 0.5rem'}
                    height={"80%"}
                    width={"100%"}
                >
                    <DataGrid
                        // componentProps depreciated Menu llist is rendered as popper outside of DataGrid container
                        // used to customize componet withing the datagrid

                        // 
                        slotProps={{
                            // contains popup elements
                            basePopper: {
                                sx: {
                                    "& .MuiDataGrid-menuList ,.MuiSvgIcon-root": {
                                        color: palette.grey[300]
                                    },
                                }
                            }
                        }}

                        sx={{
                            color: palette.grey[300],
                            border: 'none',
                            "& .MuiDataGrid-cell": {
                                borderBottom: `1px solid ${palette.grey[800]}`,
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                borderBottom: `1px solid ${palette.grey[800]} !important`,
                            },
                            // styling column header icons
                            "& .MuiSvgIcon-root": {
                                color: palette.grey[300]
                            },

                        }}
                        hideFooter={true}
                        rows={productsData || []}
                        columns={productColumns}
                        columnHeaderHeight={25}
                        rowHeight={35}
                    />
                </Box>
            </DashBoardBox>
            {/* RECENT ORDERS */}
            <DashBoardBox gridArea={'h'} >
                {/* Todo: change the hard coded sideText */}
                <HeaderBox
                    title='List of Products'
                    sideText={`${transactionRows?.length} products`} />
                <Box
                    mt={"0.5rem"}
                    p={'0 0.5rem'}
                    height={"80%"}
                    width={"100%"}
                >
                    <DataGrid

                        // componentProps depreciated Menu llist is rendered as popper outside of DataGrid container
                        // used to customize componet withing the datagrid
                        slotProps={{
                            // contains popup elements
                            basePopper: {
                                sx: {
                                    "& .MuiDataGrid-menuList ,.MuiSvgIcon-root": {
                                        color: palette.grey[300],
                                        overflow: "hidden"
                                    },

                                }
                            }
                        }}

                        sx={{
                            color: palette.grey[300],
                            border: 'none',
                            "& .MuiDataGrid-cell": {
                                borderBottom: `1px solid ${palette.grey[800]}`,
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                borderBottom: `1px solid ${palette.grey[800]} !important`,
                            },
                            // styling column header icons
                            "& .MuiSvgIcon-root": {
                                color: palette.grey[300]
                            },

                        }}
                        hideFooter={true}
                        rows={transactionRows || []}
                        columns={transactionColumns}
                        columnHeaderHeight={25}
                        rowHeight={35}
                    />
                </Box>
            </DashBoardBox>

            <DashBoardBox gridArea={'i'} >
                <HeaderBox title="Expense Breakdown By Category" sideText="+4%" />
                <FlexBetween
                    mt="0.5rem"
                    gap="0.5rem"
                    textAlign="center"
                    mb="2rem"
                    p={"0rem 0.5rem"}
                >
                    {pieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`}>
                            <PieChart width={110} height={75}>
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashBoardBox>

            <DashBoardBox gridArea={'j'} >
                <HeaderBox
                    title="Overall Summary and Explanation Data"
                    sideText="+15%"
                />
                <Box
                    margin="1.25rem 1rem 0.4rem 1rem"
                    height={15}
                    bgcolor={palette.primary[800]}
                    borderRadius={10}
                >
                    <Box
                        height={"100%"}
                        width="40%"
                        bgcolor={palette.primary[600]}
                        borderRadius={10}
                    ></Box>
                </Box>
                <Typography margin="0 1rem" variant="h6">
                    This is the summary and there is 15% increase in the sales
                </Typography>
            </DashBoardBox>
        </>
    )
}

export default Row3