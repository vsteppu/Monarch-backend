import { Hono } from "hono";

import galleryController from '../controllers/gallery-controller.js'

const router = new Hono();

router.get(`/get-images`, galleryController.getImg);
router.post(`/add-image`, galleryController.addImg);
router.delete(`/delete-image`, galleryController.deleteImg);

export default router;