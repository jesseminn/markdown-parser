import { ParsedTextList, TextContent } from './types';
import { flattenParsedText } from './flatten-parsed-text';

export const flattenTextContent = (input: TextContent): ParsedTextList => {
    if (typeof input === 'string') {
        return [{ content: input }];
    } else if (Array.isArray(input)) {
        return input.reduce<ParsedTextList>((acc, cur) => {
            return acc.concat(flattenParsedText(cur));
        }, []);
    } else {
        return [];
    }
};
