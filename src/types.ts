import type { Coordinate } from 'ol/coordinate';
import type { Pixel } from 'ol/pixel';
import { Map as OlMap } from 'ol';
import BaseEvent from 'ol/events/Event.js';

export enum EventTypes {
    CONTEXTMENU = 'contextmenu',
    CLICK = 'click',
    DBLCLICK = 'dblclick',
}

export enum CustomEventTypes {
    BEFOREOPEN = 'beforeopen',
    OPEN = 'open',
    CLOSE = 'close',
    ADD_MENU_ENTRY = 'add-menu-entry',
}

export class ContextMenuEvent extends BaseEvent {
    public coordinate: Coordinate;
    public pixel: Pixel;

    constructor(options: {
        type: `${CustomEventTypes.BEFOREOPEN}` | `${CustomEventTypes.OPEN}`;
        coordinate: Coordinate;
        pixel: Pixel;
    }) {
        super(options.type);
        this.pixel = options.pixel;
        this.coordinate = options.coordinate;
    }
}

export type CallbackObject = {
    coordinate: Coordinate;
    data: unknown;
};

export type ItemSeparator = '-';

export type SingleItem = {
    text: string;
    classname?: string;
    icon?: string;
    callback: (object: CallbackObject, map: OlMap) => void;
    data?: unknown;
};

export type MenuEntry = {
    id: string;
    isSubmenu: boolean;
    isSeparator: boolean;
    callback: SingleItem['callback'] | null;
    data: unknown;
};

export type ItemWithNested = {
    text: string;
    classname?: string;
    icon?: string;
    items: Item[];
};

export type Item = SingleItem | ItemSeparator | ItemWithNested;

export type Options = {
    width: number;
    scrollAt: number;
    eventType: `${EventTypes}`;
    defaultItems: boolean;
    items: Item[];
};
