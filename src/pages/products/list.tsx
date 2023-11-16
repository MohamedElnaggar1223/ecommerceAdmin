import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useTable } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import { Add } from "@mui/icons-material";
import PropertyCard from "../../components/common/PropertyCard";
import { useMemo } from "react";

export const ProductPostList = () => 
{
	const navigate = useNavigate();

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
            propertyType:
                logicalFilters.find((item) => item.field === "propertyType")
                    ?.value || "",
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
				<Typography fontSize={25} fontWeight={700} color="#11142d">
					{!allProducts.length
						? "There are no properties"
						: "All Properties"}
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
						<Stack
							direction="row"
							ml='auto'
							mr='10px'
						>
							<CustomButton
								title="Add Property"
								handleClick={() => navigate("/products/create")}
								backgroundColor="#F9EBE8"
								color="#11142d"
								icon={<Add />}
							/>
						</Stack>
					</Box>
			</Stack>
		</Box>

		<Box sx={{ overflowX: 'auto', width: 'auto' }}>
			<Box mt="20px" sx={{ display: "flex", flexDirection: 'column', gap: 3 }}>
				<Box
					display='flex'
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'
					height='50px'
					mx='20px'
				>
					<Stack minWidth='320px'>
						<Typography fontWeight={600} fontFamily='arial'>id</Typography>
					</Stack>
					<Stack minWidth='380px'>
						<Typography fontWeight={600} fontFamily='arial'>title</Typography>
					</Stack>
					<Stack minWidth='320px'>
						<Typography fontWeight={600} fontFamily='arial'>price</Typography>
					</Stack>
					<Stack minWidth='380px'>
						<Typography fontWeight={600} fontFamily='arial'>description</Typography>
					</Stack>
					<Stack minWidth='320px'>
						<Typography fontWeight={600} fontFamily='arial'>category</Typography>
					</Stack>
				</Box>
				{allProducts?.map((product) => (
					<Box
						display='flex'
						flexDirection='row'
						alignItems='center'
						justifyContent='space-between'
						height='50px'
						mx='20px'
					>
						<Stack minWidth='320px'>
							<Typography>{product.id}</Typography>
						</Stack>
						<Stack minWidth='380px'>
							<Typography>{product.title.slice(0, 50)}{product.title.length > 50 ? '...' : ''}</Typography>
						</Stack>
						<Stack minWidth='320px'>
							<Typography>${product.price}</Typography>
						</Stack>
						<Stack minWidth='380px'>
							<Typography>{product.description.slice(0, 35)}{product.description.length > 35 ? '...' : ''}</Typography>
						</Stack>
						<Stack minWidth='320px'>
							<Typography>{product.categoryName}</Typography>
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
