# IpStack cache
This node proyect cache data from https://ipstack.com (old https://freegeoip.net/)

## Run using docker image
Use image from https://hub.docker.com/r/gravadigital/ipstack-cache
```
docker pull gravadigital/ipstack-cache
```
Use `docker-compose.yml` file as reference and configure your ipstack api key in `IPSTACK_TOKEN` environment variable.

## Run localy:

#### Install dependences:
* require node v4 or higher
```
npm install
```

#### Configure:
Copy .env.template file into .env and set your ipstack api key in `IPSTACK_TOKEN` field.

#### Run:
```
npm start
```

## Usage:

#### Route
```
GET :url/api/ip - return your ip info (not for local ip)
```
```
GET :url/api/ip/xx.xx.xx.xx - return ip info (not for local ip)
```

#### Response format
```
{
    _id: (String),
    ipRange: (String),
    countryCode: (String),
    countryName: (String),
    regionCode: (String),
    regionName: (String),
    city: (String),
    zipCode: (String),
    timeZone: (String),
    latitude: (Number),
    longitude: (Number),
    metroCode: (Number)
}
```

#### Example
Request:
```
GET /api/ip/181.45.90.105
```
Response:
```
{
  "ipRange": "181.45.90",
  "countryCode": "AR",
  "countryName": "Argentina",
  "regionCode": "B",
  "regionName": "Buenos Aires",
  "city": "Claypole",
  "latitude": -34.8,
  "longitude": -58.3333
}
```
