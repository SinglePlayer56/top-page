export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}
export interface ITopPageModel {
    _id: string;
    tags: string[];
    secondaryCategory: string;
    alias: string;
    title: string;
    category: string;
    seoText?: string;
    tagsTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstCategory: TopLevelCategory;
    advantages: ITopPageAdvantages[];
    createdAt: Date;
    updatedAt: Date;
    hh?: IHHData;
    qas: any;
    addresses: any;
    categoryOn: string;
    blog: IBlog;
    sravnikus: ISravnikus;
    learningclub: ILearningClub;
}
export interface ITopPageAdvantages {
    title: string;
    description: string;
    _id: string;
}

export interface IHHData {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updateAt: Date;
    _id: string;
}

export interface IBlog {
    h1: string;
    metaTitle: string;
    metaDescription: string;
    views: number;
    _id: string;
}

export interface ISravnikus {
    metaTitle: string;
    metaDescription: string;
    qas: any;
    _id: string;
}

export interface ILearningClub {
    metaTitle: string;
    metaDescription: string;
    qas: any;
    _id: string;
}


