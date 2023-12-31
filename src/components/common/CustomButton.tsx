import Button from "@mui/material/Button";
import { ReactNode } from "react";

interface CustomButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    color: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

const CustomButton = ({
    type,
    title,
    backgroundColor,
    color,
    fullWidth,
    icon,
    handleClick,
    disabled,
}: CustomButtonProps) => {
    return (
        <Button
            disabled={disabled}
            type={type === "submit" ? "submit" : "button"}
            sx={{
                flex: fullWidth ? 1 : "unset",
                padding: "10px 15px",
                width: fullWidth ? "100%" : "fit-content",
                minWidth: 130,
                backgroundColor,
                color,
                fontSize: 16,
                fontWeight: 600,
                gap: "10px",
                textTransform: "capitalize",
                "&:hover": {
                    opacity: 0.9,
                    backgroundColor,
                },
                fontFamily: 'Manrope'
            }}
            onClick={handleClick}
        >
            {icon}
            {title}
        </Button>
    );
};

export default CustomButton;