import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../firebase";

const storage = getStorage(firebaseApp);

const uploadImage = async (imageFile) => {

    const fileRef = ref(storage, "images/"+imageFile.name);

    const uploadTask = await uploadBytes(fileRef, imageFile);

    const downloadUrl = await getDownloadURL(fileRef);

    return downloadUrl;
}

export default uploadImage