import {IPProps} from "./P.props";
import styles from './P.module.css';
import cn from "classnames";

export const P = ({children, size = '16', ...props}: IPProps) : JSX.Element => {
    return (
        <p  className={cn(styles.p, {
            [styles.max]: size === '16',
            [styles.middle]: size === '14',
            [styles.min]: size === '12',
        })}
            {...props}
        >
            {children}
        </p>
    );
};

