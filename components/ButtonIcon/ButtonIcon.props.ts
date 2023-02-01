import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import up from './arrow-up.svg';
import close from './Close.svg';
import menu from './menu.svg';

export const icons = {
    up,
    close,
    menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    appearance: 'primary' | 'white';
    icon: IconName;
}
