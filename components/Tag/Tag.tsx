import {ITagProps} from "./Tag.props";
import styles from './Tag.module.css';
import cn from "classnames";

export const Tag = ({children, color = 'primary', href, size = 'm', className, ...props}: ITagProps): JSX.Element => {
    return (
        <div className={cn(styles.tag, className, {
            [styles.m]: size === 'm',
            [styles.s]: size === 's',
            [styles.ghost]: color === 'ghost',
            [styles.primary]: color === 'primary',
            [styles.green]: color === 'green',
            [styles.grey]: color === 'grey',
            [styles.red]: color === 'red'
        })}
             {...props}
        >
            {
                href
                    ? <a href={href}>{children}</a>
                    : <>{children}</>
            }
        </div>
    );
};
