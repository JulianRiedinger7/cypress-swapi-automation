For this practice, we are going to test a real API using the version of cypress you like,  and an appropriate framework architecture to organize and reuse the API calls and implement test scenarios.

We will use the Star Wars API (swapi) for this exercise, the base URL is https://swapi.dev/ and we need to Implement tests (a different test for each request) performing the following actions:

1. Test the endpoint people/2/ and check the success response, the skin color to be gold, and the amount of films it appears on (should be 6).

2. Request the endpoint of the second movie in which people/2/ was present (using the response from people/2/). Check the release date to be in the correct date format, and the response to include characters, planets, starships, vehicles and species, each element including more than 1 element.

3. Request the endpoint of the first planet present in the last film's response (using the previous response). Check the gravity and the terrains matching the exact same values returned by the request (Use fixtures to store and compare the data of terrains and gravity).

4. On the same response from the planet, grab the url element on the response, and request it. Validate the response being exactly the same from the previous one.

5. Request the /films/7/ and check the response having a 404 code.

