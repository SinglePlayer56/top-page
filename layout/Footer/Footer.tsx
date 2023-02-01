import {IFooterProps} from "./Footer.props";
import styles from "./Footer.module.css";
import cn from "classnames";
import {format} from "date-fns";

export const Footer = ({className, ...props}: IFooterProps): JSX.Element => {
    return (
        <div className={cn(styles.footer, className)} {...props}>
            <p className={styles.copyright}>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</p>
            <a href="#" target="_blank" className={styles.terms}>Пользовательское соглашение</a>
            <a href="#" target="_blank" className={styles.privacy}>Политика конфиденциальности</a>
        </div>
    );
};
