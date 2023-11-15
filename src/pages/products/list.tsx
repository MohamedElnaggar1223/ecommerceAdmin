import { Box, Button, Stack } from "@mui/material";
import { IResourceComponentsProps, useTable } from "@refinedev/core";
import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const ProductPostList = () => 
{
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

	return (
		<>
			<Box>
				{allProducts.map(prod => <Stack direction='row'>{prod.id}, {prod.title}, {prod.price}</Stack>)}
			</Box>
			<Button onClick={() => setSorters([{ field: 'price', order: 'desc' }])}>Test</Button>
		</>
	)
};
