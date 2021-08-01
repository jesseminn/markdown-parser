import { parseMarkdown } from './parse-markdown';
import { ClassName, ParsedTextList } from './types';

describe('parseMarkdown', () => {
    it('parse markdown string with emphasis, strong and link', () => {
        const markdown = `*JavaScript*, often abbreviated as **JS**, is a ***programming language*** that conforms to the [ECMAScript specification](https://en.wikipedia.org/wiki/ECMAScript). Reference: [*Wikipedia*](https://en.wikipedia.org/wiki/JavaScript)`;
        const parsed = parseMarkdown(markdown);
        const expected: ParsedTextList = [
            {
                content: 'JavaScript',
                classNames: [ClassName.EMPHASIS],
                url: undefined,
            },
            {
                content: ', often abbreviated as ',
                classNames: [],
                url: undefined,
            },
            {
                content: 'JS',
                classNames: [ClassName.STRONG],
                url: undefined,
            },
            {
                content: ', is a ',
                classNames: [],
                url: undefined,
            },
            {
                content: 'programming language',
                classNames: [ClassName.EMPHASIS, ClassName.STRONG],
                url: undefined,
            },
            {
                content: ' that conforms to the ',
                classNames: [],
                url: undefined,
            },
            {
                content: 'ECMAScript specification',
                classNames: [ClassName.URL],
                url: 'https://en.wikipedia.org/wiki/ECMAScript',
            },
            {
                content: '. Reference: ',
                classNames: [],
                url: undefined,
            },
            {
                content: 'Wikipedia',
                classNames: [ClassName.EMPHASIS, ClassName.URL],
                url: 'https://en.wikipedia.org/wiki/JavaScript',
            },
        ];
        expect(parsed).toEqual(expected);
    });

    it('parse string with asterisk which is multiply', () => {
        const markdown = `3 * 5 is larger than 2 * 7`;
        const parsed = parseMarkdown(markdown);
        const expected = [
            {
                content: '3 * 5 is larger than 2 * 7',
                classNames: [],
            },
        ];
        expect(parsed).toEqual(expected);
    });
});
