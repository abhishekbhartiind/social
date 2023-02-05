import FileResizer from "react-image-file-resizer";

export const resizeImage = (imageFile: Blob, minWidth: number, minHeight: number) => {
    return new Promise((resolve) => {
        FileResizer.imageFileResizer(
            imageFile,
            1920,
            1920,
            "JPEG",
            80,
            0,
            (uri) => {
            resolve(uri);
            },
            "base64",
            minWidth,
            minHeight
        );
    });
}