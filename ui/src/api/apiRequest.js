/**
 * Wrapper function to allow id token access before every request
 * @param method: Type of request method to use
 * @param endpoint: API endpoint to send request to
 * @param auth: auth context to allow access to id token
 * @param body: [optional] any request body
 * */
export async function MakeRequest(method, endpoint, auth, body) {
    const idToken = await auth.fetchIdToken();
    const response = await fetch(endpoint, {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
        },
        body: typeof body === 'undefined' ? null : JSON.stringify(body)
    });
    return response.json();
}