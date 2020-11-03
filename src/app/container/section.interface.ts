import { INote } from '../section/note.interface'

export interface ISection {
    header: string;
    notes: INote[];
}