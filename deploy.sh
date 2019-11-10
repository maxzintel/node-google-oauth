docker build -t s1dequest/oauth-server:latest -t s1dequest/oauth-server:$SHA -f ./server/Dockerfile ./server

docker push s1dequest/oauth-server:latest
docker push s1dequest/oauth-server:$SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=s1dequest/oauth-server:$SHA