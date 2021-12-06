export interface ILeadersProps {
    miami7: number;
    name: string;
    points: number;
}

export interface IDataProps {
    data: ILeadersProps[];
    ratingFieldName: string;
    teamName: 'miami';
}
