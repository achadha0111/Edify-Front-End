/** This manager is a wrapper on Zeppelin's RESTApi for notebook operations
 * - https://zeppelin.apache.org/docs/0.10.1/usage/rest_api/notebook.html
 * @author{Aayush Chadha} */

const baseEndpoint = "http://[zeppelin-server]:[zeppelin-port]/api/notebook"

/** Create a new note
 * @return{JSON} {
 *    "status": "ok",
 *    "message": "",
 *    "body": ""
 * }*/
const createZepNote = async () => {
    const response = await fetch(baseEndpoint, {
        method: "POST",
        mode: 'cors',
    });

    return response.json();
}

/** Delete existing note
 * @input{String} noteId */
const deleteNote = async (noteId) => {
    const noteToDelete = `/${noteId}`
    const response = await fetch(baseEndpoint+noteToDelete, {
        method: "DELETE",
    });

    return response.json();
}

export {createZepNote, deleteNote}