import type { TranslationKeys, Language } from '../types';
import { en } from './en';
import { ar } from './ar';

export const translations: Record<Language, TranslationKeys> = { en, ar };
export { en, ar };
