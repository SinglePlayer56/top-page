import styles from "./ReviewForm.module.css";
import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import CloseIcon from './krest.svg';
import {useForm, Controller} from "react-hook-form";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();


    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что то пошло не так');
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={cn(className, styles.reviewForm)}
                {...props}
            >
                <Input
                    {...register('name', {required: {value: true, message: 'Заполните имя'}})}
                    placeholder={'Имя'}
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
                />
                <Input
                    {...register('title', {required: {value: true, message: 'Заполните заголовок'}})}
                    className={styles.title}
                    placeholder={'Заголовок отзыва'}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.title ? true : false}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name={'rating'}
                        rules={{required: {value: true, message: 'Укажите рейтинг'}}}
                        render={({field}) => (
                            <Rating
                                className={styles.stars}
                                ref={field.ref}
                                isEditable
                                rating={field.value}
                                setRating={field.onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <TextArea {...register('description', {required: {value: true, message: 'Заполните описание'}})}
                          className={styles.description}
                          placeholder={'Текст отзыва'}
                          error={errors.description}
                          tabIndex={isOpened ? 0 : -1}
                          aria-label={'Текст отзыва'}
                          aria-invalid={errors.description ? true : false}
                />
                <div className={styles.submit}>
                    <Button tabIndex={isOpened ? 0 : -1} appearance={'primary'}
                            onClick={() => clearErrors()}>Отправить</Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.panel, styles.success)} role={'alert'}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div className={styles.successDescription}>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <button
                    className={styles.close}
                    onClick={() => setIsSuccess(false)}
                    aria-label={'Закрыть оповещение'}
                >
                    <CloseIcon/>
                </button>
            </div>}
            {error && <div className={cn(styles.panel, styles.error)}>
                Что-то пошло не так, попробуйте обновить страницу
                <button
                    className={styles.close}
                    onClick={() => setError(undefined)}
                    aria-label={'Закрыть оповещение'}
                >
                    <CloseIcon />
                </button>
            </div>}
        </form>
    );
};
