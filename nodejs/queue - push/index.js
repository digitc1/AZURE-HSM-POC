module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    
    const { CosmosClient } = require("@azure/cosmos");
    const endpoint = process.env.ENDPOINT;
    const key = process.env.KEY;
    const client = new CosmosClient({ endpoint, key });

    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    const { container } = await database.containers.createIfNotExists({ id: "Test Database" });

    container.items.create(myQueueItem);
};
