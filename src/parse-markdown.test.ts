import { parseMarkdown } from './parse-markdown';
import { ClassName, ParsedTextList } from './types';

test('parseMarkdown', () => {
    const markdown = `*JavaScript*, often abbreviated as **JS**, is a ***programming language*** that conforms to the [ECMAScript specification](https://en.wikipedia.org/wiki/ECMAScript). Reference: [*Wikipedia*](https://en.wikipedia.org/wiki/JavaScript)`;
    const result = parseMarkdown(markdown);
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
    expect(result).toEqual(expected);
});
