module.exports = async function (context, req) {
    const { CosmosClient } = require("@azure/cosmos");

    const endpoint = process.env.ENDPOINT;
    const key = process.env.KEY;
    const client = new CosmosClient({ endpoint, key });
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    const { container } = await database.containers.createIfNotExists({ id: "Test Database" });

    const { resources } = await container.items
        .query("SELECT * from c")
        .fetchAll();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: resources
    };
}
