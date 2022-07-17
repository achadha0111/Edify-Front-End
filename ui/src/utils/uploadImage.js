import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../firebase";

const storage = getStorage(firebaseApp);

export function handleImage() {
    const quillEditor = this.quill;
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('aria-label', 'UploadImage');
    input.click();

    input.onchange = function () {
        if (this.files[0].size > 5e6) {
            alert("File too big");
        } else if (this.files.length > 1) {
            alert("Upload one file at a time")
        }

        else {
            uploadImage(this.files[0]).then((res) => {
                if (res["status"] === 200) {
                    let range = quillEditor.getSelection();
                    quillEditor.editor.insertEmbed(range.index, "image", res["url"]);
                } else {
                    throw Error(res["message"])
                }
            }).catch((err) => {
                console.log(err)
            });

        }
    }
}

export const uploadImage = async (imageFile) => {

    try {
        const fileRef = ref(storage, "images/"+imageFile.name);

        const fileUpload = await uploadBytes(fileRef, imageFile);

        const downloadUrl = await getDownloadURL(fileRef);

        return {status: 200, url: downloadUrl};
    } catch (e) {
        return {status: 500, message: e}
    }

}