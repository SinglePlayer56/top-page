import styles from './Advantages.module.css';
import CircleIcon from './circle.svg';
import {AdvantagesProps} from "./Advantages.props";
export const Advantages = ({advantages}: AdvantagesProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            {advantages && advantages.map(advantage => (
                <div className={styles.wrapperCard} key={advantage._id}>
                    <div className={styles.icon}>
                        <CircleIcon/>
                    </div>
                    <div className={styles.cardTitle}>{advantage.title}</div>
                    <div className={styles.line}></div>
                    <div className={styles.cardText}>{advantage.description}</div>
                </div>
            ))}
        </div>
    );
};
