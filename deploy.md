```shell
# local
docker build -t map-service .
docker tag map-service 203.130.178.90:5000/map/map-service:latest
docker image push 203.130.178.90:5000/map/map-service:latest

# server
sudo docker pull loaclhost:5000/map/map-service:latest
sudo docker run -d -p 3000:3000 --restart=always --name map-service localhost:5000/map/map-service
```
