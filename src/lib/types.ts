export type Maybe<T> = T | null | undefined;

export enum ClassName {
    EMPHASIS = 'emphasis',
    STRONG = 'strong',
    URL = 'url',
}

export type TextContent = string | ParsedText[];

export type ParsedText = {
    content: TextContent;
    classNames?: ClassName[];
    url?: string;
};

export type ParsedTextList = ParsedText[];
