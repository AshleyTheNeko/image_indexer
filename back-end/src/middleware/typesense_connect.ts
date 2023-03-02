import * as typesense from "typesense"

const client = new typesense.Client({
    nodes: [
        {
            host: process.env.TYPESENSE_HOST as string,
            port: 8108,
            protocol: "http",
        },
    ],
    apiKey: process.env.TS_API_KEY as string,
    connectionTimeoutSeconds: 2,
});

export default client;