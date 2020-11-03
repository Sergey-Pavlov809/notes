import { INote } from '../section/note.interface';

export interface ISection {
    header: string;
    notes: Map<number, INote>;
    id: number;
    headerColor: string;
}
