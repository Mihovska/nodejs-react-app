# Cubes Visualizer

This is a simple visualizer which goal is when the user hover on a cube to see highlighted the corresponding name in the sidebar.
When user clicks on a cube in the viewer the corresponding value in the sidebar list should increment. 
When refreshing or relaunching the application the values from the sidebar should be unchanged.

# Prerequisite

*Install Docker* - please follow the installation instructions depending on your operating system:
- [Mac](https://docs.docker.com/desktop/mac/install/)
- [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Windows](https://docs.docker.com/desktop/windows/install/)
- [Other options](https://docs.docker.com/engine/install/)

*Install Compose*
- On desktop systems like Docker Desktop for Mac and Windows, Docker Compose is included as part of those desktop installations.
- On Linux systems, first install the Docker Engine for your OS as described above and then follow the instructions [here](https://docs.docker.com/compose/install/)

# Build

To start the app run the command: 
```
docker-compose up --build -d
```

To stop the application:
```
docker-compose down
```

## Flow of the application

- First the data is fetched from the [SWAPI](https://swapi.dev/).
- All starships are filtered for those containing `wing` in their name.
- Then the result is converted to array containing objects with the ship name and a number of the clicks.
- Get the ships' data from the database.
- A comparison between the API data and the database is performed.
- The new starships are added to the database.
- After clicking on a starship, the corresponding value is updated in the database.

*Note*
- For easier configuration when needed, the key word `wing` is used as a constant and can be found in: `api/package.json` file - `starShipNameSuffix`.


## Suggestions for future improvements

- To implement a logic where if any of the starships are removed from SWAPI, then these should be removed from the database as well.

- Deployment on the cloud using Serverless, AWS, APIGateway, DynamoDB







