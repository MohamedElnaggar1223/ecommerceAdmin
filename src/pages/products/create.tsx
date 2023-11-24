import { IResourceComponentsProps } from "@refinedev/core";
import { MuiCreateInferencer } from "@refinedev/inferencer/mui";
import Form from "../../components/common/Form";
import { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

export const ProductPostCreate: React.FC<IResourceComponentsProps> = () => 
{
	const [productImage, setProductImage] = useState({ name: "", url: "" });

	const 
	{
		refineCore: { formLoading, onFinish },
		register,
		handleSubmit
	} = useForm({
		shouldUseNativeValidation: true
	})

	const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
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
        // <Form
        //     type="Create"
        //     register={register}
        //     onFinish={onFinish}
        //     formLoading={formLoading}
        //     handleSubmit={handleSubmit}
        //     handleImageChange={handleImageChange}
        //     onFinishHandler={onFinishHandler}
        //     productImage={productImage}
        // />
        <></>
    );
};
