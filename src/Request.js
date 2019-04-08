import axios from "axios";
import btoa from "btoa";

const defaultResponseType = 'json';

export default class Request {
    constructor() {
        this.url = null;
        this.method = null;
        this.headers = {};
        this._responseType = null;
    }

    to(url) {
        this.url = url;
        return this;
    }

    responseType = (type) => {
        this._responseType = type;
        return this;
    }

    contentType(contentType) {
        this.headers["Content-Type"] = contentType;
        return this;
    }

    basicAuth(username, password) {
        const validatedPassword = (password == null) ? '' : password;
        this.headers["Authorization"] = "Basic " + btoa(username + ':' + validatedPassword);
        return this;
    }

    bearerAuth(token) {
        this.headers["Authorization"] = `Bearer ${token}`;
        return this;
    }

    getHeaders() {
        return this.headers;
    }

    async get() {
        console.log('Fazendo requisição GET para a URL "' + this.url + '".');

        try {
            const responseType = (!this._responseType) ? defaultResponseType : this._responseType;
            const response = await axios.get(this.url, {
                headers: this.headers,
                responseType: responseType
            });

            return response.data;
        } catch (error) {
            throw error.response;
        }
    }

    async post(body) {
        console.log('Fazendo requisição POST para a URL "' + this.url + '". Corpo da requisição: ', JSON.stringify(body));

        try {
            const response = await axios.post(this.url, JSON.stringify(body), {
                headers: this.headers,
                responseType: defaultResponseType
            });

            return response.data;
        } catch (error) {
            throw error.response;
        }
    }

    async postAsItIs(body) {
        console.log('Fazendo requisição POST para a URL "' + this.url + '". Corpo da requisição: ', body);

        const response = await axios.post(this.url, body, {
            headers: this.headers,
            responseType: defaultResponseType
        });

        return response.data;
    }

    async delete() {
        console.log('Fazendo requisição DELETE para a URL "' + this.url + '".');

        const response = await axios.delete(this.url, {
            headers: this.headers,
            responseType: defaultResponseType
        });

        return response.data;
    }

    async put(body) {
        console.log('Fazendo requisição PUT para a URL "' + this.url + '". Corpo da requisição: ', JSON.stringify(body));

        const response = await axios.put(this.url, JSON.stringify(body), {
            headers: this.headers,
            responseType: defaultResponseType
        });

        return response.data;
    }

    async patch(body) {
        console.log('Fazendo requisição PATCH para a URL "' + this.url + '". Corpo da requisição: ', JSON.stringify(body));

        const response = await axios.patch(this.url, JSON.stringify(body), {
            headers: this.headers,
            responseType: defaultResponseType
        });

        return response.data;
    }

    async downloadFileFromWebAs(responseType) {
        console.log(`Fazendo requisição GET para a URL "${this.url}"`);
        const response = await axios.get(this.url, { responseType: responseType });
        return response.data;
    }
}
