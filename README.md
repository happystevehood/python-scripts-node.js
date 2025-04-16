This is basically based on the following article:-
https://www.halo-lab.com/blog/how-to-run-a-python-script-from-node-js

It was my first docker example (other than here https://www.freecodecamp.org/news/the-docker-handbook/) 

I was expecting to have html/javascript communicating with a python via docker, but instead this both javascript and python is in the docker.

-----------------------------------------------

To run app you need to have Docker installed, after run

```
docker build -t node-python-app .
```

```
docker run -p 8000:8000 node-python-app
```
