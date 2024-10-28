const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function indexData(index, data) {
  await client.index({
    index,
    body: data
  });
  await client.indices.refresh({ index });
}

const searchIndex = async (index, query) => {
  try {
    const response = await client.search({
      index,
      body: {
        query: {
          match: { 
            content: {
              query: query,
              operator: "and", 
              minimum_should_match: "75%",
            }
          }
        }
      }
    });

    const hitsResponse = response.hits?.hits

    if (hitsResponse && Array.isArray(hitsResponse)) {
      return hitsResponse;
    } else {
      console.error("Unexpected response structure");
      return [];
    }

  } catch (error) {
    console.error("Error in searchIndex:", error);
    return [];
  }
};


module.exports = { indexData, searchIndex };
