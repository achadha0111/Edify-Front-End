/** This manager is a wrapper on Zeppelin's RESTApi for notebook operations
 * - https://zeppelin.apache.org/docs/0.10.1/usage/rest_api/notebook.html
 * @author{Aayush Chadha} */

const baseEndpoint = "http://localhost:8080/api/notebook"

/** Create a new note
 * @return{JSON} {
 *    "status": "ok",
 *    "message": "",
 *    "body": ""
 * }*/
const createZepNote = async (noteName) => {
    const response = await fetch(baseEndpoint, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({"name": noteName})
    });

    return response.json();
}

/** Delete existing note
 * @input{String} noteId */
const deleteNote = async (noteId) => {
    console.log("Deleting", noteId)
    const noteToDelete = `/${noteId}`
    const response = await fetch(baseEndpoint+noteToDelete, {
        method: "DELETE",
    });

    return response.json();
}

export {createZepNote, deleteNote}