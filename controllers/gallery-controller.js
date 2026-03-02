import { env } from 'cloudflare:workers';

const monarchBucket = env.MONARCH_BUCKET
const galleryImageApi = env.GALLERY_IMAGE_API

const galleryController = {
    getImg: async () => {
        const folders = {}
        const listOfObjects = await monarchBucket.list();

        const imageKeys = listOfObjects.objects.map(element => {
            return element.key;
        });

        const restructured = imageKeys.map((el) => {
            const [folder, img] = el.split('/');
            const url = `${galleryImageApi}/${el}`;
            return { folder, img, url };
        });

        restructured.forEach(({ folder, img, url }) => {
            if (!folders[folder]) {
                folders[folder] = [];
            }
            folders[folder].push({ img, url });
        });

        return new Response(
            JSON.stringify({ data: folders }),
            { status: 201 });
    },
    addImg: async (c) => {
        const { key, value } = await c.req.json();
        await monarchBucket.put(key, value);

        return new Response("Item added", { status: 201 });
    },
    deleteImg: async (c) => {
        const { key } = await c.req.json();
        await monarchBucket.delete(key);

        return new Response("Item deleted", { status: 204 });
    }
};

export default galleryController;
