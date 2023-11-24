import { IResourceComponentsProps } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import Form from "../../components/common/Form";
import { FieldValues } from "react-hook-form";

export const ProductPostEdit: React.FC<IResourceComponentsProps> = () => 
{
	const [productImage, setProductImage] = useState({ name: "", url: "" })

	const 
	{
		refineCore: { formLoading, onFinish },
		register,
		handleSubmit,
        getValues,
        setValue,
	} = useForm({
		shouldUseNativeValidation: true
	})

    useEffect(() => {
        register('additionalInfo', { required: true })
        register('available')
    }, [register, getValues])

	const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setProductImage({ name: file?.name, url: result }),
        );
    };

	const onFinishHandler = async (data: FieldValues) => {
        if (!productImage.name) return alert("Please upload a product image");
		console.log(data)
        await onFinish({
            ...data,
            image: productImage.url
        });	
    };

	return (
        <Form
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            getValues={getValues}
            setValue={setValue}
            productImage={productImage}
        />
    );
};
