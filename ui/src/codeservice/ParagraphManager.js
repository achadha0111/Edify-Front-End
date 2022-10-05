const baseEndpoint = "http://localhost:8080/api/notebook"

const createParagraph = async (noteId, content) => {
    const endpoint = baseEndpoint + `/${noteId}/paragraph`

    const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({"title": "", text: "%python.python\n" + content})
    });

    return response.json();
}

const deleteParagraph = async (noteId, paragraphId) => {
    const endpoint = baseEndpoint + `/${noteId}/paragraph/${paragraphId}`
    const response = await(endpoint, {
        method: "DELETE",
        mode: "cors",
    });
}

const updateParagraph = async (noteId, paragraphId, content) => {
    const endpoint = baseEndpoint + `/${noteId}/paragraph/${paragraphId}`
    const response = await fetch(endpoint, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({text: "%python.python\n" + content})
    });

    console.log(response);

    return response.json();
}

const runWOCreateParagraph = async (noteId, paragraphId, content) => {
    await updateParagraph(noteId, paragraphId, content);
    const endpoint = baseEndpoint + `/run/${noteId}/${paragraphId}`
    const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
    });

    return response.json();
}

const runWCreateParagraph = async (noteId, content) => {
    let para = await createParagraph(noteId, content);
    const endpoint = baseEndpoint + `/run/${noteId}/${para["body"]}`
    const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
    });

    return {data: await response.json(), paraId: para["body"]};
}

export {runWCreateParagraph, runWOCreateParagraph, createParagraph, deleteParagraph, updateParagraph}