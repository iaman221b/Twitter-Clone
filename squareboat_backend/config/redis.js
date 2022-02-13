import { createClient } from 'redis';

let client =  (async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value999');
  const value = await client.get('key');
  console.log("value: " + value);


  return client

})();



export default client