docker build -t s1dequest/oauth-server:latest -t s1dequest/oauth-server:$SHA -f ./server/Dockerfile ./server

docker push s1dequest/oauth-server:latest
docker push s1dequest/oauth-server:$SHA
