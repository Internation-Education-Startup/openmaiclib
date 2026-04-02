import { QuizQuestion } from '../../lib/types/stage';
interface QuizViewProps {
    readonly questions: QuizQuestion[];
    readonly sceneId: string;
}
export declare function QuizView({ questions, sceneId }: QuizViewProps): import("react/jsx-runtime").JSX.Element;
export {};
