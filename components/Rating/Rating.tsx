import {IRatingProps} from "./Rating.props";
import {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from "react";
import StarIcon from './star.svg';
import cn from "classnames";
import styles from './Rating.module.css';

export const Rating = forwardRef (({error, rating, setRating, isEditable, tabIndex, ...props}: IRatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);


    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (rating: number, index: number): number => {
        if (!isEditable) {
            return -1;
        }
        if (!rating && index === 0) {
            return tabIndex ?? 0;
        }
        if (rating === index +1) {
            return tabIndex ?? 0;
        }
        return -1;
    };

    const constructRating = (currentRating: number) => {
        const updateRating = ratingArray.map((r:JSX.Element, i: number) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => changeRating(i + 1)}
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKey}
                    ref={r => ratingArrayRef.current?.push(r)}
                >
                    <StarIcon/>
                </span>
            );
        });
        setRatingArray(updateRating);
    };

    const changeDisplay = (i: number): void => {
        if (!isEditable) {
            return;
        }
        constructRating(i);
    };

    const changeRating = (i: number): void => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleKey = ( e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
          return;
      }

      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
          if (!rating) {
              setRating(1);
          } else {
              e.preventDefault();
              setRating( rating < 5 ?rating + 1 : 5);
          }
          ratingArrayRef.current[rating]?.focus();
      }

        if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    };

    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {ratingArray.map((r: JSX.Element, i: number) => (<span key={i}>{r}</span>))}
            {error && <span className={styles.ratingMessage}>{error.message}</span>}
        </div>
    );
});
