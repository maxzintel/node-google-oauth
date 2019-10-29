docker build -t s1dequest/multi-server:latest -t s1dequest/multi-server:$SHA -f ./server/Dockerfile ./server
docker push s1dequest/multi-server:latest
docker push s1dequest/multi-server:$SHA
