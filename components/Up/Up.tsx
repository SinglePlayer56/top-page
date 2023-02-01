import styles from './Up.module.css';
import {useScrollY} from "../../hooks/useScrollY";
import {useAnimation} from "framer-motion";
import {motion} from 'framer-motion';
import {useEffect} from "react";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";
export const Up = () : JSX.Element => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({opacity: y / 500});
    }, [y, controls]);

    const scrollToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    };

    return (
        <motion.div
            className={styles.up}
            animate={controls}
            initial={{opacity: 0}}
        >
            <ButtonIcon
                appearance={'primary'}
                icon={'up'}
                onClick={scrollToTop}
            />
        </motion.div>
    );
};

