FROM oven/bun:1 as builder


FROM builder AS install
WORKDIR /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM builder AS build
WORKDIR /app
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bun run build


FROM nginx:alpine-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
