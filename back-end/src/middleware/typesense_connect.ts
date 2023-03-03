import * as typesense from "typesense"

const client = new typesense.Client({
    nodes: [
        {
            host: "typesense",
            port: 8108,
            protocol: "http",
        },
    ],
    apiKey: "fortnite",
    connectionTimeoutSeconds: 2,
});

export default client;