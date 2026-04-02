import { LectureNoteEntry } from '../../lib/types/chat';
interface LectureNotesViewProps {
    notes: LectureNoteEntry[];
    currentSceneId?: string | null;
}
export declare function LectureNotesView({ notes, currentSceneId }: LectureNotesViewProps): import("react/jsx-runtime").JSX.Element;
export {};
