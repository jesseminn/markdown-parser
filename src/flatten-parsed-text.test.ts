import { flattenParsedText } from './flatten-parsed-text';
import { ParsedText, ClassName } from './types';

describe('flattenParsedText', () => {
    it('flatten content with 1 level depth', () => {
        const parsedText: ParsedText = {
            content: [
                {
                    content: 'Wikipedia',
                    classNames: [ClassName.EMPHASIS],
                },
            ],
            classNames: [ClassName.URL],
            url: 'https://en.wikipedia.org/wiki/JavaScript',
        };

        const result = flattenParsedText(parsedText);
        const expected = [
            {
                content: 'Wikipedia',
                classNames: ['emphasis', 'url'],
                url: 'https://en.wikipedia.org/wiki/JavaScript',
            },
        ];

        expect(result).toStrictEqual(expected);
    });

    it('flatten content with 3 level depth', () => {
        const parsedText: ParsedText = {
            content: [
                {
                    content: [
                        {
                            content: 'Ref:',
                            classNames: [ClassName.STRONG],
                        },
                        {
                            content: 'Wikipedia',
                            classNames: [ClassName.EMPHASIS],
                        },
                    ],
                },
            ],
            classNames: [ClassName.URL],
            url: 'https://en.wikipedia.org/wiki/JavaScript',
        };
        const result = flattenParsedText(parsedText);
        const expected = [
            {
                content: 'Ref:',
                classNames: [ClassName.STRONG, ClassName.URL],
                url: 'https://en.wikipedia.org/wiki/JavaScript',
            },
            {
                content: 'Wikipedia',
                classNames: [ClassName.EMPHASIS, ClassName.URL],
                url: 'https://en.wikipedia.org/wiki/JavaScript',
            },
        ];
        expect(result).toStrictEqual(expected);
    });
});
