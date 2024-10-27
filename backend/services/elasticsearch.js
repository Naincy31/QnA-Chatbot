const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function indexData(index, data) {
  await client.index({
    index,
    body: data
  });
  await client.indices.refresh({ index });
}

module.exports = { indexData };
