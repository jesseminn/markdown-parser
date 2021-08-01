import { ParsedText, ParsedTextList, TextContent, ClassName } from './lib/types';
import { mapMarkdownToHTMLElement } from './lib/map-markdown-to-html-element';

const text = `*JavaScript*, often abbreviated as **JS**, is a ***programming language*** that conforms to the [ECMAScript specification](https://en.wikipedia.org/wiki/ECMAScript). Reference: [*Wikipedia*](https://en.wikipedia.org/wiki/JavaScript)`;
const text2 = `3 * 5 is not equal to 2 * 7`;

const markdownElement = mapMarkdownToHTMLElement(text);

document.body.append(markdownElement);

const test = {
    content: [
        {
            content: [
                {
                    content: [
                        {
                            content: 'JavaScript',
                            className: [ClassName.EMPHASIS],
                        },
                        {
                            content: ', often abbreviated as ',
                        },
                    ],
                },
                {
                    content: 'JS',
                    classNames: [ClassName.STRONG],
                },
                {
                    content: ', is a ',
                },
            ],
        },
        {
            content: 'programming language',
            classNames: [ClassName.STRONG, ClassName.EMPHASIS],
        },
        {
            content: 'that conforms to the ',
        },
    ],
};

// match url first
const step1Result = [
    {
        content: '*JavaScript*, often abbreviated as **JS**, is a ***programming language*** that conforms to the ',
    },
    {
        content: 'ECMAScript specification',
        url: 'https://en.wikipedia.org/wiki/ECMAScript',
    },
    {
        content: '. Reference: ',
    },
    {
        content: '*Wikipedia*',
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    },
];

// match ***
const step2Result = [
    {
        content: [
            {
                content: '*JavaScript*, often abbreviated as **JS**, is a ',
            },
            {
                content: 'programming language',
                classNames: [ClassName.STRONG, ClassName.EMPHASIS],
            },
            {
                content: 'that conforms to the ',
            },
        ],
    },
    {
        content: 'ECMAScript specification',
        url: 'https://en.wikipedia.org/wiki/ECMAScript',
    },
    {
        content: '. Reference: ',
    },
    {
        content: '*Wikipedia*',
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    },
];

// match **
const step3Result = [
    {
        content: [
            {
                content: [
                    {
                        content: '*JavaScript*, often abbreviated as ',
                    },
                    {
                        content: 'JS',
                        classNames: [ClassName.STRONG],
                    },
                    {
                        content: ', is a ',
                    },
                ],
            },
            {
                content: 'programming language',
                classNames: [ClassName.STRONG, ClassName.EMPHASIS],
            },
            {
                content: 'that conforms to the ',
            },
        ],
    },
    {
        content: 'ECMAScript specification',
        url: 'https://en.wikipedia.org/wiki/ECMAScript',
    },
    {
        content: '. Reference: ',
    },
    {
        content: '*Wikipedia*',
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    },
];

// match *
const step4Result = [
    {
        content: [
            {
                content: [
                    {
                        content: [
                            {
                                content: 'JavaScript',
                                className: [ClassName.EMPHASIS],
                            },
                            {
                                content: ', often abbreviated as ',
                            },
                        ],
                    },
                    {
                        content: 'JS',
                        classNames: [ClassName.STRONG],
                    },
                    {
                        content: ', is a ',
                    },
                ],
            },
            {
                content: 'programming language',
                classNames: [ClassName.STRONG, ClassName.EMPHASIS],
            },
            {
                content: 'that conforms to the ',
            },
        ],
    },
    {
        content: 'ECMAScript specification',
        url: 'https://en.wikipedia.org/wiki/ECMAScript',
    },
    {
        content: '. Reference: ',
    },
    {
        content: [
            {
                content: 'Wikipedia',
                classNames: [ClassName.EMPHASIS],
            },
        ],
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    },
];

const flattenedResult = [
    {
        content: 'JavaScript',
        className: [ClassName.EMPHASIS],
    },
    {
        content: ', often abbreviated as ',
    },
    {
        content: 'JS',
        classNames: [ClassName.STRONG],
    },
    {
        content: ', is a ',
    },
    {
        content: 'programming language',
        classNames: [ClassName.STRONG, ClassName.EMPHASIS],
    },
    {
        content: 'that conforms to the ',
    },
    {
        content: 'ECMAScript specification',
        url: 'https://en.wikipedia.org/wiki/ECMAScript',
    },
    {
        content: '. Reference: ',
    },
    {
        content: 'Wikipedia',
        classNames: [ClassName.EMPHASIS],
        url: 'https://en.wikipedia.org/wiki/JavaScript',
    },
];

const expectedResult = [
    {
        text: 'JavaScript',
        classNames: [ClassName.EMPHASIS],
    },
    {
        text: ', often abbreviated as ',
    },
    {
        text: 'JS',
        classNames: [ClassName.STRONG],
    },
];
