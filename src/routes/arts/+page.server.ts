import { loadArts } from '$lib/server';
import { serializeNonPOJOs } from '$lib/tools';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  let { pb, ...rest } = locals
  try {
    const arts = await loadArts(url)
    return {
      ...rest,
      arts,
      error: null
    };
  } catch (error) {
    return {
      ...rest,
      arts: null,
      error: serializeNonPOJOs(error)
    };
  }
}
