import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useList, useTable } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import { Add } from "@mui/icons-material";
import { useMemo } from "react";

export const ProductPostList = () => 
{
	const navigate = useNavigate();

	const { data: categories, isLoading: catsLoading } = useList({
		resource: 'category'
	})

	const allCategories = categories?.data ?? []

	const 
	{
		current,
		setCurrent,
		filters,
		setFilters,
		pageCount,
		setPageSize,
		sorters,
		setSorters,
		tableQueryResult: { data, isLoading, isError }
	} = useTable()

	const allProducts = data?.data ?? [];

	const currentPrice = sorters.find((item) => item.field === "price")?.order;

    const toggleSort = (field: string) => {
        setSorters([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
			categoryName:
				logicalFilters.find((item) => item.field === 'categoryName')?.value || ""
        };
    }, [filters]);

	if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;
	// const columns: GridColDef[] = Object.keys(allProducts[0]).map(product => product !== '_id' && {
	// 	field: product,
	// 	headerName: product,
	// 	width: 250,
	// 	editable: true
	// })

	// console.log(columns)

	return (
		// <>
		// 	<DataGrid
		// 		rows={allProducts}
		// 		columns={columns}
		// 		initialState={{}}
		// 	/>
		// 	<Button onClick={() => setSorters([{ field: 'price', order: sorters.find(item => item.field === 'price')?.order === 'desc' ? 'asc' : 'desc' }])}>Test</Button>
		// </>


		<Box>
		<Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
			<Stack direction="column" width="100%">
				<Typography sx={{ fontFamily: 'Manrope' }} fontSize={25} fontWeight={700} color="#11142d">
					{!allProducts.length
						? "There are no products"
						: "All Products"}
				</Typography>
					<Box
						display="flex"
						gap={2}
						flexWrap="wrap"
						mb={{ xs: "20px", sm: 0 }}
						mt='20px'
					>
						<CustomButton
							title={`Sort price ${
								currentPrice === "asc" ? "↑" : "↓"
							}`}
							handleClick={() => toggleSort("price")}
							backgroundColor="#F9EBE8"
							color="#11142d"
						/>
						<TextField
							variant="outlined"
							color="info"
							sx={{ fontFamily: 'Manrope' }}
							placeholder="Search by title"
							value={currentFilterValues.title}
							onChange={(e) => {
								setFilters([
									{
										field: "title",
										operator: "contains",
										value: e.currentTarget.value
											? e.currentTarget.value
											: undefined,
									},
								]);
							}}
						/>
						<Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
								sx={{ fontFamily: 'Manrope' }}
                                defaultValue=""
                                value={currentFilterValues.categoryName}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "categoryName",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem sx={{ fontFamily: 'Manrope' }} value="">All</MenuItem>
                                {allCategories.map((cat) => (
                                    <MenuItem
                                        key={cat.category}
                                        value={cat.category}
										sx={{ fontFamily: 'Manrope' }}
                                    >
                                        {cat.category}
                                    </MenuItem>
                                ))}
                            </Select>
						<Stack
							direction="row"
							ml='auto'
							mr='10px'
						>
							<CustomButton
								title="Add Product"
								handleClick={() => navigate("/products/create")}
								backgroundColor="#F9EBE8"
								color="#11142d"
								icon={<Add />}
							/>
						</Stack>
					</Box>
			</Stack>
		</Box>

		<Box mt='20px' sx={{ overflowX: 'auto', width: 'auto' }}>
			<Box pb={4} mt="20px" sx={{ display: "flex", flexDirection: 'column', overflowY: 'hidden' }}>
				<Box
					display='flex'
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'
					height='10px'
					p={4}
					mx='20px'
					border='0px'
					width='fit-content'
					sx={{
						borderColor: '#999da0',
						boxShadow: '0px 0px 4px 1px rgba(153,157,160, 0.3)'
					}}
				>
					<Stack minWidth='320px'>
						<Typography fontFamily='Manrope' fontWeight={600}>id</Typography>
					</Stack>
					<Stack minWidth='380px'>
						<Typography fontFamily='Manrope' fontWeight={600}>image</Typography>
					</Stack>
					<Stack minWidth='380px'>
						<Typography fontFamily='Manrope' fontWeight={600}>title</Typography>
					</Stack>
					<Stack minWidth='320px'>
						<Typography fontFamily='Manrope' fontWeight={600}>price</Typography>
					</Stack>
					<Stack minWidth='380px'>
						<Typography fontFamily='Manrope' fontWeight={600}>description</Typography>
					</Stack>
					<Stack minWidth='320px'>
						<Typography fontFamily='Manrope' fontWeight={600}>category</Typography>
					</Stack>
				</Box>
				{allProducts?.map((product) => (
					<Box
						display='flex'
						flexDirection='row'
						alignItems='center'
						justifyContent='space-between'
						height='120px'
						p={4}
						mx='20px'
						border='0px'
						width='fit-content'
						sx={{
							borderColor: '#999da0',
							boxShadow: '0px 0px 4px 1px rgba(153,157,160,0.3)'
						}}
					>
						<Stack minWidth='320px'>
							<Typography fontFamily='Manrope'>{product.id}</Typography>
						</Stack>
						<Stack minWidth='380px'>
							<img width='60px' style={{ height: 'auto' }} src={product.image} />
						</Stack>
						<Stack minWidth='380px'>
							<Typography fontFamily='Manrope'>{product.title.slice(0, 50)}{product.title.length > 50 ? '...' : ''}</Typography>
						</Stack>
						<Stack minWidth='320px'>
							<Typography fontFamily='Manrope'>${product.price}</Typography>
						</Stack>
						<Stack minWidth='380px'>
							<Typography fontFamily='Manrope'>{product.description.slice(0, 35)}{product.description.length > 35 ? '...' : ''}</Typography>
						</Stack>
						<Stack minWidth='320px'>
							<Typography fontFamily='Manrope'>{product.categoryName}</Typography>
						</Stack>
					</Box>
				))}
			</Box>
		</Box>

		{allProducts.length > 0 && (
			<Box display="flex" gap={2} mt={3} flexWrap="wrap">
				<CustomButton
					title="Previous"
					handleClick={() => setCurrent((prev) => prev - 1)}
					backgroundColor="#F9EBE8"
					color="#11142d"
					disabled={!(current > 1)}
				/>
				<Box
					display={{ xs: "hidden", sm: "flex" }}
					alignItems="center"
					gap="5px"
				>
					Page{" "}
					<strong>
						{current} of {pageCount}
					</strong>
				</Box>
				<CustomButton
					title="Next"
					handleClick={() => setCurrent((prev) => prev + 1)}
					backgroundColor="#F9EBE8"
					color="#11142d"
					disabled={current === pageCount}
				/>
				<Select
					variant="outlined"
					color="info"
					displayEmpty
					required
					inputProps={{ "aria-label": "Without label" }}
					defaultValue={10}
					onChange={(e) =>
						setPageSize(
							e.target.value ? Number(e.target.value) : 10,
						)
					}
				>
					{[10, 20, 30, 40, 50].map((size) => (
						<MenuItem key={size} value={size}>
							Show {size}
						</MenuItem>
					))}
				</Select>
			</Box>
		)}
	</Box>
	)
};
