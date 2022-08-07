const baseEndpoint = "http://[zeppelin-server]:[zeppelin-port]/api/notebook"

const createParagraph = async (noteId) => {
    const endpoint = baseEndpoint + `/${noteId}/paragraph`
    const response = await(endpoint, {
        method: "POST",
        mode: "cors",
    });

    return response.json()
}

const deleteParagraph = async (noteId, paragraphId) => {
    const endpoint = baseEndpoint + `/${noteId}/paragraph/${paragraphId}`
    const response = await(endpoint, {
        method: "DELETE",
        mode: "cors",
    });

    return response.json();
}

const updateParagraph = async (noteId, paragraphId, content) => {
    const endpoint = baseEndpoint + `/${noteId}/paragraph/${paragraphId}`
    const response = await(endpoint, {
        method: "PUT",
        mode: "cors",
        body: content
    });

    return response.json();
}

const runParagraph = async (noteId, paragraphId) => {
    const endpoint = baseEndpoint + `/run/${noteId}/${paragraphId}`
    const response = await(endpoint, {
        method: "POST",
        mode: "cors",
    });

    return response.json();
}