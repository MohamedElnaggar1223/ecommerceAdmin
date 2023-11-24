import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import CustomButton from "./CustomButton";
import { FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { BaseRecord, CreateResponse, UpdateResponse, useList, useOne } from "@refinedev/core";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useParams } from "react-router-dom";
import Loading from "./Loading";

interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
    handleImageChange: (file: any) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    productImage: { name: string, url: string },
    getValues: UseFormGetValues<FieldValues>,
    setValue: UseFormSetValue<FieldValues>,
}

const Form = ({
    type,
    register,
    handleSubmit,
    handleImageChange,
    formLoading,
    onFinishHandler,
    productImage,
    getValues,
    setValue,
}: FormProps) => {
    const { data: categories, isLoading, isError } = useList({
        resource: 'categories'
    })

    const { id } = useParams()
    const { data, isSuccess, refetch } = useOne({
        resource: 'products',
        id: id
    })

    // console.log(data)

    const [additionalInputs, setAdditionalInputs] = useState([{ '': '' }])
    const [available, setAvailable] = useState(true)

    const allCategories = categories?.data ?? []

    // useEffect(() => {
    //     const fetchRe = async () => await refetch()
    //     fetchRe()
    //     if(isSuccess) {
    //         console.log(data.data.available)
    //         setAvailable(data.data.available)
    //     }
    //     //eslint-disable-next-line
    // }, [refetch, isSuccess])

    // refetch()

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if(isSuccess) {
            const addsObj = data.data.additionalInfo ?? {"" : ''}
            const addsArray = Object.keys(addsObj).map((info: string, index) => {
                const newObj: any = {} 
                newObj[info] = Object.values(addsObj)[index]
                return newObj
            })
            setAdditionalInputs(addsArray)
        }
        //eslint-disable-next-line
    }, [data, getValues, isSuccess])

    useEffect(() => {
        if(isSuccess) {
            console.log(data)
            const availableProd = data.data.available
            setAvailable(availableProd)
        }
        //eslint-disable-next-line
    }, [getValues, isSuccess])

    useEffect(() => {
        if(isSuccess){
            const availableProd = data?.data.available
            setAvailable(availableProd)
        }
    }, [data, isSuccess])

    // useEffect(() => {
    //     refetch()
    // }, [refetch])

    useEffect(() => {
        setValue('additionalInfo', additionalInputs)
    }, [additionalInputs, setValue])

    useEffect(() => {
        setValue('available', available)
    }, [available, setValue])

    if(isLoading) return <>Loading...</>
    if(isError) return <>Error</> 
    if(formLoading) return <Loading />

    // console.log(getValues())

    // console.log(Object.values(register("additionalInfo", { required: true })))
    // console.log(getValues().additionalInfo)

    function handleChangeKey(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number)
    {
        const addInfo = additionalInputs[index]
        // Object.defineProperty(addInfo, e.target.value, Object.getOwnPropertyDescriptor(addInfo, Object.keys(addInfo)[0]));
        const newObj = { [e.target.value]: Object.values(addInfo)[0] }
        const newArray = additionalInputs.map((info, indexNo) => indexNo !== index ? info : newObj)
        //@ts-expect-error array
        setAdditionalInputs(newArray)
    }

    function handleChangeValue(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number)
    {
        const addInfo = additionalInputs[index]
        // Object.defineProperty(addInfo, e.target.value, Object.getOwnPropertyDescriptor(addInfo, Object.keys(addInfo)[0]));
        const newObj = { [Object.keys(addInfo)[0]]: e.target.value }
        const newArray = additionalInputs.map((info, indexNo) => indexNo !== index ? info : newObj)
        //@ts-expect-error array
        setAdditionalInputs(newArray)
    }

    function handleRemoveObject(index: number)
    {
        const newArray = additionalInputs.filter((_, indexNo) => index !== indexNo)
        setAdditionalInputs(newArray)
    }

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {type} a Product
            </Typography>

            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter product name
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("title", { required: true })}
                        />
                    </FormControl>
                    {/* <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter product details
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("additionalInfo", { required: true })}
                        />
                    </FormControl> */}
                    <FormControl sx={{ gap: 2 }}>
                    <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Product Additional Info
                        </FormHelperText>
                        {
                            additionalInputs?.map((info, index) => (
                                <Stack
                                    direction='row'
                                    gap={1.5}
                                    alignItems='center'
                                    key={index}
                                >
                                    <RemoveCircleOutlineIcon 
                                        sx={{
                                            '&:hover':{
                                                borderRadius: '100%',
                                                backgroundColor: 'rgba(176, 176, 176, 0.15)',
                                                cursor: 'pointer',
                                                boxShadow: '0px 0px 0px 4px rgba(176, 176, 176, 0.15)'
                                            },
                                            order: -1
                                        }}
                                        onClick={() => handleRemoveObject(index)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={Object.keys(info) ? Object.keys(info)[0] : ''}
                                        onChange={(e) => handleChangeKey(e, index)}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={Object.values(info) ? Object.values(info)[0] : ''}
                                        onChange={(e) => handleChangeValue(e, index)}
                                    />
                                    {
                                        index + 1 === additionalInputs.length ?
                                        <AddCircleOutlineIcon 
                                            sx={{
                                                '&:hover':{
                                                    borderRadius: '100%',
                                                    backgroundColor: 'rgba(176, 176, 176, 0.15)',
                                                    cursor: 'pointer',
                                                    boxShadow: '0px 0px 0px 4px rgba(176, 176, 176, 0.15)'
                                                }
                                            }}
                                            onClick={() => setAdditionalInputs(prev => [...prev, { '': '' }])}
                                        />
                                        :
                                        <AddCircleOutlineIcon
                                            sx={{
                                                color: '#fcfcfc',
                                            }}
                                        />
                                    }
                                    {/* {
                                        index + 1 === additionalInputs.length &&
                                        <>
                                        <AddCircleOutlineIcon 
                                            sx={{
                                                '&:hover':{
                                                    borderRadius: '100%',
                                                    backgroundColor: 'rgba(176, 176, 176, 0.15)',
                                                    cursor: 'pointer',
                                                    boxShadow: '0px 0px 0px 4px rgba(176, 176, 176, 0.15)'
                                                }
                                            }}
                                            onClick={() => setAdditionalInputs(prev => [...prev, { '': '' }])}
                                        />
                                        <AddCircleOutlineIcon
                                            sx={{
                                                color: '#fcfcfc',
                                                order: -1
                                            }}
                                        />
                                        </>
                                    }
                                        <>
                                        <RemoveCircleOutlineIcon 
                                            sx={{
                                                '&:hover':{
                                                    borderRadius: '100%',
                                                    backgroundColor: 'rgba(176, 176, 176, 0.15)',
                                                    cursor: 'pointer',
                                                    boxShadow: '0px 0px 0px 4px rgba(176, 176, 176, 0.15)'
                                                },
                                                order: -1
                                            }}
                                            onClick={() => handleRemoveObject(index)}
                                        />
                                        <AddCircleOutlineIcon
                                            sx={{
                                                color: '#fcfcfc'
                                            }}
                                        />
                                        </> */}
                                </Stack>
                            ))
                        }
                    </FormControl>

                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter Description
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            required
                            placeholder="Write description"
                            color="info"
                            style={{
                                width: "100%",
                                background: "transparent",
                                fontSize: "16px",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
                                color: "#919191",
                            }}
                            {...register("description", { required: true })}
                        />
                    </FormControl>

                    <Stack direction="row" gap={4}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Category
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                defaultValue='Smartphones'
                                inputProps={{ "aria-label": "Without label" }}
                                {...register("category", {
                                    required: true,
                                })}
                            >
                                {allCategories.map(cat => <MenuItem key={cat._id} value={cat.category}>{cat.category}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Enter product price
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                type="number"
                                variant="outlined"
                                {...register("price", { required: true })}
                            />
                        </FormControl>
                    </Stack>

                    <FormControlLabel control={<Checkbox disabled={formLoading} checked={available} onClick={() => setAvailable(prev => !prev)} />} label="Available" />

                    <Stack
                        direction="column"
                        gap={1}
                        justifyContent="center"
                        mb={2}
                    >
                        <Stack direction="row" gap={2}>
                            <Typography
                                color="#11142d"
                                fontSize={16}
                                fontWeight={500}
                                my="10px"
                            >
                                Product Photo
                            </Typography>

                            <Button
                                component="label"
                                sx={{
                                    width: "fit-content",
                                    color: "#2ed480",
                                    textTransform: "capitalize",
                                    fontSize: 16,
                                }}
                            >
                                Upload *
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        handleImageChange(e.target.files![0]);
                                    }}
                                />
                            </Button>
                        </Stack>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                        >
                            {productImage?.name}
                        </Typography>
                    </Stack>

                    <CustomButton
                        type="submit"
                        title={formLoading ? "Submitting..." : "Submit"}
                        backgroundColor="#FAEDEA"
                        color="#000"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default Form;