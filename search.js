const esClient = require('./client');
const searchDoc = async function(indexName, mappingType, payload){
    return await esClient.search({
        index: indexName,
        type: mappingType,
        body: payload
    });
}

module.exports = searchDoc;

/**
 * Example
 */
async function test(){
    const body = {
        query: {
            match: {
                "title": "Learn"
            }
        }
    }
    try {
        const resp = await searchDoc('blog', 'ciphertrick', body);
        console.log(resp);
    } catch (e) {
        console.log(e);
    }
}


// test();

// More details here https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html