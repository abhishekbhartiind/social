import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

export const uploadImage = async (image: string, imageId?: string) => {
    const result = await cloudinary.uploader.upload(image, {
        folder: 'instapets',
        public_id: imageId
    });
    return result.public_id;
}

export const generateUrl = (imageId: string) => {
    return cloudinary.url(imageId);
}