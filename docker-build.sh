cd frontend && \
docker build . -t sc2-improved-ladder-frontend:latest && \
cd ..
cd backend && \
docker build . -t sc2-improved-ladder-backend:latest 
cd ..
cd db && \
docker build . -t sc2-improved-ladder-db:latest 
cd ..