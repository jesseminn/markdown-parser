import { flattenParsedText } from './flatten-parsed-text';
import { ParsedText, ClassName } from './types';

test('flattenParsedText', () => {
    const parsedText1: ParsedText = {
        content: [
            {
                content: 'Wikipedia',
                classNames: [ClassName.EMPHASIS],
            },
        ],
        classNames: [ClassName.URL],
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    };

    /*
    const result1 = flattenParsedText(parsedText1);
    const expect1 = [
        {
            content: 'Wikipedia',
            classNames: ['emphasis', 'url'],
            url: 'https://en.wikipedia.org/wiki/JavaScript',
        },
    ];

    expect(result1).toStrictEqual(expect1);
    */

    const thisWorks: ParsedText = {
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
        classNames: [ClassName.URL],
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    };

    // This failed?
    const parsedText2: ParsedText = {
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
    const result2 = flattenParsedText(parsedText2);
    const expect2 = [
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
    expect(result2).toStrictEqual(expect2);
});

const notFlatten = [
    {
        content: [
            {
                content: [
                    {
                        content: [
                            {
                                content: 'JavaScript',
                                classNames: ['emphasis'],
                            },
                            {
                                content: ', often abbreviated as ',
                            },
                        ],
                    },
                    {
                        content: [
                            {
                                content: 'JS',
                            },
                        ],
                        classNames: ['strong'],
                    },
                    {
                        content: [
                            {
                                content: ', is a ',
                            },
                        ],
                    },
                ],
            },
            {
                content: [
                    {
                        content: [
                            {
                                content: 'programming language',
                            },
                        ],
                    },
                ],
                classNames: ['emphasis', 'strong'],
            },
            {
                content: [
                    {
                        content: [
                            {
                                content: ' that conforms to the ',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        content: [
            {
                content: [
                    {
                        content: [
                            {
                                content: 'ECMAScript specification',
                            },
                        ],
                    },
                ],
            },
        ],
        classNames: ['url'],
        url: 'https://en.wikipedia.org/wiki/ECMAScript',
    },
    {
        content: [
            {
                content: [
                    {
                        content: [
                            {
                                content: '. Reference: ',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        content: [
            {
                content: [
                    {
                        content: [
                            {
                                content: 'Wikipedia',
                                classNames: ['emphasis'],
                            },
                        ],
                    },
                ],
            },
        ],
        classNames: ['url'],
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    },
];
