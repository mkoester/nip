import type { Question }  from '$lib/types'
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const res: Question = {
        id: 1,
        question: "what did the fox say?",
        lang: "en"
    }
    return res;
}) satisfies PageServerLoad;
