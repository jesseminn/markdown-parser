import { pipe } from './pipe';
import { parseUrl } from './parse-url';
import { parseTripleStars } from './parse-triple-stars';
import { parseDoubleStars } from './parse-double-stars';
import { parseSingleStar } from './parse-single-star';
import { flattenTextContent } from './flatten-text-content';

export const parseMarkdown = pipe(parseUrl, parseTripleStars, parseDoubleStars, parseSingleStar, flattenTextContent);
