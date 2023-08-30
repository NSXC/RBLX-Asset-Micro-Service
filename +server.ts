import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, url }) {
    let asset = url.searchParams.get('assetid');
    const resp = await fetch(`https://www.roblox.com/item-thumbnails?params=[{assetId:${asset}}]`);
    
    if (resp.ok) {
        const data = await resp.json();
        
        if (data.length > 0) {
            const thumbnailUrl = data[0].thumbnailUrl;
            const modifiedThumbnailUrl = thumbnailUrl.replace('/420/420/', '/150/150/');
            
            throw redirect(302, modifiedThumbnailUrl);
        } else {
            throw error(404, 'Thumbnail data not found.');
        }
    } else {
        throw error(500, 'Failed to fetch thumbnail data.');
    }
}
