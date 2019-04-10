import Request from "./Request";

export default class watsonService {
    sendMessage(message, context) {
        const request = new Request();
        return new Promise((resolve, reject) => {
            request
                .to(`https://gateway.watsonplatform.net/assistant/api/v1/workspaces/${process.env.REACT_APP_WORKSPACE_ID}/message?version=2019-02-28`)
                .basicAuth(process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD)
                .contentType("application/json")
                .post({
                    "context": context,
                    "input": {"text": message}
                })
                .then(response => resolve(response));
        })
    }
}