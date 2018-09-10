# IpStacj cache
this node proyect cache data from https://ipstack.com (old https://freegeoip.net/)

### Install dependencies:
* require node v4 or higher

```
npm install
```

### Usage:
* edit .env file: `IPSTACK_TOKEN` required


the api start in port 3000
```
npm start
```
### Data
```
GET :url/api/ip - return your ip info
```
```
GET :url/api/ip/xx.xx.xx.xx - return ip info
```

### Configuration:

edit .env file

SERVER_PORT, IPSTACK_TOKEN and more

### Run with docker
```
docker build . -t fregeoip-cache
```
### Run with docker-compose
`docker-compose.yml` is a sample file there you can configure the environment variables

```
docker-compose build
docker-compose up
```
