import { ClassName, Maybe, ParsedText, ParsedTextList } from './types';

const uniqueArray = <T>(arr: T[]) => Array.from(new Set(arr));
const mergeClassNames = (a: Maybe<ClassName[]>, b: Maybe<ClassName[]>) => {
    return uniqueArray([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]).sort(); // order doesn't matter, just for passing test
};

export const flattenParsedText = (input: ParsedText, parent?: ParsedText): ParsedTextList => {
    if (typeof input.content === 'string') {
        const classNames = mergeClassNames(input.classNames, parent && parent.classNames);
        const url = input.url || (parent ? parent.url : undefined);

        return [
            {
                content: input.content,
                classNames,
                url,
            },
        ];
    } else if (Array.isArray(input.content)) {
        // Copy/merge classNames & url to child contents
        const content = input.content.map(c => {
            const classNames = mergeClassNames(c.classNames, input.classNames);
            const url = c.url || (input ? input.url : undefined);
            return {
                ...c,
                classNames,
                url,
            };
        });

        return content.reduce<ParsedTextList>((result, cur) => {
            return result.concat(flattenParsedText(cur, input));
        }, []);
    } else {
        return [];
    }
};
