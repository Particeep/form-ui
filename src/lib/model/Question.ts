import {Possibility} from "./Possiblity";
import {Id} from "./Id";
import {SectionId} from "./Section";

export type QuestionId = Id;

export enum QuestionType {
    RADIO = 'RADIO',
    SELECT = 'SELECT',
    TEXT = 'TEXT',
    LONGTEXT = 'LONGTEXT',
    CHECKBOX = 'CHECKBOX',
    DOCUMENT = 'DOCUMENT',
    DATE = 'DATE',
    LABEL = 'LABEL',
}

export interface Question {
    id: QuestionId;
    section_id: SectionId;
    possibility_id_dep: string;
    label: string;
    question_type: QuestionType;
    required: boolean;
    possibilities: Possibility[];
    pattern: string;
    answers: string[];
    index: number; // Position
}