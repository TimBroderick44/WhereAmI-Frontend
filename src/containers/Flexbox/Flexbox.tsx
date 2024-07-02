import style from "./Flexbox.module.scss";
import { FlexboxProps } from "../../types";

const Flexbox: React.FC<FlexboxProps> = ({
    flexdirection = "column",
    justifycontent = "center",
    alignitems = "center",
    gap = 0,
    children,
}) => {
    return (
        <div
            className={style.box}
            style={{
                flexDirection: flexdirection,
                justifyContent: justifycontent,
                alignItems: alignitems,
                gap: `${gap}px`,
            }}
        >
            {children}
        </div>
    );
};

export default Flexbox;