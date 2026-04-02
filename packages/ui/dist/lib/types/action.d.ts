/**
 * Unified Action System
 *
 * Actions are the sole mechanism for agents to interact with the presentation.
 * Two categories:
 * - Fire-and-forget: visual effects on slides (spotlight, laser)
 * - Synchronous: must wait for completion before next action (speech, whiteboard, discussion)
 *
 * Both online (streaming) and offline (playback) paths consume the same Action types.
 */
export interface ActionBase {
    id: string;
    title?: string;
    description?: string;
}
/** Spotlight — focus on a single element, dim everything else */
export interface SpotlightAction extends ActionBase {
    type: 'spotlight';
    elementId: string;
    dimOpacity?: number;
}
/** Laser — point at an element with a laser effect */
export interface LaserAction extends ActionBase {
    type: 'laser';
    elementId: string;
    color?: string;
}
/** Speech — teacher narration (wait for TTS to finish) */
export interface SpeechAction extends ActionBase {
    type: 'speech';
    text: string;
    audioId?: string;
    audioUrl?: string;
    voice?: string;
    speed?: number;
}
/** Open whiteboard (wait for animation) */
export interface WbOpenAction extends ActionBase {
    type: 'wb_open';
}
/** Draw text on whiteboard (wait for render) */
export interface WbDrawTextAction extends ActionBase {
    type: 'wb_draw_text';
    elementId?: string;
    content: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    fontSize?: number;
    color?: string;
}
/** Draw shape on whiteboard (wait for render) */
export interface WbDrawShapeAction extends ActionBase {
    type: 'wb_draw_shape';
    elementId?: string;
    shape: 'rectangle' | 'circle' | 'triangle';
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor?: string;
}
/** Draw chart on whiteboard (wait for render) */
export interface WbDrawChartAction extends ActionBase {
    type: 'wb_draw_chart';
    elementId?: string;
    chartType: 'bar' | 'column' | 'line' | 'pie' | 'ring' | 'area' | 'radar' | 'scatter';
    x: number;
    y: number;
    width: number;
    height: number;
    data: {
        labels: string[];
        legends: string[];
        series: number[][];
    };
    themeColors?: string[];
}
/** Draw LaTeX formula on whiteboard (wait for render) */
export interface WbDrawLatexAction extends ActionBase {
    type: 'wb_draw_latex';
    elementId?: string;
    latex: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    color?: string;
}
/** Draw table on whiteboard (wait for render) */
export interface WbDrawTableAction extends ActionBase {
    type: 'wb_draw_table';
    elementId?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    data: string[][];
    outline?: {
        width: number;
        style: string;
        color: string;
    };
    theme?: {
        color: string;
    };
}
/** Draw line/arrow on whiteboard (wait for render) */
export interface WbDrawLineAction extends ActionBase {
    type: 'wb_draw_line';
    elementId?: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color?: string;
    width?: number;
    style?: 'solid' | 'dashed';
    points?: ['', 'arrow'] | ['arrow', ''] | ['arrow', 'arrow'] | ['', ''];
}
/** Clear all whiteboard elements */
export interface WbClearAction extends ActionBase {
    type: 'wb_clear';
}
/** Delete a specific whiteboard element by ID */
export interface WbDeleteAction extends ActionBase {
    type: 'wb_delete';
    elementId: string;
}
/** Close whiteboard (wait for animation) */
export interface WbCloseAction extends ActionBase {
    type: 'wb_close';
}
/** Play video — start playback of a video element on the slide */
export interface PlayVideoAction extends ActionBase {
    type: 'play_video';
    elementId: string;
}
/** Discussion — trigger a roundtable discussion */
export interface DiscussionAction extends ActionBase {
    type: 'discussion';
    topic: string;
    prompt?: string;
    agentId?: string;
}
export type Action = SpotlightAction | LaserAction | PlayVideoAction | SpeechAction | WbOpenAction | WbDrawTextAction | WbDrawShapeAction | WbDrawChartAction | WbDrawLatexAction | WbDrawTableAction | WbDrawLineAction | WbClearAction | WbDeleteAction | WbCloseAction | DiscussionAction;
export type ActionType = Action['type'];
/** Action types that fire immediately without blocking */
export declare const FIRE_AND_FORGET_ACTIONS: ActionType[];
/** Action types that only work on slide scenes (require slide canvas elements) */
export declare const SLIDE_ONLY_ACTIONS: ActionType[];
/** Action types that must complete before the next action runs */
export declare const SYNC_ACTIONS: ActionType[];
/**
 * Percentage-based geometry (0-100 coordinate system)
 * Used by spotlight/laser overlays for responsive positioning.
 */
export interface PercentageGeometry {
    x: number;
    y: number;
    w: number;
    h: number;
    centerX: number;
    centerY: number;
}
