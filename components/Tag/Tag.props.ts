import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface ITagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children : ReactNode;
    size?: 's' | 'm';
    color?: 'ghost' | 'grey' | 'red' | 'green' | 'primary';
    href?: string;
}
